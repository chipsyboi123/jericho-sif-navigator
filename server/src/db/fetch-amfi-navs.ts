/**
 * Fetches ALL historical NAV data from AMFI SIF website for our 4 funds
 * and inserts into the Railway Postgres database.
 *
 * Usage: cd server && npx tsx src/db/fetch-amfi-navs.ts
 *
 * AMFI API: https://www.amfiindia.com/api/sif-nav-history
 *   ?query_type=historical_period
 *   &from_date=YYYY-MM-DD
 *   &to_date=YYYY-MM-DD
 *   &sd_id=SIF-{n}
 */
import { pool } from "../config/db.js";
import "../config/env.js";

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

// Our 4 funds × 4 plan types = 12 scheme-plan combinations + their slug mappings
const SCHEMES = [
  // qSIF Equity Long-Short Fund
  { sdId: "SIF-1", fundSlug: "quant-qsif-equity", planType: "Direct Growth", label: "qSIF Equity - Direct Growth" },
  { sdId: "SIF-2", fundSlug: "quant-qsif-equity", planType: "Direct IDCW", label: "qSIF Equity - Direct IDCW" },
  { sdId: "SIF-3", fundSlug: "quant-qsif-equity", planType: "Regular Growth", label: "qSIF Equity - Regular Growth" },
  { sdId: "SIF-4", fundSlug: "quant-qsif-equity", planType: "Regular IDCW", label: "qSIF Equity - Regular IDCW" },
  // Altiva Hybrid Long-Short Fund
  { sdId: "SIF-9", fundSlug: "edelweiss-altiva", planType: "Direct Growth", label: "Altiva - Direct Growth" },
  { sdId: "SIF-10", fundSlug: "edelweiss-altiva", planType: "Direct IDCW", label: "Altiva - Direct IDCW" },
  { sdId: "SIF-11", fundSlug: "edelweiss-altiva", planType: "Regular Growth", label: "Altiva - Regular Growth" },
  { sdId: "SIF-12", fundSlug: "edelweiss-altiva", planType: "Regular IDCW", label: "Altiva - Regular IDCW" },
  // Magnum Hybrid Long-Short Fund
  { sdId: "SIF-13", fundSlug: "sbi-magnum", planType: "Regular Growth", label: "Magnum - Regular Growth" },
  { sdId: "SIF-14", fundSlug: "sbi-magnum", planType: "Direct Growth", label: "Magnum - Direct Growth" },
  { sdId: "SIF-15", fundSlug: "sbi-magnum", planType: "Direct IDCW", label: "Magnum - Direct IDCW" },
  { sdId: "SIF-16", fundSlug: "sbi-magnum", planType: "Regular IDCW", label: "Magnum - Regular IDCW" },
  // iSIF Hybrid Long-Short Fund — NFO, may not have NAV data yet
  // Will be added here when AMFI assigns scheme IDs
];

async function fetchNavFromAmfi(sdId: string, fromDate: string, toDate: string): Promise<AmfiRecord[]> {
  const url = `https://www.amfiindia.com/api/sif-nav-history?query_type=historical_period&from_date=${fromDate}&to_date=${toDate}&sd_id=${sdId}`;
  console.log(`  Fetching ${url}`);

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    console.error(`  HTTP ${res.status} for ${sdId}`);
    return [];
  }

  const data: AmfiResponse = await res.json();
  const records = data?.data?.nav_groups?.[0]?.historical_records || [];
  return records;
}

async function main() {
  console.log("=== AMFI SIF NAV History Fetcher ===\n");

  // Get fund_id mapping from database
  const fundsResult = await pool.query("SELECT id, slug FROM sif_funds");
  const fundIdMap = new Map(fundsResult.rows.map((r: any) => [r.slug, r.id]));

  console.log(`Found ${fundIdMap.size} funds in database:`);
  for (const [slug, id] of fundIdMap) {
    console.log(`  ${slug} -> ${id}`);
  }
  console.log();

  const fromDate = "2024-01-01";
  const toDate = new Date().toISOString().split("T")[0]; // today

  let totalInserted = 0;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    for (const scheme of SCHEMES) {
      console.log(`\n--- ${scheme.label} (${scheme.sdId}) ---`);

      const fundId = fundIdMap.get(scheme.fundSlug);
      if (!fundId) {
        console.log(`  SKIP: Fund slug "${scheme.fundSlug}" not found in database`);
        continue;
      }

      const records = await fetchNavFromAmfi(scheme.sdId, fromDate, toDate);
      console.log(`  Got ${records.length} records`);

      if (records.length === 0) continue;

      let inserted = 0;
      for (const record of records) {
        const nav = parseFloat(record.nav);
        if (isNaN(nav) || nav <= 0) continue;

        await client.query(
          `INSERT INTO nav_history (fund_id, date, nav)
           VALUES ($1, $2, $3)
           ON CONFLICT (fund_id, date) DO UPDATE SET nav = EXCLUDED.nav`,
          [fundId, record.date, nav]
        );
        inserted++;
      }

      // Update current_nav with latest record
      const latest = records[records.length - 1];
      if (latest) {
        await client.query(
          `UPDATE sif_funds SET current_nav = $1, nav_date = $2
           WHERE id = $3 AND (nav_date IS NULL OR nav_date <= $2)`,
          [parseFloat(latest.nav), latest.date, fundId]
        );
      }

      console.log(`  Inserted/updated ${inserted} NAV records`);
      totalInserted += inserted;
    }

    await client.query("COMMIT");
    console.log(`\n=== DONE: ${totalInserted} total NAV records inserted/updated ===`);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("FAILED:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
