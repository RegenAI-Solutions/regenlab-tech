import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  createApiKey,
  listApiKeys,
  revokeApiKey,
  type ApiKeyInfo,
  type CreateApiKeyResponse,
} from "../api/api-keys";

export function ApiKeysPage() {
  const queryClient = useQueryClient();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKey, setNewKey] = useState<CreateApiKeyResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["api-keys"],
    queryFn: listApiKeys,
  });

  const createMutation = useMutation({
    mutationFn: createApiKey,
    onSuccess: (data) => {
      setNewKey(data);
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
    },
  });

  const revokeMutation = useMutation({
    mutationFn: revokeApiKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
    },
  });

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createMutation.mutate({
      name: formData.get("name") as string,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const closeNewKeyModal = () => {
    setNewKey(null);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">API Keys</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
        >
          Create New Key
        </button>
      </div>

      {/* Keys Table */}
      <div className="rounded-xl bg-white shadow">
        {isLoading ? (
          <div className="p-8 text-center">Loading...</div>
        ) : data?.keys.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No API keys yet. Create one to get started.
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-500">
                  Key
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-500">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-500">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data?.keys.map((key: ApiKeyInfo) => (
                <tr key={key.id}>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {key.name}
                  </td>
                  <td className="px-6 py-4 font-mono text-sm text-slate-500">
                    {key.key_prefix}...
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {key.created_at
                      ? new Date(key.created_at).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        key.is_active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {key.is_active ? "Active" : "Revoked"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {key.is_active && (
                      <button
                        onClick={() => {
                          if (confirm("Revoke this API key?")) {
                            revokeMutation.mutate(key.id);
                          }
                        }}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Revoke
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && !newKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Create API Key</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Key Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="e.g., Production Key"
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-lg bg-slate-100 px-4 py-2 text-slate-700 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                  {createMutation.isPending ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Key Display Modal */}
      {newKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-xl bg-white p-6">
            <h2 className="mb-2 text-lg font-semibold text-emerald-700">
              API Key Created!
            </h2>
            <p className="mb-4 text-sm text-slate-600">
              Copy this key now. You won't be able to see it again!
            </p>
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-slate-100 p-3">
              <code className="flex-1 break-all font-mono text-sm">
                {newKey.key}
              </code>
              <button
                onClick={() => copyToClipboard(newKey.key)}
                className="shrink-0 rounded bg-emerald-600 px-3 py-1 text-sm text-white hover:bg-emerald-700"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <button
              onClick={closeNewKeyModal}
              className="w-full rounded-lg bg-slate-100 px-4 py-2 text-slate-700 hover:bg-slate-200"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
