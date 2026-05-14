import { api } from "@/shared/services/api-client";

export const addArbitro = async (data: FormData) => {
  const response = await api.post("/arbitros", data);
  return response.data;
};

export const getArbitros = async ({
  page = 1,
  pageSize = 10,
  search = "",
  categoria = "",
  pais = "",
  estado = "",
}: {
  page?: number;
  pageSize?: number;
  search?: string;
  categoria?: string;
  pais?: string;
  estado?: string;
}) => {

  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    search,
    categoria,
    pais,
    estado,
  });

  const response = await api.get(`/arbitros?${params.toString()}`);
  return response;
};

export const getArbitroById = async (id: number | string) => {
  const response = await api.get(`/arbitros/${id}`);
  return response;
};

export const updateArbitro= async (id: number, data: FormData) => {
  const response = await api.put(`/arbitros/${id}`, data);
  return response.data;
};
