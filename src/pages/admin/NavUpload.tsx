import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

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

const NavUpload = () => {
  const { logout } = useAuth();
  const [funds, setFunds] = useState<FundOption[]>([]);
  const [selectedFund, setSelectedFund] = useState("");
  const [mode, setMode] = useState<"single" | "bulk">("single");

  // Single entry
  const [navDate, setNavDate] = useState("");
  const [navValue, setNavValue] = useState("");

  // Bulk entry
  const [csvText, setCsvText] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [recentNavs, setRecentNavs] = useState<RecentNav[]>([]);

  useEffect(() => {
    fetchFunds();
    fetchRecentNavs();
  }, []);

  async function fetchFunds() {
    const { data } = await supabase
      .from("sif_funds")
      .select("id, name, slug")
      .order("name");
    if (data) setFunds(data);
  }

  async function fetchRecentNavs() {
    const { data } = await supabase
      .from("nav_history")
      .select("date, nav, sif_funds(name)")
      .order("date", { ascending: false })
      .limit(20);

    if (data) {
      setRecentNavs(
        data.map((r: any) => ({
          fund_name: r.sif_funds?.name || "Unknown",
          date: r.date,
          nav: parseFloat(r.nav),
        }))
      );
    }
  }

  function parseCSV(text: string): NavEntry[] {
    const lines = text.trim().split("\n");
    const entries: NavEntry[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.toLowerCase().startsWith("date")) continue; // skip header

      const parts = trimmed.split(/[,\t]/);
      if (parts.length < 2) continue;

      const dateStr = parts[0].trim();
      const navStr = parts[1].trim();
      const nav = parseFloat(navStr);
      if (isNaN(nav)) continue;

      // Support DD-MM-YYYY, DD/MM/YYYY, YYYY-MM-DD formats
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

    const { error } = await supabase
      .from("nav_history")
      .upsert({ fund_id: selectedFund, date: navDate, nav }, { onConflict: "fund_id,date" });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      // Update current_nav on the fund if this is the latest date
      await supabase
        .from("sif_funds")
        .update({ current_nav: nav, nav_date: navDate })
        .eq("id", selectedFund);

      setMessage({ type: "success", text: "NAV entry saved successfully" });
      setNavDate("");
      setNavValue("");
      fetchRecentNavs();
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

    const rows = entries.map((e) => ({
      fund_id: selectedFund,
      date: e.date,
      nav: e.nav,
    }));

    const { error } = await supabase
      .from("nav_history")
      .upsert(rows, { onConflict: "fund_id,date" });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      // Update current_nav with the latest date entry
      const sorted = entries.sort((a, b) => b.date.localeCompare(a.date));
      await supabase
        .from("sif_funds")
        .update({ current_nav: sorted[0].nav, nav_date: sorted[0].date })
        .eq("id", selectedFund);

      setMessage({ type: "success", text: `${entries.length} NAV entries uploaded successfully` });
      setCsvText("");
      fetchRecentNavs();
    }

    setSubmitting(false);
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl font-bold text-foreground">NAV Upload</h1>
          <button
            onClick={logout}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Fund selector */}
        <div className="bg-card border border-border p-6 mb-6">
          <label className="text-sm font-medium text-foreground mb-2 block">Select Fund</label>
          <select
            value={selectedFund}
            onChange={(e) => setSelectedFund(e.target.value)}
            className="w-full px-4 py-2.5 bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
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
          <button
            onClick={() => setMode("single")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === "single" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            Single Entry
          </button>
          <button
            onClick={() => setMode("bulk")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === "bulk" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            Bulk Upload (CSV)
          </button>
        </div>

        {/* Single entry form */}
        {mode === "single" && (
          <div className="bg-card border border-border p-6 mb-6">
            <form onSubmit={handleSingleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Date</label>
                  <input
                    type="date"
                    required
                    value={navDate}
                    onChange={(e) => setNavDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
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
                    className="w-full px-4 py-2.5 bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting || !selectedFund}
                className={`px-6 py-3 bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 transition-opacity ${
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
          <div className="bg-card border border-border p-6 mb-6">
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
                  className="w-full px-4 py-2.5 bg-secondary border border-border text-foreground text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting || !selectedFund}
                className={`px-6 py-3 bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 transition-opacity ${
                  submitting || !selectedFund ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {submitting ? "Uploading..." : "Upload NAV Data"}
              </button>
            </form>
          </div>
        )}

        {/* Status message */}
        {message && (
          <div
            className={`p-4 mb-6 border text-sm ${
              message.type === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-red-500/30 bg-red-500/10 text-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Recent uploads */}
        <div className="bg-card border border-border p-6">
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
