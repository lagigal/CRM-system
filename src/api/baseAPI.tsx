import axios from "axios";
import {
  TaskStatus,
  Todo,
  TodoRequest,
  dataTasks,
} from "../constants/interfaces";

const axiosInstance = axios.create({
  baseURL: "https://easydev.club/api/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
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
