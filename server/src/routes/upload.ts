import { Router, Request, Response } from "express";
import multer from "multer";
import * as XLSX from "xlsx";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

interface ParsedNavEntry {
  date: string;
  nav: number;
}

function parseDate(value: any): string | null {
  if (!value) return null;

  // Handle Excel serial date numbers
  if (typeof value === "number") {
    const excelDate = XLSX.SSF.parse_date_code(value);
    if (excelDate) {
      const y = excelDate.y;
      const m = String(excelDate.m).padStart(2, "0");
      const d = String(excelDate.d).padStart(2, "0");
      return `${y}-${m}-${d}`;
    }
    return null;
  }

  const str = String(value).trim();

  // YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;

  // DD-MM-YYYY or DD/MM/YYYY
  if (/^\d{2}[-/]\d{2}[-/]\d{4}$/.test(str)) {
    const sep = str.includes("/") ? "/" : "-";
    const [d, m, y] = str.split(sep);
    return `${y}-${m}-${d}`;
  }

  // MM/DD/YYYY (US format)
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(str)) {
    const [m, d, y] = str.split("/");
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }

  // Try JS Date parse as fallback
  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString().split("T")[0];
  }

  return null;
}

function detectColumns(headers: string[]): { dateCol: number; navCol: number } {
  const lower = headers.map((h) => String(h || "").toLowerCase().trim());

  let dateCol = lower.findIndex((h) => h.includes("date"));
  let navCol = lower.findIndex((h) => h.includes("nav") || h.includes("value") || h.includes("price"));

  // Fallback: first column is date, second is nav
  if (dateCol === -1) dateCol = 0;
  if (navCol === -1) navCol = dateCol === 0 ? 1 : 0;

  return { dateCol, navCol };
}

// Admin: parse uploaded xlsx/csv file and return preview
router.post("/nav-file", requireAuth, upload.single("file"), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const workbook = XLSX.read(req.file.buffer, { type: "buffer", cellDates: true });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rawData = XLSX.utils.sheet_to_json<any[]>(sheet, { header: 1 });

    if (rawData.length < 2) {
      res.status(400).json({ error: "File has no data rows" });
      return;
    }

    const headers = rawData[0] as string[];
    const { dateCol, navCol } = detectColumns(headers);

    const entries: ParsedNavEntry[] = [];
    const errors: string[] = [];

    for (let i = 1; i < rawData.length; i++) {
      const row = rawData[i] as any[];
      if (!row || row.length === 0) continue;

      const dateVal = parseDate(row[dateCol]);
      const navVal = parseFloat(String(row[navCol]));

      if (!dateVal) {
        errors.push(`Row ${i + 1}: Invalid date "${row[dateCol]}"`);
        continue;
      }
      if (isNaN(navVal) || navVal <= 0) {
        errors.push(`Row ${i + 1}: Invalid NAV "${row[navCol]}"`);
        continue;
      }

      entries.push({ date: dateVal, nav: navVal });
    }

    res.json({
      fileName: req.file.originalname,
      sheetName,
      totalRows: rawData.length - 1,
      parsedCount: entries.length,
      errors,
      entries,
      detectedColumns: {
        date: headers[dateCol] || `Column ${dateCol + 1}`,
        nav: headers[navCol] || `Column ${navCol + 1}`,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: `Failed to parse file: ${err.message}` });
  }
});

export default router;
