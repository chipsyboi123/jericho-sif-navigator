import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";

interface Amc {
  id: string;
  name: string;
  sif_brand: string | null;
  status: string;
  logo_url: string | null;
  website_url: string | null;
  sebi_approval_date: string | null;
}

const statusOptions = ["active", "approved", "applied", "upcoming"];

const AmcManager = () => {
  const [amcs, setAmcs] = useState<Amc[]>([]);
  const [editing, setEditing] = useState<Partial<Amc> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadAmcs(); }, []);

  async function loadAmcs() {
    try {
      const data = await apiFetch<Amc[]>("/api/amcs");
      setAmcs(data);
    } catch (err) { console.error(err); }
  }

  function startCreate() {
    setEditing({ name: "", sif_brand: "", status: "upcoming", logo_url: "", website_url: "", sebi_approval_date: null });
    setIsNew(true);
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    try {
      if (isNew) {
        await apiFetch("/api/amcs", { method: "POST", body: JSON.stringify(editing) });
      } else {
        await apiFetch(`/api/amcs/${editing.id}`, { method: "PUT", body: JSON.stringify(editing) });
      }
      setEditing(null);
      loadAmcs();
    } catch (err: any) { alert(`Save failed: ${err.message}`); }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this AMC? Funds under this AMC will lose their AMC reference.")) return;
    try {
      await apiFetch(`/api/amcs/${id}`, { method: "DELETE" });
      loadAmcs();
    } catch (err: any) { alert(`Delete failed: ${err.message}`); }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold text-foreground">AMC Manager</h1>
        <button onClick={startCreate} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded hover:opacity-90">
          + Add AMC
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden mb-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left py-2.5 px-3 text-xs font-semibold text-muted-foreground uppercase">Name</th>
              <th className="text-left py-2.5 px-3 text-xs font-semibold text-muted-foreground uppercase">SIF Brand</th>
              <th className="text-left py-2.5 px-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
              <th className="text-right py-2.5 px-3 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {amcs.map((a) => (
              <tr key={a.id} className="border-b border-border/50 hover:bg-secondary/30">
                <td className="py-2 px-3 text-sm text-foreground font-medium">{a.name}</td>
                <td className="py-2 px-3 text-sm text-muted-foreground">{a.sif_brand || "-"}</td>
                <td className="py-2 px-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    a.status === "active" ? "bg-emerald-500/10 text-emerald-500" :
                    a.status === "approved" ? "bg-blue-500/10 text-blue-500" :
                    "bg-yellow-500/10 text-yellow-500"
                  }`}>{a.status}</span>
                </td>
                <td className="py-2 px-3 text-right">
                  <button onClick={() => { setEditing({ ...a }); setIsNew(false); }} className="text-xs text-primary hover:underline mr-3">Edit</button>
                  <button onClick={() => handleDelete(a.id)} className="text-xs text-red-400 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md m-4">
            <h2 className="font-serif text-xl font-bold text-foreground mb-4">{isNew ? "Create AMC" : "Edit AMC"}</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Name</label>
                <input value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">SIF Brand</label>
                <input value={editing.sif_brand || ""} onChange={(e) => setEditing({ ...editing, sif_brand: e.target.value })}
                  className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Status</label>
                <select value={editing.status || "upcoming"} onChange={(e) => setEditing({ ...editing, status: e.target.value })}
                  className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded">
                  {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Website URL</label>
                <input value={editing.website_url || ""} onChange={(e) => setEditing({ ...editing, website_url: e.target.value })}
                  className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded" />
              </div>
            </div>
            <div className="flex gap-3 mt-6 justify-end">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm text-muted-foreground">Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className={`px-6 py-2 bg-primary text-primary-foreground text-sm font-medium rounded ${saving ? "opacity-50" : ""}`}>
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AmcManager;
