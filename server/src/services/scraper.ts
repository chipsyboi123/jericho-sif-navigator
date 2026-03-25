/**
 * AMFI SIF NAV Scraper — uses the official AMFI API
 * Discovered endpoint: https://www.amfiindia.com/api/sif-nav-history
 *
 * Runs daily via node-cron (see scheduler.ts).
 * Can also be triggered manually via POST /api/scraper/run
 */
import { query, pool } from "../config/db.js";

interface AmfiRecord {
  date: string;
  nav: string;
}

interface AmfiResponse {
  data: {
    mf_name: string;
    scheme_name: string;
    nav_groups: Array<{
      nav_name: string;
      historical_records: AmfiRecord[];
    }>;
  };
}

// All known AMFI SIF scheme IDs mapped to our fund slugs
// Each fund has multiple plans (Direct/Regular × Growth/IDCW)
// We store NAV for the fund_id (slug-based), using the Regular Growth plan as primary
const SCHEME_MAP = [
  // qSIF Equity Long-Short Fund
  { sdId: "SIF-3", fundSlug: "quant-qsif-equity", label: "qSIF Equity Regular Growth" },
  // Altiva Hybrid Long-Short Fund
  { sdId: "SIF-11", fundSlug: "edelweiss-altiva", label: "Altiva Regular Growth" },
  // Magnum Hybrid Long-Short Fund
  { sdId: "SIF-13", fundSlug: "sbi-magnum", label: "Magnum Regular Growth" },
  // iSIF Hybrid Long-Short Fund
  { sdId: "SIF-35", fundSlug: "icici-isif-hybrid", label: "iSIF Hybrid Regular Growth" },
];

interface ScrapedNav {
  fundSlug: string;
  label: string;
  nav: number;
  date: string;
}

export async function scrapeAmfiNavs(): Promise<ScrapedNav[]> {
  console.log("[Scraper] Fetching latest NAVs from AMFI API...");

  // We fetch the last 7 days to catch any missed days
  const toDate = new Date().toISOString().split("T")[0];
  const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  // Get fund_id mapping from database
  const fundsResult = await pool.query("SELECT id, slug FROM sif_funds");
  const fundIdMap = new Map(fundsResult.rows.map((r: any) => [r.slug, r.id]));

  const results: ScrapedNav[] = [];
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    for (const scheme of SCHEME_MAP) {
      const fundId = fundIdMap.get(scheme.fundSlug);
      if (!fundId) {
        console.log(`[Scraper] SKIP: ${scheme.label} — fund not in DB`);
        continue;
      }

      try {
        const url = `https://www.amfiindia.com/api/sif-nav-history?query_type=historical_period&from_date=${fromDate}&to_date=${toDate}&sd_id=${scheme.sdId}`;

        const res = await fetch(url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          console.error(`[Scraper] HTTP ${res.status} for ${scheme.label}`);
          continue;
        }

        const data: AmfiResponse = await res.json();
        const records = data?.data?.nav_groups?.[0]?.historical_records || [];

        if (records.length === 0) {
          console.log(`[Scraper] ${scheme.label}: no records in period`);
          continue;
        }

        let upsertCount = 0;
        for (const record of records) {
          const nav = parseFloat(record.nav);
          if (isNaN(nav) || nav <= 0) continue;

          await client.query(
            `INSERT INTO nav_history (fund_id, date, nav)
             VALUES ($1, $2, $3)
             ON CONFLICT (fund_id, date) DO UPDATE SET nav = EXCLUDED.nav`,
            [fundId, record.date, nav]
          );
          upsertCount++;
        }

        // Update current_nav with the most recent record
        const latest = records[records.length - 1];
        if (latest) {
          await client.query(
            `UPDATE sif_funds SET current_nav = $1, nav_date = $2
             WHERE id = $3 AND (nav_date IS NULL OR nav_date <= $2)`,
            [parseFloat(latest.nav), latest.date, fundId]
          );
        }

        console.log(`[Scraper] ${scheme.label}: ${upsertCount} records upserted (latest: ${latest.nav} on ${latest.date})`);

        results.push({
          fundSlug: scheme.fundSlug,
          label: scheme.label,
          nav: parseFloat(latest.nav),
          date: latest.date,
        });
      } catch (err: any) {
        console.error(`[Scraper] Error for ${scheme.label}:`, err.message);
      }
    }

    await client.query("COMMIT");
    console.log(`[Scraper] Done. ${results.length} funds updated.`);
    return results;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

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
