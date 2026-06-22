import { apiClient } from "./client";

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  full_name: string | null;
  role: string;
  is_active: boolean;
  expired_at: string | null;
  host_computer: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  full_name?: string;
  role?: string;
}

export interface CreateTrialUserRequest extends CreateUserRequest {
  ttl?: number; // days
  credit_amount?: number;
}

export interface CreditRequest {
  credit_amount: number;
  note?: string;
}

export async function listUsers(
  skip = 0,
  limit = 50
): Promise<AdminUser[]> {
  const response = await apiClient.get<AdminUser[]>(
    `/v1/admin/users?skip=${skip}&limit=${limit}`
  );
  return response.data;
}

export async function getUser(userId: string): Promise<AdminUser> {
  const response = await apiClient.get<AdminUser>(`/v1/admin/users/${userId}`);
  return response.data;
}

export async function createUser(data: CreateUserRequest): Promise<AdminUser> {
  const response = await apiClient.post<AdminUser>("/v1/admin/users", data);
  return response.data;
}

export async function createTrialUser(
  data: CreateTrialUserRequest
): Promise<AdminUser> {
  const response = await apiClient.post<AdminUser>(
    "/v1/admin/users/trial",
    data
  );
  return response.data;
}

export async function deleteUser(userId: string): Promise<void> {
  await apiClient.delete(`/v1/admin/users/${userId}`);
}

export async function addCredit(
  userId: string,
  data: CreditRequest
): Promise<AdminUser> {
  const response = await apiClient.post<AdminUser>(
    `/v1/admin/users/${userId}/credit`,
    data
  );
  return response.data;
}

export async function setCredit(
  userId: string,
  data: CreditRequest
): Promise<AdminUser> {
  const response = await apiClient.put<AdminUser>(
    `/v1/admin/users/${userId}/credit`,
    data
  );
  return response.data;
}

export async function syncCredit(userId: string): Promise<void> {
  await apiClient.post(`/v1/admin/users/${userId}/credit/sync`);
}
