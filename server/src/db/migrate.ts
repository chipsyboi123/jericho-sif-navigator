import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../config/db.js";
import "../config/env.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function migrate() {
  const migrationsDir = path.join(__dirname, "migrations");
  const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith(".sql")).sort();

  console.log(`Found ${files.length} migration file(s)`);

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf-8");
    console.log(`Running migration: ${file}`);
    try {
      await pool.query(sql);
      console.log(`  -> ${file} applied successfully`);
    } catch (err: any) {
      console.error(`  -> ${file} FAILED:`, err.message);
      process.exit(1);
    }
  }

  console.log("All migrations complete.");
  await pool.end();
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
