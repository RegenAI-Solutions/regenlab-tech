import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

export function Layout() {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/api-keys", label: "API Keys" },
  ];

  if (isAdmin) {
    navItems.push({ path: "/admin/users", label: "Users" });
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="text-xl font-bold text-slate-900">
              RegenAI
            </Link>
            <nav className="flex gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`rounded-lg px-3 py-2 text-sm font-medium ${
                    location.pathname === item.path
                      ? "bg-emerald-100 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/#/en"
              className="text-sm font-medium text-slate-500 hover:text-slate-800"
            >
              ← Home
            </a>
            <span className="text-sm text-slate-600">
              {user?.full_name || user?.username}
              {isAdmin && (
                <span className="ml-2 rounded bg-purple-100 px-2 py-0.5 text-xs text-purple-700">
                  Admin
                </span>
              )}
            </span>
            <button
              onClick={logout}
              className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
