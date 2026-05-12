import { DetailField } from "./estadioDetail.types";

export const buildEstadioFields = (estadio: any): DetailField[] => {
    return [
        {
            label: "País",
            value: estadio.pais,
        },
        {
            label: "Ciudad",
            value: estadio.ciudad,
        },
        {
            label: "Capacidad",
            value: estadio.capacidad,
        },
        {
            label: "Tipo Césped",
            value: estadio.tipoCesped,
        },
        {
            label: "Fecha de Apertura",
            value: estadio.fechaApertura
                ? new Date(estadio.fechaApertura).toLocaleDateString()
                : "Sin registro",
        },
        {
            label: "Edad",
            value: estadio.anio
                ? `${new Date().getFullYear() - estadio.anio} años`
                : "Sin registro",
        },
        {
            label: "Latitud",
            value: `${estadio.latitud}°`,
        },
        {
            label: "Longitud",
            value: `${estadio.longitud}°`,
        },
    ];
};