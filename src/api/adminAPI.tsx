import { MetaResponse, User, UserFilters, UserRequest } from "../constants/interfaces";
import { axiosInstance } from "./baseAPI";

export async function getUsers(
  filters: UserFilters
): Promise<MetaResponse<User>> {
  const response = await axiosInstance.get(`/admin/users`, {
    params: filters,
  });
  return response.data;
}

export async function getUserById(id: number): Promise<User> {
  const response = await axiosInstance.get(`/admin/users/${id}`);
  return response.data;
}

export async function deleteUser(id: number): Promise<void> {
  await axiosInstance.delete(`/admin/users/${id}`);
}

export async function blockUser(id: number): Promise<void> {
  await axiosInstance.post(`/admin/users/${id}/block`);
}

export async function unblockUser(id: number): Promise<void> {
  await axiosInstance.post(`/admin/users/${id}/unblock`);
}

export async function updateUserRights(
  id: number,
  value: boolean
): Promise<void> {
  await axiosInstance.post(`/admin/users/${id}/rights`, {
    field: "isAdmin",
    value: value,
  });
}

export async function updateUserData(
  id: number,
  value: UserRequest
): Promise<void> {
  await axiosInstance.put(`/admin/users/${id}`, value);
}
