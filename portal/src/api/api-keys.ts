import { apiClient } from "./client";

export interface ApiKeyInfo {
  id: string;
  name: string;
  key_prefix: string;
  scopes: string[];
  created_at: string | null;
  last_used_at: string | null;
  expires_at: string | null;
  is_active: boolean;
}

export interface CreateApiKeyRequest {
  name: string;
  scopes?: string[];
  expires_at?: string;
}

export interface CreateApiKeyResponse {
  id: string;
  name: string;
  key: string; // Full key - shown only once!
  key_prefix: string;
  scopes: string[];
  created_at: string | null;
  expires_at: string | null;
}

export interface ApiKeyListResponse {
  keys: ApiKeyInfo[];
  total: number;
}

export async function createApiKey(
  data: CreateApiKeyRequest
): Promise<CreateApiKeyResponse> {
  const response = await apiClient.post<CreateApiKeyResponse>(
    "/v1/api-keys",
    data
  );
  return response.data;
}

export async function listApiKeys(): Promise<ApiKeyListResponse> {
  const response = await apiClient.get<ApiKeyListResponse>("/v1/api-keys");
  return response.data;
}

export async function getApiKey(keyId: string): Promise<ApiKeyInfo> {
  const response = await apiClient.get<ApiKeyInfo>(`/v1/api-keys/${keyId}`);
  return response.data;
}

export async function revokeApiKey(
  keyId: string
): Promise<{ success: boolean; message: string }> {
  const response = await apiClient.delete(`/v1/api-keys/${keyId}`);
  return response.data;
}
