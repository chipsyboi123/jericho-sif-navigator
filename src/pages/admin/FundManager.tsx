import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";

interface Fund {
  id: string;
  amc_id: string;
  amc_name: string;
  name: string;
  slug: string;
  category: string;
  fund_type: string;
  benchmark: string;
  objective: string;
  fund_managers: string[];
  redemption_terms: string;
  exit_load: string;
  risk_band: number;
  min_investment: number;
  indicative_allocation: { equity: number; debt: number; derivatives: number };
  status: string;
  launch_date: string | null;
  current_nav: number | null;
  nav_date: string | null;
  amfi_sif_id: number | null;
  scheme_code: number | null;
}

interface Amc {
  id: string;
  name: string;
}

const emptyFund = {
  amc_id: "", name: "", slug: "", category: "hybrid_long_short", fund_type: "open_ended",
  benchmark: "", objective: "", fund_managers: [] as string[], redemption_terms: "",
  exit_load: "", risk_band: 3, min_investment: 1000000,
  indicative_allocation: { equity: 50, debt: 35, derivatives: 15 },
  status: "coming_soon", launch_date: null as string | null,
  amfi_sif_id: null as number | null, scheme_code: null as number | null,
};

const categories = [
  "equity_long_short", "equity_ex_top_100", "sector_rotation",
  "hybrid_long_short", "multi_asset", "active_asset_allocator",
  "debt_long_short", "sectoral_debt",
];

const statuses = ["launched", "nfo_open", "coming_soon", "closed"];

