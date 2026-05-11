import { api } from "./api.service";

export const addEntrenador = async (data: FormData) => {
  const response = await api.post("/entrenadores", data);
  return response.data;
};
