import { api } from "../../../shared/services/api-client";

export const addEntrenador = async (data: FormData) => {
  const response = await api.post("/entrenadores", data);
  return response.data;
};

export const getEntrenadores = async ({
  page = 1,
  pageSize = 10,
  search = "",
  estiloJuego = "",
  pais = "",
  estado = "",
}: {
  page?: number;
  pageSize?: number;
  search?: string;
  estiloJuego?: string;
  pais?: string;
  estado?: string;
}) => {

  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    search,
    estiloJuego,
    pais,
    estado,
  });

  const response = await api.get(`/entrenadores?${params.toString()}`);
  return response;
};

export const getEntrenadorById = async (id: number | string) => {
  const response = await api.get(`/entrenadores/${id}`);
  return response;
};
