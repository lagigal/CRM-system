import {
  TaskStatus,
  Todo,
  TodoRequest,
  dataTasks,
} from "../constants/interfaces";

const url = "https://easydev.club/api/v1";

export async function getTasks(status: TaskStatus): Promise<dataTasks> {
  const res = await fetch(`${url}/todos?filter=${status}`, {
    method: "GET",
  });
  const data = res.json();
  return data;
}

export async function createTasks(task: TodoRequest): Promise<Todo> {
  const res = await fetch(`${url}/todos`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const data = res.json();
  return data;
}

export async function deleteTasks(id: number) {
  await fetch(`${url}/todos/${id}`, {
    method: "DELETE",
  });
}

export async function getTask(id: number): Promise<Todo> {
  const res = await fetch(`${url}/todos/${id}`, {
    method: "GET",
  });
  const data = res.json();
  return data;
}

export async function updateTask(
  id: number,
  updatedData: TodoRequest
): Promise<Todo> {
  const res = await fetch(`${url}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  const data = res.json();
  return data;
}
