import { Router, Request, Response } from "express";
import { query } from "../config/db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Public: published posts
router.get("/", async (_req: Request, res: Response) => {
  try {
    const result = await query(
      "SELECT * FROM blog_posts WHERE published = true ORDER BY published_at DESC"
    );
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Public: single published post by slug
router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const result = await query(
      "SELECT * FROM blog_posts WHERE slug = $1 AND published = true",
      [req.params.slug]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: all posts (including drafts)
router.get("/admin/all", requireAuth, async (_req: Request, res: Response) => {
  try {
    const result = await query("SELECT * FROM blog_posts ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: create post
router.post("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const { title, slug, category, content, excerpt, author, published } = req.body;
    const result = await query(
      `INSERT INTO blog_posts (title, slug, category, content, excerpt, author, published, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [
        title, slug, category || "updates", content, excerpt || null,
        author || "Jericho SIF Team", published || false,
        published ? new Date().toISOString() : null
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: update post
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

    // Auto-set published_at when publishing
    if (fields.published === true) {
      setClauses.push(`published_at = COALESCE(published_at, $${idx})`);
      values.push(new Date().toISOString());
      idx++;
    }

    if (setClauses.length === 0) {
      res.status(400).json({ error: "No fields to update" });
      return;
    }

    values.push(req.params.id);
    const result = await query(
      `UPDATE blog_posts SET ${setClauses.join(", ")} WHERE id = $${idx} RETURNING *`,
      values
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: delete post
router.delete("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const result = await query("DELETE FROM blog_posts WHERE id = $1 RETURNING id", [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    res.json({ deleted: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
