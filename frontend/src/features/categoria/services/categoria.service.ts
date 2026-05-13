import { api } from "@/shared/services/api-client";


export const getCategories = async () => {
  const response = await api.get("/categorias");
  return response; 
};

export const getCategoryById = async (id: number | string) => {
  const response = await api.get(`/categorias/${id}`);
  return response.data;
};

export const addCategory = async (data: any) => {
  const response = await api.post(`/categorias`, data);
  return response.data;
};