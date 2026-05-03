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

  console.log(response)
  return response;
};