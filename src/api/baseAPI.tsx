import {
  TaskStatus,
  Todo,
  TodoRequest,
  dataTasks,
} from "../constants/interfaces";

const url = "https://easydev.club/api/v1";

export async function getTasks(status: TaskStatus): Promise<dataTasks> {
  try {
    const res = await fetch(`${url}/todos?filter=${status}`, {
      method: "GET",
    });
    if(!res.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error; 
  }
}

export async function createTasks(task: TodoRequest): Promise<Todo> {
  try {
    const res = await fetch(`${url}/todos`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if(!res.ok) {
      throw new Error("Failed to create task");
    }
    return await res.json()
  } catch (error) {
    console.error("Error creating task:", error);
    throw error; 
  }
}

export async function deleteTasks(id: number) {
try {
  const res = await fetch(`${url}/todos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete task")
  }
} catch (error) {
  console.error("Error delete task", error)
  return error
}
}

export async function getTask(id: number): Promise<Todo> {
  try {
    const res = await fetch(`${url}/todos/${id}`, {
      method: "GET",
    });
    if (!res.ok) throw new Error("Failed to fetch task");
    return await res.json();
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
    const res = await fetch(`${url}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!res.ok) throw new Error("Failed to update task");
    return await res.json();
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
}
