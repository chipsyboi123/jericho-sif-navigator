import * as cheerio from "cheerio";
import { query, pool } from "../config/db.js";

interface ScrapedNav {
  amfi_sif_id: number;
  fund_name: string;
  nav: number;
  date: string;
}

export async function scrapeAmfiNavs(): Promise<ScrapedNav[]> {
  console.log("[Scraper] Fetching AMFI SIF Latest NAV page...");

  const res = await fetch("https://www.amfiindia.com/sif/latest-nav", {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      "Accept": "text/html,application/xhtml+xml",
    },
  });

  if (!res.ok) {
    throw new Error(`AMFI page returned ${res.status}`);
  }

  const html = await res.text();
  const scraped = parseAmfiPage(html);

  if (scraped.length === 0) {
    console.warn("[Scraper] No NAV data extracted from AMFI page. Page structure may have changed.");
    return [];
  }

  console.log(`[Scraper] Extracted ${scraped.length} NAV entries`);

  // Upsert into database
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Get funds that have amfi_sif_id mapped
    const fundsResult = await client.query(
      "SELECT id, amfi_sif_id FROM sif_funds WHERE amfi_sif_id IS NOT NULL"
    );
    const fundMap = new Map(fundsResult.rows.map((r: any) => [r.amfi_sif_id, r.id]));

    let upsertCount = 0;
    for (const entry of scraped) {
      const fundId = fundMap.get(entry.amfi_sif_id);
      if (!fundId) continue;

      await client.query(
        `INSERT INTO nav_history (fund_id, date, nav)
         VALUES ($1, $2, $3)
         ON CONFLICT (fund_id, date) DO UPDATE SET nav = EXCLUDED.nav`,
        [fundId, entry.date, entry.nav]
      );

      await client.query(
        `UPDATE sif_funds SET current_nav = $1, nav_date = $2
         WHERE id = $3 AND (nav_date IS NULL OR nav_date <= $2)`,
        [entry.nav, entry.date, fundId]
      );

      upsertCount++;
    }

    await client.query("COMMIT");
    console.log(`[Scraper] Upserted ${upsertCount} NAV entries to database`);
    return scraped;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

function parseAmfiPage(html: string): ScrapedNav[] {
  const results: ScrapedNav[] = [];

  // Strategy 1: Parse Next.js hydration data from self.__next_f.push() calls
  const nextDataMatches = html.match(/self\.__next_f\.push\(\[.*?\]\)/gs);
  if (nextDataMatches) {
    for (const match of nextDataMatches) {
      try {
        // Look for NAV data patterns in the hydration payload
        // AMFI embeds fund data with SIF_Id, SIF_Name, and NAV values
        const navPattern = /"SIF_Id"\s*:\s*(\d+).*?"NAV"\s*:\s*"?([\d.]+)"?.*?"Date"\s*:\s*"([^"]+)"/g;
        let navMatch;
        while ((navMatch = navPattern.exec(match)) !== null) {
          results.push({
            amfi_sif_id: parseInt(navMatch[1]),
            fund_name: "",
            nav: parseFloat(navMatch[2]),
            date: normalizeDate(navMatch[3]),
          });
        }
      } catch {
        // Skip unparseable chunks
      }
    }
  }

  // Strategy 2: Parse from HTML tables or structured elements
  if (results.length === 0) {
    const $ = cheerio.load(html);

    // Look for table rows with NAV data
    $("table tr, .nav-row, [data-sif-id]").each((_i, el) => {
      const $el = $(el);
      const sifId = $el.attr("data-sif-id") || $el.find("[data-sif-id]").attr("data-sif-id");
      const navText = $el.find(".nav-value, td:nth-child(3), [data-nav]").text().trim();
      const dateText = $el.find(".nav-date, td:nth-child(4), [data-date]").text().trim();

      if (sifId && navText) {
        const nav = parseFloat(navText.replace(/[^0-9.]/g, ""));
        if (!isNaN(nav) && nav > 0) {
          results.push({
            amfi_sif_id: parseInt(sifId),
            fund_name: $el.find(".fund-name, td:first-child").text().trim(),
            nav,
            date: dateText ? normalizeDate(dateText) : new Date().toISOString().split("T")[0],
          });
        }
      }
    });
  }

  // Strategy 3: Regex scan for any JSON-like NAV data in the HTML
  if (results.length === 0) {
    // Look for patterns like "nav":10.1234 or "NAV":"10.1234" near SIF_Id
    const jsonPattern = /\{[^{}]*"SIF_Id"\s*:\s*(\d+)[^{}]*"(?:NAV|nav|Net_Asset_Value)"\s*:\s*"?([\d.]+)"?[^{}]*\}/g;
    let jsonMatch;
    while ((jsonMatch = jsonPattern.exec(html)) !== null) {
      const dateMatch = jsonMatch[0].match(/"(?:Date|date|NAV_Date|nav_date)"\s*:\s*"([^"]+)"/);
      results.push({
        amfi_sif_id: parseInt(jsonMatch[1]),
        fund_name: "",
        nav: parseFloat(jsonMatch[2]),
        date: dateMatch ? normalizeDate(dateMatch[1]) : new Date().toISOString().split("T")[0],
      });
    }
  }

  return results;
}

function normalizeDate(dateStr: string): string {
  const trimmed = dateStr.trim();

  // Already ISO format
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
    return trimmed.split("T")[0];
  }

  // DD-Mon-YYYY (e.g., 15-Apr-2025)
  const monMatch = trimmed.match(/^(\d{1,2})-(\w{3})-(\d{4})$/);
  if (monMatch) {
    const months: Record<string, string> = {
      jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06",
      jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12",
    };
    const m = months[monMatch[2].toLowerCase()];
    if (m) return `${monMatch[3]}-${m}-${monMatch[1].padStart(2, "0")}`;
  }

  // DD/MM/YYYY or DD-MM-YYYY
  if (/^\d{2}[-/]\d{2}[-/]\d{4}$/.test(trimmed)) {
    const sep = trimmed.includes("/") ? "/" : "-";
    const [d, m, y] = trimmed.split(sep);
    return `${y}-${m}-${d}`;
  }

  // Fallback: try JS Date
  const parsed = new Date(trimmed);
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString().split("T")[0];
  }

  return new Date().toISOString().split("T")[0];
}

// Manual trigger endpoint helper
export async function getScraperStatus(): Promise<{ lastRun: string | null; lastCount: number }> {
  try {
    const result = await query(
      "SELECT MAX(created_at) as last_run, COUNT(*) as count FROM nav_history WHERE created_at > NOW() - INTERVAL '24 hours'"
    );
    return {
      lastRun: result.rows[0]?.last_run || null,
      lastCount: parseInt(result.rows[0]?.count || "0"),
    };
  } catch {
    return { lastRun: null, lastCount: 0 };
  }
}
