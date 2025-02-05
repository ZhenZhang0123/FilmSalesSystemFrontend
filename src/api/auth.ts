import axios from "axios";

const API_BASE_URL = "http://localhost:8080/auth";

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  roles: string[];
}

export const registerUser = async (data: RegisterRequest) => {
  const response = await axios.post<AuthResponse>(`${API_BASE_URL}/register`, data);
  return response.data;
};

export const loginUser = async (data: AuthRequest) => {
  const response = await axios.post<AuthResponse>(`${API_BASE_URL}/login`, data);
  return response.data;
};
