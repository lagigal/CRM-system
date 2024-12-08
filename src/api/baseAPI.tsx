import axios from 'axios';
import {
  TaskStatus,
  Todo,
  TodoRequest,
  dataTasks,
} from "../constants/interfaces";

const url = "https://easydev.club/api/v1";

export async function getTasks(status: TaskStatus): Promise<dataTasks> {
  try {
    const response = await axios.get(`${url}/todos`, {
      params: {filter: status}
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error; 
  }
}

export async function createTasks(task: TodoRequest): Promise<Todo> {
  try {
    const response = await axios.post(`${url}/todos`, task,  {
      headers: {
        "Content-type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error; 
  }
}

export async function deleteTasks(id: number) {
  try {
    await axios.delete(`${url}/todos/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}

export async function getTask(id: number): Promise<Todo> {
  try {
    const response = await axios.get(`${url}/todos/${id}`);
    return response.data
  } catch (error) {
    console.error("Error fetching task:", error);
    throw error;
  }
}

export async function updateTask(
  id: number,
  updatedData: TodoRequest
): Promise<Todo> {
  try {
    const response = await axios.put(`${url}/todos/${id}`, updatedData, {
      headers: {
        "Content-type": "application/json",
      },
    });
    return response.data
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
}
