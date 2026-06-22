import { useQuery } from "@tanstack/react-query";
import { getMyCredit } from "../api/auth";
import { useAuth } from "../contexts/auth-context";

export function DashboardPage() {
  const { user } = useAuth();

  const { data: creditInfo, isLoading } = useQuery({
    queryKey: ["credit"],
    queryFn: getMyCredit,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* User Info Card */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            User Info
          </h2>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm text-slate-500">Username</dt>
              <dd className="font-medium text-slate-900">{user?.username}</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Email</dt>
              <dd className="font-medium text-slate-900">{user?.email}</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Full Name</dt>
              <dd className="font-medium text-slate-900">
                {user?.full_name || "-"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Role</dt>
              <dd className="font-medium text-slate-900 capitalize">
                {user?.role}
              </dd>
            </div>
          </dl>
        </div>

        {/* Credit Card */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Credit Balance
          </h2>
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-10 w-24 rounded bg-slate-200"></div>
            </div>
          ) : (
            <div className="text-4xl font-bold text-emerald-600">
              {creditInfo?.remaining_credit.toLocaleString() ?? 0}
            </div>
          )}
          <p className="mt-2 text-sm text-slate-500">credits remaining</p>
        </div>

        {/* Quick Links Card */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Quick Links
          </h2>
          <ul className="space-y-2">
            <li>
              <a
                href="/app/#/api-keys"
                className="text-emerald-600 hover:underline"
              >
                Manage API Keys
              </a>
            </li>
            <li>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline"
              >
                API Documentation
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
