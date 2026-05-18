
import { EntrenadorQueryState } from "../types/entrenadorQueryState.types";
import { getEntrenadores } from "../services/entrenador.service";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/shared/utils/date.utils";
import { getPaises } from "@/shared/services/paises.service";
import { ESTILO_JUEGO_OPTIONS } from "@/shared/constants/estilo-juego.options";
import { ESTADO_SISTEMA_OPTIONS } from "@/shared/constants/estado-estadio.options";


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

        loadPaises();

    }, []);

    const entrenadorFilters = [
        {
            key: "estiloJuego",
            placeholder: "Selecciona Estilo de Juego",
            options: ESTILO_JUEGO_OPTIONS,
        },
        {
            key: "pais",
            placeholder: "Selecciona Pais",
            options: paises.map((p: any) => ({
                value: p.nombre,
                label: p.nombre,
            })),
        },
        {
            key: "estado",
            placeholder: "Selecciona Estado",
            options: ESTADO_SISTEMA_OPTIONS,
        },
    ];


    const entrenadorActions = {

        onView: (u: any) =>
            router.push(`/admin/entrenadores/edicion/${u.id}`),

        onEdit: (u: any) =>
            router.push(`/admin/entrenadores/edicion/${u.id}/editar`),

    };

    const entrenadorColumns = [
        {
            header: "ID",
            accessor: (row: any) => row.id,
        },
        {
            header: "Nombre",
            accessor: (row: any) => row.persona?.nombre,
        },
        {
            header: "Apellido",
            accessor: (row: any) => row.persona?.apellido,
        },
        {
            header: "Estilo de Juego",
            accessor: (row: any) => row.estiloJuego,
        },
        {
            header: "País",
            accessor: (row: any) => row.persona?.paisNacimiento?.nombre,
        },
        {
            header: "Fecha de Debut",
            accessor: (row: any) => formatDate(row.fechaDebut),
        },
        {
            header: "Estado",
            accessor: (row: any) => row.estado,
        },
    ];

    return {
        query,
        data,
        page,
        totalPages,
        handleSearch,
        handleFilter,
        setPage,
        entrenadorFilters,
        entrenadorActions,
        entrenadorColumns,
    }
}