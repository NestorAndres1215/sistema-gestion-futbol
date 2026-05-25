import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSeleccionById } from "../services/selecciones.service";


export default function useSeleccionesDetail() {

    const params = useParams();

    const [seleccion, setSeleccion] = useState<any>(null);

    useEffect(() => {

        const fetchSeleccion = async () => {
            const res = await getSeleccionById(Number(params.id));
            console.log(res)
            setSeleccion(res);
        };

        if (params.id) {
            fetchSeleccion();
        }

    }, [params.id]);

    const items = seleccion
        ? [
            {
                label: "Clave",
                value: seleccion.clave,
            },
            {
                label: "Confederacion",
                value: seleccion.confederacion,
            },
            {
                label: "Codigo FIFA",
                value: seleccion.codigoFIFA,
            },
            {
                label: "Seudonimo",
                value: seleccion.seudonimo,
            },
        ]
        : [];

    return { items, seleccion }

}