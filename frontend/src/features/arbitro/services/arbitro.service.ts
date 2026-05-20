import { api } from "@/shared/services/api-client";

export const addArbitro = async (data: FormData) => {
  const response = await api.post("/arbitros", data);
  return response.data;
};

export const getArbitros = async ({
    page = 1, pageSize = 10,
    search = "", categoria = "",
    pais = "", estado = "",
  }: {
    page?: number; pageSize?: number;
    search?: string; categoria?: string;
    pais?: string; estado?: string;
  }) => {

  const params = new URLSearchParams({
    page: page.toString(), pageSize: pageSize.toString(),
    search, categoria, pais, estado,
  });

  const response = await api.get(`/arbitros?${params.toString()}`);
  return response;
};

export const getArbitroById = async (id: number | string) => {
  const response = await api.get(`/arbitros/${id}`);
  return response;
};

export const updateArbitro = async (id: number, data: FormData) => {
  const response = await api.put(`/arbitros/${id}`, data);
  return response.data;
};

export const getTotalArbitros = async () => {
  const res = await api.get("/arbitros/total-arbitros");
  return res;
};

export const getArbitrosActivos = async () => {
  const res = await api.get("/arbitros/arbitros-activos");
  return res;
};

export const getPrecisionPromedio = async () => {
  const res = await api.get("/arbitros/precision-promedio");
  return res;
};

export const getArbitrosPorPais = async () => {
  const res = await api.get("/arbitros/arbitros-por-pais");
  return res;
};

export const getArbitrosMasPartidos = async (cantidad = 5) => {
  const res = await api.get(
    `/arbitros/arbitros-mas-partidos?cantidad=${cantidad}`
  );
  return res;
};

export const getRolArbitral = async () => {
  const res = await api.get("/arbitros/rol-arbitral");
  return res;
};

export const getEstadoFisico = async () => {
  const res = await api.get("/arbitros/estado-fisico");
  return res;
};

export const getDebutsPorAnio = async () => {
  const res = await api.get("/arbitros/debuts-por-anio");
  return res;
};

export const getMejorNivel = async (cantidad = 5) => {
  const res = await api.get(`/arbitros/mejor-nivel?cantidad=${cantidad}`);
  return res;
};

export const getActivosVsRetirados = async () => {
  const res = await api.get("/arbitros/activos-vs-retirados");
  return res;
};

export const getEdadPromedio = async () => {
  const res = await api.get("/arbitros/edad-promedio");
  return res;
};

export const getPromedioTarjetas = async () => {
  const res = await api.get("/arbitros/promedio-tarjetas");
  return res;
};

export const getTopExperiencia = async (cantidad = 5) => {
  const res = await api.get(`/arbitros/top-experiencia?cantidad=${cantidad}`);
  return res;
};

export const getTopReputacion = async (cantidad = 5) => {
  const res = await api.get(`/arbitros/top-reputacion?cantidad=${cantidad}`);
  return res;
};