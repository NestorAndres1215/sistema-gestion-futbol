import { api } from "@/shared/services/api-client";


export const getParametros = async ({
    page = 1, pageSize = 10, search = "", categoria = "", tipoDato = "", estado = "" }: {
        page?: number; pageSize?: number; search?: string; categoria?: string;
        tipoDato?: string; estado?: string;
    }) => {

    const params = new URLSearchParams({
        page: page.toString(), pageSize: pageSize.toString(), search, categoria,
        tipoDato, estado,
    });

    const response = await api.get(`/parametros?${params.toString()}`);
    return response;
};

export const getParametrosById = async (id: number | string) => {
    const response = await api.get(`/parametros/${id}`);
    return response;
};

export const addParametros = async (data: any) => {
    const response = await api.post("/parametros", data);
    return response.data;
};

export const updateParametros = async (id: number, data: any) => {
    const response = await api.put(`/parametros/${id}`, data);
    return response.data;
};
