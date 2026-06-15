
import { EntrenadorQueryState } from "../types/entrenadorQueryState.types";
import { getEntrenadores } from "../services/entrenador.service";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/shared/utils/date.utils";
import { getPaises } from "@/shared/services/paises.service";

import { ESTADO_SISTEMA_OPTIONS } from "@/shared/constants/estado.options";
import { getEstiloJuego } from "@/shared/services/catalogs.service";


export default function useEntrenador() {

    const router = useRouter();
    const [query, setQuery] = useState<EntrenadorQueryState>({
        search: "",
        estiloJuego: "",
        pais: "",
        estado: "",
    });

    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [paises, setPaises] = useState<any[]>([]);
    const [estiloJuego, setEstiloJuego] = useState<any[]>([]);
    const pageSize = 15;

    const fetchData = async (q: EntrenadorQueryState, currentPage: number) => {
        try {
            const res = await getEntrenadores({
                ...q,
                page: currentPage,
                pageSize,
            });

            const lista = res?.items ?? res?.data ?? [];
            setData(Array.isArray(lista) ? lista : []);
            setTotalPages(res?.totalPages ?? 1);

        } catch (error) {
            setData([]);
            setTotalPages(1);
        }
    };

    useEffect(() => {
        fetchData(query, page);
    }, [query, page]);

    const handleSearch = (value: string) => {
        setQuery((prev) => ({ ...prev, search: value, }));
        setPage(1);
    };

    const handleFilter = (filters: Partial<EntrenadorQueryState>) => {
        setQuery((prev) => ({ ...prev, ...filters, }));
        setPage(1);
    };

    useEffect(() => {

        const loadPaises = async () => {

            try {
                const data = await getPaises();
                setPaises(Array.isArray(data) ? data : []);

            } catch (error) {
                setPaises([]);
            }
        };
        const loadEstiloJuego = async () => {

            try {
                const data = await getEstiloJuego();
                setEstiloJuego(Array.isArray(data) ? data : []);

            } catch (error) {
                setEstiloJuego([]);
            }
        };


        loadPaises();
loadEstiloJuego();
    }, []);

    const entrenadorFilters = [
        {
            key: "estiloJuego",
            placeholder: "Selecciona Estilo de Juego",
            options: estiloJuego.map((p: any) => ({ value: p.value, label: p.label, })),
        },
        {
            key: "pais",
            placeholder: "Selecciona Pais",
            options: paises.map((p: any) => ({ value: p.nombre, label: p.nombre, })),
        },
        {
            key: "estado",
            placeholder: "Selecciona Estado",
            options: ESTADO_SISTEMA_OPTIONS,
        },
    ];


    const entrenadorActions = {

        onEdit: (u: any) =>
            router.push(`/admin/entrenadores/edicion/${u.id}/editar`),

    };

    const entrenadorColumns = [
        { header: "ID", accessor: (row: any) => row.id, },
        { header: "Nombre", accessor: (row: any) => row.nombre, },
        { header: "Apellido", accessor: (row: any) => row.apellido, },
        { header: "Estilo de Juego", accessor: (row: any) => row.estiloJuego, },
        { header: "País", accessor: (row: any) => row.paisNacimiento, },
        { header: "Fecha de Debut", accessor: (row: any) => formatDate(row.fechaDebut), },
    ];

    return {
        query, data, page, totalPages,
        handleSearch, handleFilter, setPage,
        entrenadorFilters, entrenadorActions, entrenadorColumns,
    }
}