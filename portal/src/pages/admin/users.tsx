import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  addCredit,
  createTrialUser,
  createUser,
  deleteUser,
  listUsers,
  type AdminUser,
} from "../../api/admin";

export function AdminUsersPage() {
  const queryClient = useQueryClient();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreditModal, setShowCreditModal] = useState<AdminUser | null>(
    null
  );
  const [isTrialUser, setIsTrialUser] = useState(false);

  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => listUsers(),
  });

  const createMutation = useMutation({
    mutationFn: isTrialUser ? createTrialUser : createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      setShowCreateModal(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });

  const creditMutation = useMutation({
    mutationFn: ({
      userId,
      amount,
      note,
    }: {
      userId: string;
      amount: number;
      note: string;
    }) => addCredit(userId, { credit_amount: amount, note }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      setShowCreditModal(null);
    },
  });

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      full_name: formData.get("full_name") as string,
      role: formData.get("role") as string,
      ...(isTrialUser && {
        ttl: parseInt(formData.get("ttl") as string) || 30,
        credit_amount: parseInt(formData.get("credit_amount") as string) || 100,
      }),
    };
    createMutation.mutate(data);
  };

  const handleAddCredit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!showCreditModal) return;
    const formData = new FormData(e.currentTarget);
    creditMutation.mutate({
      userId: showCreditModal.id,
      amount: parseInt(formData.get("amount") as string),
      note: formData.get("note") as string,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
        >
          Create User
        </button>
      </div>

      {/* Users Table */}
      <div className="rounded-xl bg-white shadow overflow-x-auto">
        {isLoading ? (
          <div className="p-8 text-center">Loading...</div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">
                  Username
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">
                  Expires
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {users?.map((user: AdminUser) => (
                <tr key={user.id}>
                  <td className="px-4 py-4 font-medium text-slate-900">
                    {user.username}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-500">
                    {user.email}
                  </td>
                  <td className="px-4 py-4 text-sm capitalize">{user.role}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        user.is_active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-500">
                    {user.expired_at
                      ? new Date(user.expired_at).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-4 text-right space-x-2">
                    <button
                      onClick={() => setShowCreditModal(user)}
                      className="text-sm text-emerald-600 hover:text-emerald-800"
                    >
                      Add Credit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete user ${user.username}?`)) {
                          deleteMutation.mutate(user.id);
                        }
                      }}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="mb-4 text-lg font-semibold">Create User</h2>
            <div className="mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isTrialUser}
                  onChange={(e) => setIsTrialUser(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-slate-700">Trial User</span>
              </label>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  required
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  name="full_name"
                  type="text"
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Role
                </label>
                <select
                  name="role"
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              {isTrialUser && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      TTL (days)
                    </label>
                    <input
                      name="ttl"
                      type="number"
                      defaultValue={30}
                      className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Initial Credit
                    </label>
                    <input
                      name="credit_amount"
                      type="number"
                      defaultValue={100}
                      className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
                    />
                  </div>
                </>
              )}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-lg bg-slate-100 px-4 py-2 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-white disabled:opacity-50"
                >
                  {createMutation.isPending ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Credit Modal */}
      {showCreditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">
              Add Credit to {showCreditModal.username}
            </h2>
            <form onSubmit={handleAddCredit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Amount
                </label>
                <input
                  name="amount"
                  type="number"
                  required
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Note
                </label>
                <input
                  name="note"
                  type="text"
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreditModal(null)}
                  className="rounded-lg bg-slate-100 px-4 py-2 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creditMutation.isPending}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-white disabled:opacity-50"
                >
                  {creditMutation.isPending ? "Adding..." : "Add Credit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
