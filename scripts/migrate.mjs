import pg from "pg";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sql = readFileSync(join(__dirname, "..", "supabase-migration.sql"), "utf-8");

const client = new pg.Client({
  host: "aws-0-ap-south-1.pooler.supabase.com",
  port: 5432,
  database: "postgres",
  user: "postgres.rxughonxwjrcmignkttw",
  password: process.env.SUPABASE_DB_PASSWORD || "YOUR_DB_PASSWORD",
  ssl: { rejectUnauthorized: false },
});

try {
  console.log("Connecting to database...");
  await client.connect();
  console.log("Connected. Running migration...");
  await client.query(sql);
  console.log("Migration completed successfully!");
} catch (err) {
  console.error("Migration failed:", err.message);
} finally {
  await client.end();
}
