import axios from "axios";
import { logoutUserThunk } from "../slices/userSlice";

export class AuthService {
  private accessToken: string | null = null;

  public setAccessToken(token: string): void {
    this.accessToken = token;
  }

  public getAccessToken(): string | null {
    return this.accessToken;
  }

  public hasAccessToken(): boolean {
    return this.accessToken !== null;
  }

  public clearAccessToken(): void {
    this.accessToken = null;
  }
}

export const authService = new AuthService();

export const axiosInstance = axios.create({
  baseURL: "https://easydev.club/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url.includes("/auth/refresh")) {
        // Если запрос на обновление токена тоже вернул 401, выполняем logout
        logoutUserThunk();
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        console.error("No refresh token available");
        return Promise.reject(error);
      }

      try {
        await updateTokens();

        originalRequest.headers.Authorization = `Bearer ${authService.getAccessToken()}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = authService.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function updateTokens(): Promise<void> {
  const refreshToken = localStorage.getItem("refreshToken");

  const response = await axiosInstance.post("/auth/refresh", {
    refreshToken,
  });
  const { accessToken, refreshToken: newRefreshToken } = response.data;
  
  localStorage.setItem("refreshToken", newRefreshToken);
  authService.setAccessToken(accessToken);
}

