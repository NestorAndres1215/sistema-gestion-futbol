import { api } from "@/shared/services/api-client";

export const getSeleccionEstadios = async ({ page = 1, pageSize = 10, search = "", seleccion = "", }: {
    page?: number; pageSize?: number; search?: string; seleccion?: string;
}) => {
    const params = new URLSearchParams({
        page: page.toString(), pageSize: pageSize.toString(), search, seleccion,
    });

    const response = await api.get(`/seleccion-estadio?${params.toString()}`);
    return response;
};

export const getSeleccionEsatadiosById = async (id: number | string) => {
    const response = await api.get(`/seleccion-estadio/${id}`);
    return response;
};

export const getSeleccionEstadiosBySeleccion = async ({ page = 1, pageSize = 10, seleccion = "", }: {
    page?: number; pageSize?: number; seleccion?: string;
}) => {
    const params = new URLSearchParams({
        page: page.toString(), pageSize: pageSize.toString(), seleccion,
    });
    const response = await api.get(`/seleccion-estadio/seleccion?${params.toString()}`);
    return response;
};

export const getSeleccionEstadiosBySeleccionId = async (seleccionId: number | string) => {
    const response = await api.get(`/seleccion-estadio/seleccion/${seleccionId}`);
    return response;
};

export const addSeleccionEstadio = async (data: any) => {
    const response = await api.post("/seleccion-estadio", data);
    return response.data;
};

export const updateSeleccionEstadio = async (id: number | string, data: any) => {
    const response = await api.put(`/seleccion-estadio/${id}`, data);
    return response.data;
};

export const getSeleccionEstadioByEstadio = async (seleccion: string) => {

    const response = await api.get(`/seleccion-estadio/estadios?seleccion=${seleccion}`);

    return response;
};