import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { path: "/admin/dashboard", label: "Dashboard" },
  { path: "/admin/funds", label: "Funds" },
  { path: "/admin/amcs", label: "AMCs" },
  { path: "/admin/nav-upload", label: "NAV Upload" },
  { path: "/admin/blog", label: "Blog" },
  { path: "/admin/leads", label: "Leads" },
];

const AdminLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen pt-16">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 min-h-[calc(100vh-4rem)] bg-card border-r border-border p-4 shrink-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-lg font-bold text-foreground">Admin</h2>
            <button
              onClick={logout}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign Out
            </button>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block px-3 py-2 text-sm rounded transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 max-w-5xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
