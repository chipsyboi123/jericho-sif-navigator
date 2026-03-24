import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { env, validateEnv } from "./config/env.js";
import { startScheduler } from "./services/scheduler.js";
import { scrapeAmfiNavs, getScraperStatus } from "./services/scraper.js";
import { requireAuth } from "./middleware/auth.js";

import authRoutes from "./routes/auth.js";
import fundRoutes from "./routes/funds.js";
import amcRoutes from "./routes/amcs.js";
import navRoutes from "./routes/nav.js";
import blogRoutes from "./routes/blog.js";
import leadRoutes from "./routes/leads.js";
import uploadRoutes from "./routes/upload.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

validateEnv();

const app = express();

// Middleware
app.use(cors({ origin: env.FRONTEND_URL === "*" ? true : env.FRONTEND_URL }));
app.use(express.json({ limit: "10mb" }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/funds", fundRoutes);
app.use("/api/amcs", amcRoutes);
app.use("/api/nav", navRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/upload", uploadRoutes);

// Admin: manual scraper trigger
app.post("/api/scraper/run", requireAuth, async (_req, res) => {
  try {
    const results = await scrapeAmfiNavs();
    res.json({ success: true, count: results.length });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: scraper status
app.get("/api/scraper/status", requireAuth, async (_req, res) => {
  try {
    const status = await getScraperStatus();
    res.json(status);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Serve React frontend in production
const distPath = path.resolve(__dirname, "../../dist");
app.use(express.static(distPath));
app.get("*", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Start server
app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT} (${env.NODE_ENV})`);
  if (env.NODE_ENV === "production") {
    startScheduler();
  }
});

export default app;
