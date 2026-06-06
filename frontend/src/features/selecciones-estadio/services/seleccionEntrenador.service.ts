import { api } from "@/shared/services/api-client";

export const addSeleccionEntrenador = async (data: any) => {
    const response = await api.post("/entrenador-seleccion", data);
    return response.data;
};

export const updateSeleccionEntrenador = async (
    id: number,
    data: any
) => {
    const response = await api.put(
        `/entrenador-seleccion/${id}`,
        data
    );
    return response.data;
};


export const getSeleccionEntrenadorById = async (id: number) => {
    const response = await api.get(
        `/entrenador-seleccion/${id}`
    );
    return response.data;
};



export const getSeleccionEntrenadorBySeleccion = async ({
    page = 1, pageSize = 10, seleccion = "",
}: {
    page?: number; pageSize?: number;
    seleccion?: string;
}) => {

    const params = new URLSearchParams({
        page: page.toString(), pageSize: pageSize.toString(),
        seleccion,
    });

    const response = await api.get(`/entrenador-seleccion?${params.toString()}`);
    return response;
};

export const getEntrenadores = async () => {
    const response = await api.get("/entrenador-seleccion/entrenadores");
    return response;
};

export const getSeleccionesByNombre = async (nombre: string) => {
    const response = await api.get("/entrenador-seleccion/selecciones", { params: { nombre, }, });
    return response.data;
};

export const updateDespido = async (id: number | string) => {
    const response = await api.put(`/seleccion-estadio/despedir/${id}`, {});
    return response.data;
};