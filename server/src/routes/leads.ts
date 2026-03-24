import { Router, Request, Response } from "express";
import { query } from "../config/db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Public: submit lead (contact form)
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      name, email, phone, investment_range, investment_horizon,
      source, message, source_page, risk_profile_result
    } = req.body;

    if (!name || !email) {
      res.status(400).json({ error: "Name and email are required" });
      return;
    }

    const result = await query(
      `INSERT INTO leads (name, email, phone, investment_range, investment_horizon, source, message, source_page, risk_profile_result)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`,
      [
        name, email, phone || null, investment_range || null,
        investment_horizon || null, source || null, message || null,
        source_page || null, risk_profile_result ? JSON.stringify(risk_profile_result) : null
      ]
    );
    res.status(201).json({ success: true, id: result.rows[0].id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: get all leads
router.get("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const statusFilter = req.query.status as string | undefined;
    let sql = "SELECT * FROM leads ORDER BY created_at DESC";
    const params: any[] = [];

    if (statusFilter) {
      sql = "SELECT * FROM leads WHERE status = $1 ORDER BY created_at DESC";
      params.push(statusFilter);
    }

    const result = await query(sql, params);
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: update lead status
router.patch("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const result = await query(
      "UPDATE leads SET status = $1 WHERE id = $2 RETURNING *",
      [status, req.params.id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Lead not found" });
      return;
    }
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
