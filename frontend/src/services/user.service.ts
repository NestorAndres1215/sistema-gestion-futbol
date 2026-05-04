import { api } from "./api.service";

export const getUsers = async ({
  page = 1,
  pageSize = 10,
  search = "",
}: {
  page?: number;
  pageSize?: number;
  search?: string;
}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    search,
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