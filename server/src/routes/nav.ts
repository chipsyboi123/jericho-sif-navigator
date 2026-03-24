import { Router, Request, Response } from "express";
import { query, pool } from "../config/db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Public: get NAV history for a fund
router.get("/recent", requireAuth, async (_req: Request, res: Response) => {
  try {
    const result = await query(
      `SELECT nh.date, nh.nav, f.name as fund_name
       FROM nav_history nh
       JOIN sif_funds f ON nh.fund_id = f.id
       ORDER BY nh.date DESC
       LIMIT 20`
    );
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:fundId", async (req: Request, res: Response) => {
  try {
    const result = await query(
      "SELECT date, nav FROM nav_history WHERE fund_id = $1 ORDER BY date ASC",
      [req.params.fundId]
    );
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: single NAV entry upsert
router.post("/", requireAuth, async (req: Request, res: Response) => {
  const client = await pool.connect();
  try {
    const { fund_id, date, nav } = req.body;
    if (!fund_id || !date || nav == null) {
      res.status(400).json({ error: "fund_id, date, and nav are required" });
      return;
    }

    await client.query("BEGIN");

    await client.query(
      `INSERT INTO nav_history (fund_id, date, nav)
       VALUES ($1, $2, $3)
       ON CONFLICT (fund_id, date) DO UPDATE SET nav = EXCLUDED.nav`,
      [fund_id, date, parseFloat(nav)]
    );

    // Update current_nav if this is the latest date
    await client.query(
      `UPDATE sif_funds SET current_nav = $1, nav_date = $2
       WHERE id = $3 AND (nav_date IS NULL OR nav_date <= $2)`,
      [parseFloat(nav), date, fund_id]
    );

    await client.query("COMMIT");
    res.json({ success: true });
  } catch (err: any) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

// Admin: bulk NAV upsert
router.post("/bulk", requireAuth, async (req: Request, res: Response) => {
  const client = await pool.connect();
  try {
    const { fund_id, entries } = req.body;
    if (!fund_id || !Array.isArray(entries) || entries.length === 0) {
      res.status(400).json({ error: "fund_id and entries array required" });
      return;
    }

    await client.query("BEGIN");

    for (const entry of entries) {
      await client.query(
        `INSERT INTO nav_history (fund_id, date, nav)
         VALUES ($1, $2, $3)
         ON CONFLICT (fund_id, date) DO UPDATE SET nav = EXCLUDED.nav`,
        [fund_id, entry.date, parseFloat(entry.nav)]
      );
    }

    // Update current_nav with the latest date entry
    const sorted = [...entries].sort((a: any, b: any) => b.date.localeCompare(a.date));
    await client.query(
      `UPDATE sif_funds SET current_nav = $1, nav_date = $2
       WHERE id = $3 AND (nav_date IS NULL OR nav_date <= $2)`,
      [parseFloat(sorted[0].nav), sorted[0].date, fund_id]
    );

    await client.query("COMMIT");
    res.json({ success: true, count: entries.length });
  } catch (err: any) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

export default router;
