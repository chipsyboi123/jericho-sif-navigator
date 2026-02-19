import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/admin/nav-upload", { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const err = await login(email, password);
    if (err) {
      setError(err.message);
      setSubmitting(false);
    } else {
      navigate("/admin/nav-upload", { replace: true });
    }
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-md">
        <h1 className="font-serif text-3xl font-bold mb-8 text-foreground">Admin Login</h1>
        <div className="bg-card border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className={`w-full px-6 py-3 bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 transition-opacity ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {submitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
