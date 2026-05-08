import { api } from "./api.service";

export const addTorneo = async (data: any) => {
    console.log(data)
  const response = await api.post(`/torneos`, data);
  return response.data;
};