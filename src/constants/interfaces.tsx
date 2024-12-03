export interface TaskProps {
  created?: string;
  id?: number;
  isDone: boolean;
  title: string;
  deleteTask?: (id: number) => void;
  updateTask?: (id: number, updatedData: TaskProps) => void;
}

export interface InfoProps {
  all: number;
  completed: number;
  inWork: number;
}

export interface MetaProps {
  totalAmount: number;
}

export interface CreateTaskProps {
  onAddTask: (newTask: TaskProps) => void;
}

export interface TaskCounterProps {
  taskListChanged: boolean;
  setTaskCategory: (a: TaskCategorys) => void;
}

export type TaskCategorys = "Все" | "В работе" | "Завершенные";
