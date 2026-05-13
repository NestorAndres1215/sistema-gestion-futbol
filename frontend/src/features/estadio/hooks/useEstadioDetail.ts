import { useParams } from "next/navigation";
import { getEstadioById } from "../services/estadio.service";
import { useEffect, useState } from "react";

export default function useEstadioDetail() {

    const params = useParams();

    const [estadio, setEstadio] = useState<any>(null);

    useEffect(() => {

        const fetchEstadio = async () => {
            const res = await getEstadioById(Number(params.id));
            setEstadio(res);
        };

        if (params.id) {
            fetchEstadio();
        }

    }, [params.id]);

    const items = estadio
        ? [
            { label: "País", value: estadio.pais, },
            { label: "Ciudad", value: estadio.ciudad, },
            { label: "Capacidad", value: estadio.capacidad, },
            { label: "Tipo Césped", value: estadio.tipoCesped, },
            {
                label: "Fecha de Apertura", value: estadio.fechaApertura
                    ? new Date(estadio.fechaApertura).toLocaleDateString()
                    : "Sin registro",
            },
            {
                label: "Edad", value: estadio.anio
                    ? `${new Date().getFullYear() - estadio.anio} años`
                    : "Sin registro",
            },
            { label: "Latitud", value: `${estadio.latitud}°`, },
            { label: "Longitud", value: `${estadio.longitud}°`, },
        ]
        : [];

    const { id } = useParams();



    useEffect(() => {

        const fetchEstadio = async () => {
            const res = await getEstadioById(Number(id));
            setEstadio(res);
        };

        if (id) {
            fetchEstadio();
        }

    }, [id]);




    return {
        estadio,
        items,
    }
}