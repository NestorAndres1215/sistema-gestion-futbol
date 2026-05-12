import { api } from "@/shared/services/api-client";

export const getUsers = async ({ page = 1, pageSize = 10, search = "", estado = "", rol = "", }: {
  page?: number; pageSize?: number; search?: string; estado?: string; rol?: string;
}) => {
  const params = new URLSearchParams({
    page: page.toString(), pageSize: pageSize.toString(), search, estado, rol,
  });

  const response = await api.get(`/usuarios?${params.toString()}`);
  return response;
};

export const getUserById = async (id: number | string) => {
  const response = await api.get(`/usuarios/${id}`);
  return response;
};

export const updateUser = async (id: number, data: any) => {
  const response = await api.put(`/usuarios/${id}`, data);
  return response.data;
};

export const updateUserState = async (id: number) => {
  const response = await api.put(`/usuarios/estado/${id}`, {});
  return response.data;
};