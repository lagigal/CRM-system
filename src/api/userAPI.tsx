import { AuthData, dataTasks, Profile, TaskStatus, Todo, TodoRequest, Token, UserRegistration } from "../constants/interfaces";
import { authService, axiosInstance } from "./baseAPI";

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
      authService.clearAccessToken();
      localStorage.removeItem("refreshToken");
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
  }
  
  export async function userProfile(): Promise<Profile> {
    const response = await axiosInstance.get(`/user/profile`);
    return response.data;
  }