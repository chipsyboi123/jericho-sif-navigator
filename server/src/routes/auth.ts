import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";

const router = Router();

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password required" });
    return;
  }

  if (email.toLowerCase() !== env.ADMIN_EMAIL.toLowerCase() || password !== env.ADMIN_PASSWORD) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = jwt.sign({ email }, env.JWT_SECRET, { expiresIn: "24h" });
  res.json({ token, email });
});

router.get("/me", requireAuth, (req: AuthRequest, res: Response) => {
  res.json({ email: req.admin?.email });
});

export default router;
