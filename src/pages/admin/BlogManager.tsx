import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  excerpt: string;
  author: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
}

const categoryOptions = ["updates", "strategy", "tax", "education"];

const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadPosts(); }, []);

  async function loadPosts() {
    try {
      const data = await apiFetch<BlogPost[]>("/api/blog/admin/all");
      setPosts(data);
    } catch (err) { console.error(err); }
  }

  function startCreate() {
    setEditing({
      title: "", slug: "", category: "updates", content: "", excerpt: "",
      author: "Jericho SIF Team", published: false,
    });
    setIsNew(true);
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    try {
      if (isNew) {
        await apiFetch("/api/blog", { method: "POST", body: JSON.stringify(editing) });
      } else {
        await apiFetch(`/api/blog/${editing.id}`, { method: "PUT", body: JSON.stringify(editing) });
      }
      setEditing(null);
      loadPosts();
    } catch (err: any) { alert(`Save failed: ${err.message}`); }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this blog post?")) return;
    try {
      await apiFetch(`/api/blog/${id}`, { method: "DELETE" });
      loadPosts();
    } catch (err: any) { alert(`Delete failed: ${err.message}`); }
  }

  async function togglePublish(post: BlogPost) {
    try {
      await apiFetch(`/api/blog/${post.id}`, {
        method: "PUT",
        body: JSON.stringify({ published: !post.published }),
      });
      loadPosts();
    } catch (err: any) { alert(`Update failed: ${err.message}`); }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold text-foreground">Blog Manager</h1>
        <button onClick={startCreate} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded hover:opacity-90">
          + New Post
        </button>
      </div>

      <div className="space-y-3 mb-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-card border border-border p-4 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-foreground">{post.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {post.category} &middot; {post.author}
                {post.published_at && ` &middot; ${new Date(post.published_at).toLocaleDateString("en-IN")}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => togglePublish(post)}
                className={`text-xs px-2 py-1 rounded ${
                  post.published ? "bg-emerald-500/10 text-emerald-500" : "bg-yellow-500/10 text-yellow-500"
                }`}
              >
                {post.published ? "Published" : "Draft"}
              </button>
              <button onClick={() => { setEditing({ ...post }); setIsNew(false); }} className="text-xs text-primary hover:underline">Edit</button>
              <button onClick={() => handleDelete(post.id)} className="text-xs text-red-400 hover:underline">Delete</button>
            </div>
          </div>
        ))}
        {posts.length === 0 && <p className="text-sm text-muted-foreground">No blog posts yet.</p>}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 overflow-y-auto">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-2xl m-4">
            <h2 className="font-serif text-xl font-bold text-foreground mb-4">{isNew ? "Create Post" : "Edit Post"}</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Title</label>
                  <input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Slug</label>
                  <input value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Category</label>
                  <select value={editing.category || "updates"} onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded">
                    {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Author</label>
                  <input value={editing.author || ""} onChange={(e) => setEditing({ ...editing, author: e.target.value })}
                    className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Excerpt</label>
                <input value={editing.excerpt || ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                  className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm rounded" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Content (Markdown)</label>
                <textarea rows={12} value={editing.content || ""}
                  onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                  className="w-full px-3 py-2 bg-secondary border border-border text-foreground text-sm font-mono rounded resize-none" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="published" checked={editing.published || false}
                  onChange={(e) => setEditing({ ...editing, published: e.target.checked })} />
                <label htmlFor="published" className="text-sm text-foreground">Published</label>
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

export default BlogManager;
