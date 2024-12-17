export interface TaskProps extends updateTaskListProps {
  todo: Todo;
}

export interface TaskListProps extends updateTaskListProps {
  todos: Todo[];
}

export interface TaskCounterProps {
  taskCounter: TodoInfo;
  setTaskCategory: (a: TaskStatus) => void;
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

export interface UserRegistration { 
  login: string; 
  username: string; 
  password: string; 
  email: string; 
  phoneNumber?: string; 
}

export interface AuthData { 
  login: string; 
  password: string; 
}

export interface RefreshToken { 
  refreshToken: string | null; 
}

export interface Profile { 
  id: number; 
  username: string; 
  email: string; 
  date: string; 
  isBlocked: boolean; 
  isAdmin: boolean; 
  phoneNumber: string; 
}

export interface ProfileRequest { 
  username: string; 
  email: string; 
  phoneNumber: string; 
}

export interface PasswordRequest { 
  password: string; 
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}
