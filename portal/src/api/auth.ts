import axios from "axios";
import { apiClient } from "./client";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://api.regenaisolutions.com/gateway";

export interface User {
  username: string;
  email: string;
  full_name: string;
  role: string;
  exp: number;
  auth_type?: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface CreditInfo {
  username: string;
  remaining_credit: number;
}

// Login uses OAuth2 form data, not JSON
export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const response = await axios.post<LoginResponse>(
    `${API_BASE_URL}/v1/auth/login`,
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data;
}

export async function getCurrentUser(): Promise<User> {
  const response = await apiClient.get<User>("/v1/auth/me");
  return response.data;
}

export async function getMyCredit(): Promise<CreditInfo> {
  const response = await apiClient.get<CreditInfo>("/v1/users/me/credit");
  return response.data;
}

export async function refreshToken(): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>("/v1/auth/refresh");
  return response.data;
}
