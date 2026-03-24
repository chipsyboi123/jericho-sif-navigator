import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  investment_range: string | null;
  investment_horizon: string | null;
  source: string | null;
  message: string | null;
  source_page: string | null;
  status: string;
  created_at: string;
}

const statusOptions = ["new", "contacted", "qualified", "converted", "closed"];

const LeadManager = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => { loadLeads(); }, []);

  async function loadLeads() {
    try {
      const data = await apiFetch<Lead[]>("/api/leads");
      setLeads(data);
    } catch (err) { console.error(err); }
  }

  async function updateStatus(id: string, status: string) {
    try {
      await apiFetch(`/api/leads/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
      loadLeads();
    } catch (err: any) { alert(`Update failed: ${err.message}`); }
  }

  const filtered = filter
    ? leads.filter((l) => l.status === filter)
    : leads;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold text-foreground">Leads ({leads.length})</h1>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded">
          <option value="">All Statuses</option>
          {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map((lead) => (
          <div key={lead.id} className="bg-card border border-border p-4 rounded-lg">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-foreground">{lead.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {lead.email} {lead.phone && `| ${lead.phone}`}
                </p>
                {lead.investment_range && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Range: {lead.investment_range} {lead.investment_horizon && `| Horizon: ${lead.investment_horizon}`}
                  </p>
                )}
                {lead.message && (
                  <p className="text-xs text-foreground/70 mt-1 italic">"{lead.message}"</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(lead.created_at).toLocaleString("en-IN")}
                  {lead.source && ` | Source: ${lead.source}`}
                  {lead.source_page && ` | Page: ${lead.source_page}`}
                </p>
              </div>
              <select
                value={lead.status}
                onChange={(e) => updateStatus(lead.id, e.target.value)}
                className={`text-xs px-2 py-1 rounded border-0 ${
                  lead.status === "new" ? "bg-blue-500/10 text-blue-500" :
                  lead.status === "contacted" ? "bg-yellow-500/10 text-yellow-500" :
                  lead.status === "qualified" ? "bg-purple-500/10 text-purple-500" :
                  lead.status === "converted" ? "bg-emerald-500/10 text-emerald-500" :
                  "bg-red-500/10 text-red-500"
                }`}
              >
                {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-sm text-muted-foreground">No leads found.</p>}
      </div>
    </div>
  );
};

export default LeadManager;
