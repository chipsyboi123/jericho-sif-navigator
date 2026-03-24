import { Router, Request, Response } from "express";
import { query } from "../config/db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Public: get all funds with AMC name
router.get("/", async (_req: Request, res: Response) => {
  try {
    const result = await query(
      `SELECT f.*, a.name as amc_name
       FROM sif_funds f
       LEFT JOIN amcs a ON f.amc_id = a.id
       ORDER BY f.name`
    );
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Public: get single fund by slug
router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const result = await query(
      `SELECT f.*, a.name as amc_name
       FROM sif_funds f
       LEFT JOIN amcs a ON f.amc_id = a.id
       WHERE f.slug = $1`,
      [req.params.slug]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Fund not found" });
      return;
    }
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: create fund
router.post("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const {
      amc_id, name, slug, category, fund_type, benchmark, objective,
      fund_managers, subscription_terms, redemption_terms, exit_load,
      risk_band, min_investment, indicative_allocation, status,
      nfo_open_date, nfo_close_date, launch_date, isid_url,
      current_nav, nav_date, scheme_code, amfi_sif_id
    } = req.body;

    const result = await query(
      `INSERT INTO sif_funds (
        amc_id, name, slug, category, fund_type, benchmark, objective,
        fund_managers, subscription_terms, redemption_terms, exit_load,
        risk_band, min_investment, indicative_allocation, status,
        nfo_open_date, nfo_close_date, launch_date, isid_url,
        current_nav, nav_date, scheme_code, amfi_sif_id
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23)
      RETURNING *`,
      [
        amc_id, name, slug, category, fund_type, benchmark, objective,
        JSON.stringify(fund_managers || []), subscription_terms, redemption_terms, exit_load,
        risk_band, min_investment || 1000000, JSON.stringify(indicative_allocation || {}), status,
        nfo_open_date || null, nfo_close_date || null, launch_date || null, isid_url || null,
        current_nav || null, nav_date || null, scheme_code || null, amfi_sif_id || null
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: update fund
router.put("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const fields = req.body;
    const setClauses: string[] = [];
    const values: any[] = [];
    let idx = 1;

    for (const [key, value] of Object.entries(fields)) {
      if (key === "id") continue;
      const dbValue = (key === "fund_managers" || key === "indicative_allocation")
        ? JSON.stringify(value)
        : value;
      setClauses.push(`${key} = $${idx}`);
      values.push(dbValue);
      idx++;
    }

    if (setClauses.length === 0) {
      res.status(400).json({ error: "No fields to update" });
      return;
    }

    values.push(req.params.id);
    const result = await query(
      `UPDATE sif_funds SET ${setClauses.join(", ")} WHERE id = $${idx} RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Fund not found" });
      return;
    }
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: delete fund
router.delete("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const result = await query("DELETE FROM sif_funds WHERE id = $1 RETURNING id", [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Fund not found" });
      return;
    }
    res.json({ deleted: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
