import cron from "node-cron";
import { scrapeAmfiNavs } from "./scraper.js";

export function startScheduler() {
  // Run at 10:30 PM IST daily on weekdays (17:00 UTC)
  // AMFI publishes SIF NAVs by ~11 PM IST
  cron.schedule("0 17 * * 1-5", async () => {
    console.log("[CRON] Starting AMFI SIF NAV scrape...");
    try {
      const results = await scrapeAmfiNavs();
      console.log(`[CRON] NAV scrape complete. ${results.length} entries processed.`);
    } catch (err) {
      console.error("[CRON] NAV scrape failed:", err);
    }
  });

  console.log("[Scheduler] AMFI NAV scraper scheduled for 10:30 PM IST (weekdays)");
}
