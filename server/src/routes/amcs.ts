import { Router, Request, Response } from "express";
import { query } from "../config/db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const result = await query("SELECT * FROM amcs ORDER BY name");
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const { name, sif_brand, status, logo_url, website_url, sebi_approval_date } = req.body;
    const result = await query(
      `INSERT INTO amcs (name, sif_brand, status, logo_url, website_url, sebi_approval_date)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [name, sif_brand || null, status || "upcoming", logo_url || null, website_url || null, sebi_approval_date || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const fields = req.body;
    const setClauses: string[] = [];
    const values: any[] = [];
    let idx = 1;

    for (const [key, value] of Object.entries(fields)) {
      if (key === "id") continue;
      setClauses.push(`${key} = $${idx}`);
      values.push(value);
      idx++;
    }

    if (setClauses.length === 0) {
      res.status(400).json({ error: "No fields to update" });
      return;
    }

    values.push(req.params.id);
    const result = await query(
      `UPDATE amcs SET ${setClauses.join(", ")} WHERE id = $${idx} RETURNING *`,
      values
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "AMC not found" });
      return;
    }
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const result = await query("DELETE FROM amcs WHERE id = $1 RETURNING id", [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "AMC not found" });
      return;
    }
    res.json({ deleted: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
