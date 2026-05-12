import { api } from "../shared/services/api-client";

export const addEstadio = async (data: FormData) => {
  const response = await api.post("/estadios", data);
  return response.data;
};

export const getEstadios = async ({ page = 1, pageSize = 10, search = "", tipoCesped = "", pais = "", anio = 0, estado = "", }: {
  page?: number; pageSize?: number; search?: string; tipoCesped?: string; pais?: string; anio?: number; estado?: string;
}) => {
  const params = new URLSearchParams()

  params.append("page", page.toString());
  params.append("pageSize", pageSize.toString());

  if (search) params.append("search", search);
  if (tipoCesped) params.append("tipoCesped", tipoCesped);
  if (pais) params.append("pais", pais);
  if (anio && anio > 0) params.append("anio", anio.toString());
  if (estado) params.append("estado", estado);

  const response = await api.get(`/estadios?${params.toString()}`);

  return response;
};

export const getEstadioById = async (id: number | string) => {
  const response = await api.get(`/estadios/${id}`);
  return response;
};

export const getAniosEstadios = async () => {
  const response = await api.get(`/estadios/anio`);
  return response;
};
