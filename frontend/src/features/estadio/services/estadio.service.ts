import { api } from "@/shared/services/api-client";


export const addEstadio = async (data: FormData) => {
  const response = await api.post("/estadios", data);
  return response.data;
};


export const updateEstadio = async (id: number, data: FormData) => {
  const response = await api.put(`/estadios/${id}`, data);
  return response.data;
};

export const getEstadios = async ({ page = 1, pageSize = 10, search = "", tipoCesped = "", pais = "", anio = 0, estado = "", }: {
  page?: number; pageSize?: number; search?: string; tipoCesped?: string; pais?: string; anio?: number; estado?: string;
}) => {
  const params = new URLSearchParams()

  params.append("page", page.toString());
  params.append("pageSize", pageSize.toString());

  if (search) params.append("search", search);
  if (tipoCesped) params.append("tipoCesped", tipoCesped);
  if (pais) params.append("pais", pais);
  if (anio && anio > 0) params.append("anio", anio.toString());
  if (estado) params.append("estado", estado);

  const response = await api.get(`/estadios?${params.toString()}`);

  return response;
};

export const getEstadioById = async (id: number | string) => {
  const response = await api.get(`/estadios/${id}`);
  return response;
};

export const getAniosEstadios = async () => {
  const response = await api.get(`/estadios/anio`);
  return response;
};

export const getTotalEstadios = async () => {
  const response = await api.get(`/estadios/total-registro`);
  return response;
};

export const getPromedioCapacidad = async () => {
  const response = await api.get(`/estadios/promedio-capacidad`);
  return response;
};

export const getTotalPaises = async () => {
  const response = await api.get(`/estadios/total-paises`);
  return response;
};

export const getPaisesMasEstadios = async (cantidad?: number) => {
  const response = await api.get(`/estadios/paises-mas-estadios`, {
    params: { cantidad },
  });

  return response;
};

export const getPaisesMenosEstadios = async (cantidad?: number) => {
  const response = await api.get(`/estadios/paises-menos-estadios`, {
    params: { cantidad },
  });

  return response;
};

export const getCiudadesMasEstadios = async (cantidad?: number) => {
  const response = await api.get(`/estadios/ciudades-mas-estadios`, {
    params: { cantidad },
  });

  return response;
};

export const getCiudadesMenosEstadios = async (cantidad?: number) => {
  const response = await api.get(`/estadios/ciudades-menos-estadios`, {
    params: { cantidad },
  });

  return response;
};

export const getMayorCapacidad = async (cantidad?: number) => {
  const response = await api.get(`/estadios/mayor-capacidad`, {
    params: { cantidad },
  });

  return response;
};

export const getMenorCapacidad = async (cantidad?: number) => {
  const response = await api.get(`/estadios/menor-capacidad`, {
    params: { cantidad },
  });

  return response;
};

export const getEstadiosMasAntiguos = async (cantidad?: number) => {
  const response = await api.get(`/estadios/estadios-mas-antiguos`, {
    params: { cantidad },
  });

  return response;
};

export const getEstadiosMasNuevos = async (cantidad?: number) => {
  const response = await api.get(`/estadios/estadios-mas-nuevos`, {
    params: { cantidad },
  });

  return response;
};

export const getDistribucionEstado = async () => {
  const response = await api.get(
    `/estadios/distribucion-estado`
  );

  return response;
};

export const getTiposCesped = async () => {
  const response = await api.get(
    `/estadios/tipos-cesped`
  );

  return response;
};