const FundManager = () => {
  const [funds, setFunds] = useState<Fund[]>([]);
  const [amcs, setAmcs] = useState<Amc[]>([]);
  const [editing, setEditing] = useState<Partial<Fund> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [managersText, setManagersText] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [fundsData, amcsData] = await Promise.all([
      apiFetch<Fund[]>("/api/funds"),
      apiFetch<Amc[]>("/api/amcs"),
    ]);
    setFunds(fundsData);
    setAmcs(amcsData);
  }

  function startEdit(fund: Fund) {
    setEditing({ ...fund });
    setManagersText(fund.fund_managers?.join(", ") || "");
    setIsNew(false);
  }

  function startCreate() {
    setEditing({ ...emptyFund });
    setManagersText("");
    setIsNew(true);
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);

    const payload = {
      ...editing,
      fund_managers: managersText.split(",").map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (isNew) {
        await apiFetch("/api/funds", { method: "POST", body: JSON.stringify(payload) });
      } else {
        await apiFetch(`/api/funds/${editing.id}`, { method: "PUT", body: JSON.stringify(payload) });
      }
      setEditing(null);
      loadData();
    } catch (err: any) {
      alert(`Save failed: ${err.message}`);
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this fund? This will also delete all NAV history for this fund.")) return;
    try {
      await apiFetch(`/api/funds/${id}`, { method: "DELETE" });
      loadData();
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold text-foreground">Fund Manager</h1>
        <button onClick={startCreate} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded hover:opacity-90">
          + Add Fund
        </button>
      </div>

      {/* Fund Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden mb-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left py-2.5 px-3 text-xs font-semibold text-muted-foreground uppercase">Fund</th>
              <th className="text-left py-2.5 px-3 text-xs font-semibold text-muted-foreground uppercase">AMC</th>
              <th className="text-left py-2.5 px-3 text-xs font-semibold text-muted-foreground uppercase">Category</th>
              <th className="text-left py-2.5 px-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
              <th className="text-left py-2.5 px-3 text-xs font-semibold text-muted-foreground uppercase">NAV</th>
              <th className="text-right py-2.5 px-3 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {funds.map((f) => (
              <tr key={f.id} className="border-b border-border/50 hover:bg-secondary/30">
                <td className="py-2 px-3 text-sm text-foreground font-medium">{f.name}</td>
                <td className="py-2 px-3 text-sm text-muted-foreground">{f.amc_name}</td>
                <td className="py-2 px-3 text-sm text-muted-foreground">{f.category?.replace(/_/g, " ")}</td>
                <td className="py-2 px-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    f.status === "launched" ? "bg-emerald-500/10 text-emerald-500" :
                    f.status === "nfo_open" ? "bg-blue-500/10 text-blue-500" :
                    "bg-yellow-500/10 text-yellow-500"
                  }`}>
                    {f.status?.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="py-2 px-3 text-sm font-mono text-foreground">
                  {f.current_nav ? Number(f.current_nav).toFixed(4) : "-"}
                </td>
                <td className="py-2 px-3 text-right">
                  <button onClick={() => startEdit(f)} className="text-xs text-primary hover:underline mr-3">Edit</button>
                  <button onClick={() => handleDelete(f.id)} className="text-xs text-red-400 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit/Create Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 overflow-y-auto">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-2xl m-4">
            <h2 className="font-serif text-xl font-bold text-foreground mb-4">
              {isNew ? "Create Fund" : "Edit Fund"}
            </h2>

            <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
              <div>
                <label className="text-xs font-medium text-muted-foreground">AMC</label>
                <select value={editing.amc_id || ""} onChange={(e) => setEditing({ ...editing, amc_id: e.target.value })}
                  className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded">
                  <option value="">Select AMC...</option>
                  {amcs.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Name</label>
                <input value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Slug</label>
                <input value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                  className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Category</label>
                <select value={editing.category || ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded">
                  {categories.map((c) => <option key={c} value={c}>{c.replace(/_/g, " ")}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Status</label>
                <select value={editing.status || ""} onChange={(e) => setEditing({ ...editing, status: e.target.value })}
                  className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded">
                  {statuses.map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Risk Band (1-5)</label>
                <input type="number" min={1} max={5} value={editing.risk_band || 3}
                  onChange={(e) => setEditing({ ...editing, risk_band: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Benchmark</label>
                <input value={editing.benchmark || ""} onChange={(e) => setEditing({ ...editing, benchmark: e.target.value })}
                  className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Min Investment</label>
                <input type="number" value={editing.min_investment || 1000000}
                  onChange={(e) => setEditing({ ...editing, min_investment: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Exit Load</label>
                <input value={editing.exit_load || ""} onChange={(e) => setEditing({ ...editing, exit_load: e.target.value })}
                  className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Launch Date</label>
                <input type="date" value={editing.launch_date || ""}
                  onChange={(e) => setEditing({ ...editing, launch_date: e.target.value || null })}
                  className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">AMFI SIF ID</label>
                <input type="number" value={editing.amfi_sif_id || ""}
                  onChange={(e) => setEditing({ ...editing, amfi_sif_id: e.target.value ? parseInt(e.target.value) : null })}
                  className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Redemption Terms</label>
                <input value={editing.redemption_terms || ""} onChange={(e) => setEditing({ ...editing, redemption_terms: e.target.value })}
                  className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded" />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-muted-foreground">Fund Managers (comma-separated)</label>
                <input value={managersText} onChange={(e) => setManagersText(e.target.value)}
                  className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded" />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-muted-foreground">Objective</label>
                <textarea rows={3} value={editing.objective || ""}
                  onChange={(e) => setEditing({ ...editing, objective: e.target.value })}
                  className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded resize-none" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Allocation - Equity %</label>
                <input type="number" value={editing.indicative_allocation?.equity || 0}
                  onChange={(e) => setEditing({ ...editing, indicative_allocation: { ...editing.indicative_allocation!, equity: parseInt(e.target.value) } })}
                  className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Allocation - Debt %</label>
                <input type="number" value={editing.indicative_allocation?.debt || 0}
                  onChange={(e) => setEditing({ ...editing, indicative_allocation: { ...editing.indicative_allocation!, debt: parseInt(e.target.value) } })}
                  className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Allocation - Derivatives %</label>
                <input type="number" value={editing.indicative_allocation?.derivatives || 0}
                  onChange={(e) => setEditing({ ...editing, indicative_allocation: { ...editing.indicative_allocation!, derivatives: parseInt(e.target.value) } })}
                  className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded" />
              </div>
            </div>

            <div className="flex gap-3 mt-6 justify-end">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving}
                className={`px-6 py-2 bg-primary text-primary-foreground text-sm font-medium rounded hover:opacity-90 ${saving ? "opacity-50" : ""}`}>
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundManager;
