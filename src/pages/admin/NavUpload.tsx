import { useState, useEffect, useCallback } from "react";
import { apiFetch, apiUpload } from "@/lib/api";

interface FundOption {
  id: string;
  name: string;
  slug: string;
}

interface NavEntry {
  date: string;
  nav: number;
}

interface RecentNav {
  fund_name: string;
  date: string;
  nav: number;
}

interface FileParseResult {
  fileName: string;
  sheetName: string;
  totalRows: number;
  parsedCount: number;
  errors: string[];
  entries: NavEntry[];
  detectedColumns: { date: string; nav: string };
}

const NavUpload = () => {
  const [funds, setFunds] = useState<FundOption[]>([]);
  const [selectedFund, setSelectedFund] = useState("");
  const [mode, setMode] = useState<"single" | "bulk" | "file">("single");

  // Single entry
  const [navDate, setNavDate] = useState("");
  const [navValue, setNavValue] = useState("");

  // Bulk entry
  const [csvText, setCsvText] = useState("");

  // File upload
  const [dragOver, setDragOver] = useState(false);
  const [fileParseResult, setFileParseResult] = useState<FileParseResult | null>(null);
  const [uploading, setUploading] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [recentNavs, setRecentNavs] = useState<RecentNav[]>([]);

  useEffect(() => {
    fetchFunds();
    fetchRecentNavs();
  }, []);

  async function fetchFunds() {
    try {
      const data = await apiFetch<FundOption[]>("/api/funds");
      setFunds(data.map((f: any) => ({ id: f.id, name: f.name, slug: f.slug })));
    } catch (err) {
      console.error("Failed to fetch funds:", err);
    }
  }

  async function fetchRecentNavs() {
    try {
      const data = await apiFetch<any[]>("/api/nav/recent");
      setRecentNavs(
        data.map((r: any) => ({
          fund_name: r.fund_name || "Unknown",
          date: r.date,
          nav: parseFloat(r.nav),
        }))
      );
    } catch (err) {
      console.error("Failed to fetch recent navs:", err);
    }
  }

  function parseCSV(text: string): NavEntry[] {
    const lines = text.trim().split("\n");
    const entries: NavEntry[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.toLowerCase().startsWith("date")) continue;

      const parts = trimmed.split(/[,\t]/);
      if (parts.length < 2) continue;

      const dateStr = parts[0].trim();
      const navStr = parts[1].trim();
      const nav = parseFloat(navStr);
      if (isNaN(nav)) continue;

      let isoDate = dateStr;
      if (/^\d{2}[-/]\d{2}[-/]\d{4}$/.test(dateStr)) {
        const sep = dateStr.includes("/") ? "/" : "-";
        const [d, m, y] = dateStr.split(sep);
        isoDate = `${y}-${m}-${d}`;
      }

      entries.push({ date: isoDate, nav });
    }

    return entries;
  }

  async function handleSingleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedFund || !navDate || !navValue) return;

    setSubmitting(true);
    setMessage(null);

    const nav = parseFloat(navValue);
    if (isNaN(nav)) {
      setMessage({ type: "error", text: "Invalid NAV value" });
      setSubmitting(false);
      return;
    }

    try {
      await apiFetch("/api/nav", {
        method: "POST",
        body: JSON.stringify({ fund_id: selectedFund, date: navDate, nav }),
      });
      setMessage({ type: "success", text: "NAV entry saved successfully" });
      setNavDate("");
      setNavValue("");
      fetchRecentNavs();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    }

    setSubmitting(false);
  }

  async function handleBulkSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedFund || !csvText.trim()) return;

    setSubmitting(true);
    setMessage(null);

    const entries = parseCSV(csvText);
    if (entries.length === 0) {
      setMessage({ type: "error", text: "No valid entries found. Use format: Date,NAV (one per line)" });
      setSubmitting(false);
      return;
    }

    try {
      const result = await apiFetch<{ count: number }>("/api/nav/bulk", {
        method: "POST",
        body: JSON.stringify({ fund_id: selectedFund, entries }),
      });
      setMessage({ type: "success", text: `${result.count} NAV entries uploaded successfully` });
      setCsvText("");
      fetchRecentNavs();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    }

    setSubmitting(false);
  }

  const handleFileDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;
    await parseFile(file);
  }, []);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await parseFile(file);
  }, []);

  async function parseFile(file: File) {
    setUploading(true);
    setMessage(null);
    setFileParseResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await apiUpload<FileParseResult>("/api/upload/nav-file", formData);
      setFileParseResult(result);

      if (result.errors.length > 0) {
        setMessage({ type: "error", text: `${result.errors.length} rows had errors (see below)` });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: `Failed to parse file: ${err.message}` });
    }

    setUploading(false);
  }

  async function handleFileUploadCommit() {
    if (!selectedFund || !fileParseResult?.entries.length) return;

    setSubmitting(true);
    setMessage(null);

    try {
      const result = await apiFetch<{ count: number }>("/api/nav/bulk", {
        method: "POST",
        body: JSON.stringify({ fund_id: selectedFund, entries: fileParseResult.entries }),
      });
      setMessage({ type: "success", text: `${result.count} NAV entries uploaded from ${fileParseResult.fileName}` });
      setFileParseResult(null);
      fetchRecentNavs();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    }

    setSubmitting(false);
  }

  return (
    <div>
      <div className="max-w-3xl">
        <h1 className="font-serif text-2xl font-bold text-foreground mb-6">NAV Upload</h1>

        {/* Fund selector */}
        <div className="bg-card border border-border p-6 mb-6 rounded-lg">
          <label className="text-sm font-medium text-foreground mb-2 block">Select Fund</label>
          <select
            value={selectedFund}
            onChange={(e) => setSelectedFund(e.target.value)}
            className="w-full px-4 py-2.5 bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary rounded"
          >
            <option value="">Choose a fund...</option>
            {funds.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.slug})
              </option>
            ))}
          </select>
        </div>

        {/* Mode toggle */}
        <div className="flex gap-2 mb-6">
          {(["single", "bulk", "file"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-2 text-sm font-medium transition-colors rounded ${
                mode === m
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {m === "single" ? "Single Entry" : m === "bulk" ? "Bulk CSV" : "File Upload"}
            </button>
          ))}
        </div>

        {/* Single entry form */}
        {mode === "single" && (
          <div className="bg-card border border-border p-6 mb-6 rounded-lg">
            <form onSubmit={handleSingleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Date</label>
                  <input
                    type="date"
                    required
                    value={navDate}
                    onChange={(e) => setNavDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary rounded"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">NAV Value</label>
                  <input
                    type="number"
                    step="0.0001"
                    required
                    value={navValue}
                    onChange={(e) => setNavValue(e.target.value)}
                    placeholder="e.g. 10.2345"
                    className="w-full px-4 py-2.5 bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary rounded"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting || !selectedFund}
                className={`px-6 py-3 bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 transition-opacity rounded ${
                  submitting || !selectedFund ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {submitting ? "Saving..." : "Save NAV Entry"}
              </button>
            </form>
          </div>
        )}

        {/* Bulk upload form */}
        {mode === "bulk" && (
          <div className="bg-card border border-border p-6 mb-6 rounded-lg">
            <form onSubmit={handleBulkSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Paste CSV Data (Date,NAV per line)
                </label>
                <p className="text-xs text-muted-foreground mb-2">
                  Supports formats: YYYY-MM-DD, DD-MM-YYYY, DD/MM/YYYY. Header row is auto-skipped.
                </p>
                <textarea
                  rows={10}
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  placeholder={"Date,NAV\n2025-04-15,10.1234\n2025-04-16,10.2500\n2025-04-17,10.3100"}
                  className="w-full px-4 py-2.5 bg-secondary border border-border text-foreground text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary resize-none rounded"
                />
              </div>
              <button
                type="submit"
                disabled={submitting || !selectedFund}
                className={`px-6 py-3 bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 transition-opacity rounded ${
                  submitting || !selectedFund ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {submitting ? "Uploading..." : "Upload NAV Data"}
              </button>
            </form>
          </div>
        )}

        {/* File upload (drag & drop) */}
        {mode === "file" && (
          <div className="bg-card border border-border p-6 mb-6 rounded-lg">
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleFileDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragOver ? "border-primary bg-primary/5" : "border-border"
              }`}
            >
              <p className="text-foreground font-medium mb-2">
                {uploading ? "Parsing file..." : "Drag & drop an Excel or CSV file here"}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Supports .xlsx, .csv files. Date and NAV columns are auto-detected.
              </p>
              <label className="inline-block px-4 py-2 bg-secondary text-foreground text-sm font-medium rounded cursor-pointer hover:bg-secondary/80">
                Or click to browse
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </div>

            {/* Parse result preview */}
            {fileParseResult && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground font-medium">{fileParseResult.fileName}</span>
                  <span className="text-muted-foreground">
                    {fileParseResult.parsedCount} of {fileParseResult.totalRows} rows parsed
                  </span>
                </div>

                <p className="text-xs text-muted-foreground">
                  Detected columns: Date = "{fileParseResult.detectedColumns.date}", NAV = "{fileParseResult.detectedColumns.nav}"
                </p>

                {fileParseResult.errors.length > 0 && (
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded text-xs text-red-400 max-h-32 overflow-y-auto">
                    {fileParseResult.errors.map((err, i) => (
                      <div key={i}>{err}</div>
                    ))}
                  </div>
                )}

                {/* Preview table */}
                <div className="max-h-48 overflow-y-auto border border-border rounded">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-secondary">
                      <tr>
                        <th className="text-left py-1.5 px-3 text-xs font-semibold text-muted-foreground">Date</th>
                        <th className="text-left py-1.5 px-3 text-xs font-semibold text-muted-foreground">NAV</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fileParseResult.entries.slice(0, 20).map((e, i) => (
                        <tr key={i} className="border-t border-border/50">
                          <td className="py-1 px-3 text-foreground">{e.date}</td>
                          <td className="py-1 px-3 text-foreground font-mono">{e.nav.toFixed(4)}</td>
                        </tr>
                      ))}
                      {fileParseResult.entries.length > 20 && (
                        <tr>
                          <td colSpan={2} className="py-1 px-3 text-muted-foreground text-center">
                            ...and {fileParseResult.entries.length - 20} more rows
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <button
                  onClick={handleFileUploadCommit}
                  disabled={submitting || !selectedFund || fileParseResult.parsedCount === 0}
                  className={`px-6 py-3 bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 transition-opacity rounded ${
                    submitting || !selectedFund ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {submitting
                    ? "Uploading..."
                    : `Upload ${fileParseResult.parsedCount} NAV Entries`}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Status message */}
        {message && (
          <div
            className={`p-4 mb-6 border text-sm rounded ${
              message.type === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-red-500/30 bg-red-500/10 text-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Recent uploads */}
        <div className="bg-card border border-border p-6 rounded-lg">
          <h2 className="font-serif text-lg font-bold text-foreground mb-4">Recent NAV Entries</h2>
          {recentNavs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No NAV data uploaded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">Fund</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">Date</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase">NAV</th>
                  </tr>
                </thead>
                <tbody>
                  {recentNavs.map((r, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-2 px-3 text-sm text-foreground">{r.fund_name}</td>
                      <td className="py-2 px-3 text-sm text-muted-foreground">{r.date}</td>
                      <td className="py-2 px-3 text-sm font-medium text-foreground">{r.nav.toFixed(4)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavUpload;
