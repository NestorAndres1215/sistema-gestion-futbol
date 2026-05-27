import { api } from "./api-client";

export const getCiudadesByPais = async (nombrePais: string) => {
  const response = await api.get(`/ciudades/pais/${encodeURIComponent(nombrePais)}`);
  return response;
};