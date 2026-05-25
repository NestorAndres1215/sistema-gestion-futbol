import { api } from "@/shared/services/api-client";

export const getSelecciones = async ({ page = 1, pageSize = 10, search = "", confederacion = "", estado = "", }: {
    page?: number; pageSize?: number; search?: string; confederacion?: string; estado?: string;
}) => {
    const params = new URLSearchParams({
        page: page.toString(), pageSize: pageSize.toString(), search, confederacion, estado,
    });

    const response = await api.get(`/selecciones?${params.toString()}`);
    return response;
};

export const addSelecciones = async (data: FormData) => {
    const response = await api.post("/selecciones", data);
    return response.data;
};

export const updateSelecciones = async (id: number, data: FormData) => {
    const response = await api.put(`/selecciones/${id}`, data);
    return response.data;
};

export const getSeleccionById = async (id: number | string) => {
    const response = await api.get(`/selecciones/${id}`);
    return response;
};

export const getSeleccionByNombre = async (nombre: string) => {
    const response = await api.get(`/selecciones/nombre/${nombre}`);
    return response;
};

export const getSeleccionByClave = async (clave: string) => {
    const response = await api.get(`/selecciones/clave/${clave}`);
    return response;
};

export const getSeleccionByConfederacion = async (confederacion: string) => {
    const response = await api.get(`/selecciones/confederacion/${confederacion}`);
    return response;
};