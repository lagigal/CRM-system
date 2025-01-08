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

// Интерфейс запроса для фильтрации и сортировки пользователей
export interface UserFilters {
  search?: string; //поиск по имени
  sortBy?: string; //сортировка по одному из полей User кроме булевых значений
  sortOrder?: "ASC" | "DESC"; //в порядке возрастания\убывания соответсвенно (по sortBy фильтру)
  isBlocked?: boolean;
  limit?: number; // сколько на странице
  offset?: number; // страницу
}

// Интерфейс пользователя
export interface User {
  id: number;
  username: string;
  email: string;
  date: string; // ISO date string
  isBlocked: boolean | undefined;
  isAdmin: boolean;
  //  roles: Roles[];
  phoneNumber: string;
}

export type UserKeys = keyof User;

// Интерфейс метаинформации
export interface MetaResponse<T> {
  data: T[];
  meta: {
    totalAmount: number;
    sortBy: string;
    sortOrder: "ASC" | "DESC";
  };
}
// Интерфейс для обновления прав пользователя
export interface UserRolesRequest {
  roles: Roles[]; // при вызове этой апи роли будут обновлены к тому массиву который будет передан
  // например если у вас была roles: \['ADMIN'\] а вы хотите добавить \['MODERATOR'\] то нужно передавать
  // старые + новые - roles: \['ADMIN', 'MODERATOR'\]
}

// Интерфейс для обновления данных пользователя
export interface UserRequest {
  username?: string;
  email?: string;
  phoneNumber?: string;
}

export enum Roles {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  USER = "USER",
}
