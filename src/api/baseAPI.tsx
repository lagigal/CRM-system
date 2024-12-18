import axios from "axios";
import {
  AuthData,
  Profile,
  TaskStatus,
  Todo,
  TodoRequest,
  Token,
  UserRegistration,
  dataTasks,
} from "../constants/interfaces";

const axiosInstance = axios.create({
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
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        console.error("No refresh token available");
        return Promise.reject(error);
      }

      try {
        const response = await axiosInstance.post("/auth/refresh", {
          refreshToken,
        });
        console.log(response);
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem("refreshToken", newRefreshToken);
        localStorage.setItem("accessToken", accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
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
    const accessToken = localStorage.getItem("accessToken");
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

export async function getTasks(status: TaskStatus): Promise<dataTasks> {
  const response = await axiosInstance.get("/todos", {
    params: { filter: status },
  });
  return response.data;
}

export async function createTasks(task: TodoRequest): Promise<Todo> {
  return axiosInstance.post("/todos", task);
}

export async function deleteTasks(id: number): Promise<void> {
  return axiosInstance.delete(`/todos/${id}`);
}

export async function getTask(id: number): Promise<Todo> {
  return axiosInstance.get(`/todos/${id}`);
}

export async function updateTask(
  id: number,
  updatedData: TodoRequest
): Promise<Todo> {
  return axiosInstance.put(`/todos/${id}`, updatedData);
}

export async function userRegistration(
  userData: UserRegistration
): Promise<Profile> {
  return axiosInstance.post(`/auth/signup`, userData);
}

export async function userAuth(authData: AuthData): Promise<Token> {
  const response = await axiosInstance.post(`/auth/signin`, authData);
  return response.data;
}

export async function userLogout() {
  try {
    await axiosInstance.post(`/user/logout`);
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
}

export async function userProfile(): Promise<Profile> {
  const response = await axiosInstance.get(`/user/profile`);
  return response.data;
}