import { TaskProps, InfoProps, MetaProps } from "../constants/interfaces";

const url = "https://easydev.club/api/v1";

interface dataTasks {
  data: [TaskProps];
  info: InfoProps;
  meta: MetaProps;
}

export async function getTasks(): Promise<dataTasks> {
  const res = await fetch(`${url}/todos`, {
    method: "GET",
  });
  const data = res.json();
  return data;
}

export async function createTasks(task: TaskProps): Promise<TaskProps> {
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

export async function getTask(id: number): Promise<TaskProps> {
  const res = await fetch(`${url}/todos/${id}`, {
    method: "GET",
  });
  const data = res.json();
  return data;
}

export async function updateTask(
  id: number,
  updatedData: TaskProps
): Promise<TaskProps> {
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
