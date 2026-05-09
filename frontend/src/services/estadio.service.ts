import { api } from "./api.service";

export const addEstadio = async (data: FormData) => {

  console.log("IS FORMDATA?", data instanceof FormData);

  for (const pair of data.entries()) {
    console.log("ENTRY:", pair[0], pair[1]);
  }

  const response = await api.post("/estadios", data);

  return response.data;
};