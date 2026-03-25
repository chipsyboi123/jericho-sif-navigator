import { Router, Request, Response } from "express";
import { query } from "../config/db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Compute returns for a fund from nav_history
async function computeReturns(fundId: string): Promise<{
  threeMonth?: string;
  sixMonth?: string;
  oneYear?: string;
  sinceInception?: string;
  inceptionDate?: string;
}> {
  try {
    // Get latest NAV
    const latestResult = await query(
      "SELECT date, nav FROM nav_history WHERE fund_id = $1 ORDER BY date DESC LIMIT 1",
      [fundId]
    );
    if (latestResult.rows.length === 0) return {};

    const latestNav = parseFloat(latestResult.rows[0].nav);
    const latestDate = new Date(latestResult.rows[0].date);

    // Get inception (first) NAV
    const firstResult = await query(
      "SELECT date, nav FROM nav_history WHERE fund_id = $1 ORDER BY date ASC LIMIT 1",
      [fundId]
    );
    const firstNav = parseFloat(firstResult.rows[0].nav);
    const firstDate = new Date(firstResult.rows[0].date);

    // Helper: get NAV closest to a target date (on or before)
    async function getNavAt(targetDate: Date): Promise<number | null> {
      const dateStr = targetDate.toISOString().split("T")[0];
      const result = await query(
        "SELECT nav FROM nav_history WHERE fund_id = $1 AND date <= $2 ORDER BY date DESC LIMIT 1",
        [fundId, dateStr]
      );
      return result.rows.length > 0 ? parseFloat(result.rows[0].nav) : null;
    }

    // Helper: format return as percentage string
    function formatReturn(current: number, past: number): string {
      const ret = ((current - past) / past) * 100;
      return (ret >= 0 ? "+" : "") + ret.toFixed(2) + "%";
    }

    const returns: any = {};
    returns.inceptionDate = firstDate.toISOString().split("T")[0];

    // Since inception
    returns.sinceInception = formatReturn(latestNav, firstNav);

    // 3 months ago
    const threeMonthsAgo = new Date(latestDate);
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    if (threeMonthsAgo >= firstDate) {
      const nav3m = await getNavAt(threeMonthsAgo);
      if (nav3m) returns.threeMonth = formatReturn(latestNav, nav3m);
    }

    // 6 months ago
    const sixMonthsAgo = new Date(latestDate);
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    if (sixMonthsAgo >= firstDate) {
      const nav6m = await getNavAt(sixMonthsAgo);
      if (nav6m) returns.sixMonth = formatReturn(latestNav, nav6m);
    }

    // 1 year ago
    const oneYearAgo = new Date(latestDate);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    if (oneYearAgo >= firstDate) {
      const nav1y = await getNavAt(oneYearAgo);
      if (nav1y) returns.oneYear = formatReturn(latestNav, nav1y);
    }

    return returns;
  } catch {
    return {};
  }
}

// Attach returns to fund rows
async function attachReturns(funds: any[]): Promise<any[]> {
  const results = await Promise.all(
    funds.map(async (fund) => {
      const returns = await computeReturns(fund.id);
      return {
        ...fund,
        returns: {
          threeMonth: returns.threeMonth || null,
          sixMonth: returns.sixMonth || null,
          oneYear: returns.oneYear || null,
          sinceInception: returns.sinceInception || null,
        },
        inception_date: returns.inceptionDate || null,
      };
    })
  );
  return results;
}

// Public: get all funds with AMC name + computed returns
router.get("/", async (_req: Request, res: Response) => {
  try {
    const result = await query(
      `SELECT f.*, a.name as amc_name
       FROM sif_funds f
       LEFT JOIN amcs a ON f.amc_id = a.id
       ORDER BY f.name`
    );
    const fundsWithReturns = await attachReturns(result.rows);
    res.json(fundsWithReturns);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Public: get single fund by slug + computed returns
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
    const fundsWithReturns = await attachReturns(result.rows);
    res.json(fundsWithReturns[0]);
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
