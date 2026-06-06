import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSeleccionByNombre } from "../services/selecciones.service";
import { getSeleccionEstadiosBySeleccion } from "@/features/selecciones-estadio/services/seleccionEstadio.service";
import { getSeleccionEntrenadorBySeleccion } from "@/features/selecciones-estadio/services/seleccionEntrenador.service";
import { formatDate } from "@/shared/utils/date.utils";


export default function useSeleccionesDetail(seleccionPais: string) {

    const params = useParams();

    const [seleccion, setSeleccion] = useState<any>(null);
    const [estadio, setEstadio] = useState<any[]>([]);
    const [entrenador, setEntrenador] = useState<any[]>([]);
    const [pageEstadio, setPageEstadio] = useState(1);
    const [pageSizeEstadio] = useState(5);
    const [totalPagesEstadio, setTotalPagesEstadio] = useState(1);

    const [pageEntrenador, setPageEntrenador] = useState(1);
    const [pageSizeEntrenador] = useState(5);
    const [totalPagesEntrenador, setTotalPagesEntrenador] = useState(1);
    useEffect(() => {

        const fetchSeleccion = async () => {
            const res = await getSeleccionByNombre(seleccionPais);
            setSeleccion(res);
        };

        if (params.id) {
            fetchSeleccion();
        }

    }, [params.id, seleccionPais]);

    useEffect(() => {

        const fetchEstadio = async () => {

            const response = await getSeleccionEstadiosBySeleccion({
                page: pageEstadio,
                pageSize: pageSizeEstadio,
                seleccion: seleccionPais
            });

            setEstadio(response.items);
            setTotalPagesEstadio(response.totalPages);
        };

        if (params.id) {
            fetchEstadio();
        }

    }, [params.id, pageEstadio, seleccionPais]);

    useEffect(() => {

        const fetchEntrenador = async () => {
console.log("fetch entrenador", seleccionPais)
            const response = await getSeleccionEntrenadorBySeleccion({
                page: pageEntrenador,
                pageSize: pageSizeEntrenador,
                seleccion: seleccionPais
            });
console.log(response)
            setEntrenador(response.items);
            setTotalPagesEntrenador(response.totalPages);
        };

        if (params.id) {
            fetchEntrenador();
        }

    }, [params.id, pageEntrenador, seleccionPais]);

    const estadioColumns = [
        { header: "ID", accessor: (row: any) => row.id, },
        { header: "Estadio", accessor: (row: any) => row.estadio, },
        { header: "Ciudad", accessor: (row: any) => row.ciudad, },
        { header: "Capacidad", accessor: (row: any) => row.capacidad.toLocaleString() },
    ];

        const entrenadorColumns = [
        { header: "ID", accessor: (row: any) => row.id, },
        { header: "Entrenador", accessor: (row: any) => row.entrenadorNombre + " " + row.entrenadorApellido, },
        { header: "Fecha de Inicio", accessor: (row: any) => formatDate(row.fechaInicio), },
        { header: "Fecha de Fin", accessor: (row: any) => formatDate(row.fechaFin), },
    ];

    const items = seleccion
        ? [
            { label: "Clave", value: seleccion.clave, },
            { label: "Confederacion", value: seleccion.confederacion, },
            { label: "Codigo FIFA", value: seleccion.codigoFIFA, },
            { label: "Seudonimo", value: seleccion.seudonimo, },
            { label: "Estadio", value: "Estadio Nacional" },
            { label: "Entrenador Actual", value: "Jose Perez" },
            { label: "Capitan Actual", value: "Jose Perez" }
        ]
        : [];



    return {
        items, seleccion, estadioColumns, estadio, pageEstadio,
        pageSizeEstadio, totalPagesEstadio, setPageEstadio,
        entrenadorColumns, entrenador, pageEntrenador,
        pageSizeEntrenador, totalPagesEntrenador, setPageEntrenador
    }

}