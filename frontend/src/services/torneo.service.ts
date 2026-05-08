import { api } from "./api.service";

export const getTorneos= async ({ page = 1, pageSize = 10, search = "", tipo = "", tipoParticipante = "", estado = "", }: {
  page?: number; pageSize?: number; search?: string; tipo?: string; tipoParticipante?: string; estado?: string;
}) => {
  const params = new URLSearchParams({
    page: page.toString(), pageSize: pageSize.toString(), search, tipo, tipoParticipante, estado,
  });

  const response = await api.get(`/torneos?${params.toString()}`);
  return response;
};



export const addTorneo = async (data: any) => {
  console.log(data)
  const response = await api.post(`/torneos`, data);
  return response.data;
};