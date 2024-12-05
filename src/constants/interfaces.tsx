export interface TaskProps extends updateTaskListProps {
  todo: Todo;
}

export interface TaskListProps extends updateTaskListProps {
  todos: Todo[];
}

export interface TaskCounterProps {
  taskCounter: TodoInfo;
  setTaskCategory: (a: TaskStatus) => void;
  taskStatus: TaskStatus;
}

export interface TodoRequest {
  title?: string;
  isDone?: boolean;
}

export interface Todo {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
}

export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

export interface MetaProps {
  totalAmount: number;
}

export interface updateTaskListProps {
  updateTaskList: () => void;
}

export interface dataTasks {
  data: Todo[];
  info: TodoInfo;
  meta: MetaProps;
}

export type TaskStatus = "all" | "completed" | "inWork";
