import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const env = {
  DATABASE_URL: process.env.DATABASE_URL || "",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@jericho.com",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "",
  JWT_SECRET: process.env.JWT_SECRET || "dev-secret-change-in-production",
  PORT: parseInt(process.env.PORT || "3001", 10),
  FRONTEND_URL: process.env.FRONTEND_URL || "*",
  NODE_ENV: process.env.NODE_ENV || "development",
};

const required = ["DATABASE_URL", "ADMIN_PASSWORD", "JWT_SECRET"] as const;

export function validateEnv() {
  const missing = required.filter((key) => !env[key]);
  if (missing.length > 0) {
    console.error(`Missing required env vars: ${missing.join(", ")}`);
    if (env.NODE_ENV === "production") {
      process.exit(1);
    }
  }
}
