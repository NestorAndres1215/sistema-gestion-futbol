import { api } from "./api.service";

export const getUsers = async () => {
  return await api.get("/users");
};