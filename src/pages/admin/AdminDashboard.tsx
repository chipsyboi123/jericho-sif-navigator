import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ funds: 0, amcs: 0, leads: 0, navEntries: 0 });
  const [scraperStatus, setScraperStatus] = useState<{ lastRun: string | null; lastCount: number } | null>(null);
  const [triggeringScraper, setTriggeringScraper] = useState(false);

  useEffect(() => {
    loadStats();
    loadScraperStatus();
  }, []);

  async function loadStats() {
    try {
      const [funds, amcs, leads] = await Promise.all([
        apiFetch<any[]>("/api/funds"),
        apiFetch<any[]>("/api/amcs"),
        apiFetch<any[]>("/api/leads"),
      ]);
      setStats({
        funds: funds.length,
        amcs: amcs.length,
        leads: leads.length,
        navEntries: 0,
      });
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  }

  async function loadScraperStatus() {
    try {
      const status = await apiFetch<{ lastRun: string | null; lastCount: number }>("/api/scraper/status");
      setScraperStatus(status);
    } catch {
      // ignore
    }
  }

  async function triggerScraper() {
    setTriggeringScraper(true);
    try {
      const result = await apiFetch<{ count: number }>("/api/scraper/run", { method: "POST" });
      alert(`Scraper completed: ${result.count} NAV entries processed`);
      loadScraperStatus();
    } catch (err: any) {
      alert(`Scraper failed: ${err.message}`);
    }
    setTriggeringScraper(false);
  }

  const cards = [
    { label: "Funds", value: stats.funds, link: "/admin/funds", color: "border-blue-500/30" },
    { label: "AMCs", value: stats.amcs, link: "/admin/amcs", color: "border-purple-500/30" },
    { label: "Leads", value: stats.leads, link: "/admin/leads", color: "border-emerald-500/30" },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-foreground mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.link}
            className={`bg-card border ${card.color} p-5 rounded-lg hover:bg-secondary/50 transition-colors`}
          >
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <p className="text-3xl font-bold text-foreground mt-1">{card.value}</p>
          </Link>
        ))}
      </div>

      {/* Scraper Status */}
      <div className="bg-card border border-border p-5 rounded-lg mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-serif text-lg font-bold text-foreground">AMFI NAV Scraper</h2>
          <button
            onClick={triggerScraper}
            disabled={triggeringScraper}
            className={`px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity ${
              triggeringScraper ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {triggeringScraper ? "Running..." : "Run Now"}
          </button>
        </div>
        {scraperStatus && (
          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              Last run:{" "}
              {scraperStatus.lastRun
                ? new Date(scraperStatus.lastRun).toLocaleString("en-IN")
                : "Never"}
            </p>
            <p>NAV entries in last 24h: {scraperStatus.lastCount}</p>
            <p className="text-xs">Auto-runs weekdays at 10:30 PM IST</p>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="bg-card border border-border p-5 rounded-lg">
        <h2 className="font-serif text-lg font-bold text-foreground mb-3">Quick Actions</h2>
        <div className="flex gap-3 flex-wrap">
          <Link to="/admin/nav-upload" className="px-4 py-2 bg-secondary text-foreground text-sm rounded hover:bg-secondary/80">
            Upload NAVs
          </Link>
          <Link to="/admin/funds" className="px-4 py-2 bg-secondary text-foreground text-sm rounded hover:bg-secondary/80">
            Manage Funds
          </Link>
          <Link to="/admin/blog" className="px-4 py-2 bg-secondary text-foreground text-sm rounded hover:bg-secondary/80">
            Write Blog Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
