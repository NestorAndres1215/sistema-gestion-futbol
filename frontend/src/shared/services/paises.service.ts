import { api } from "./api-client";

export const getPaises = async () => {
  const response = await api.get("/paises");
  return response; 
};
