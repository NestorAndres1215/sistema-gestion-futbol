import { useEffect, useState } from "react";
import { ArbitroQueryState } from "../types/arbitroQueryState";
import { getArbitros } from "../services/arbitro.service";
import { useRouter } from "next/navigation";
import { formatDate } from "@/shared/utils/date.utils";
import { getPaises } from "@/shared/services/paises.service";
import { CATEGORIA_ARBITRO_OPTIONS } from "@/shared/constants/categoria.options";
import { ESTADO_GENERICO_OPTIONS } from "@/shared/constants/estado-estadio.options";

export default function useArbitro() {
    const router = useRouter();
    const [query, setQuery] = useState<ArbitroQueryState>({
        search: "",
        categoria: "",
        pais: "",
        estado: "",
    });

    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [paises, setPaises] = useState<any[]>([]);
    const pageSize = 20;

    const fetchData = async (q: ArbitroQueryState, currentPage: number) => {
        try {
            const res = await getArbitros({
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

    useEffect(() => {

        const loadPaises = async () => {

            try {
                const data = await getPaises();

                setPaises(
                    Array.isArray(data) ? data : []
                );

            } catch (error) {

                console.error(error);

                setPaises([]);

            }

        };

        loadPaises();

    }, []);

    const handleSearch = (value: string) => {
        setQuery((prev) => ({
            ...prev,
            search: value,
        }));

        setPage(1);
    };

    const handleFilter = (filters: Partial<ArbitroQueryState>) => {
        setQuery((prev) => ({
            ...prev,
            ...filters,
        }));

        setPage(1);
    };

    const arbitroFilters = [
        {
            key: "categoria",
            placeholder: "Selecciona Categoria",
            options: CATEGORIA_ARBITRO_OPTIONS,
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
            placeholder: "Selecciona  Estadio",
            options: ESTADO_GENERICO_OPTIONS
        },
    ];

    const arbitroActions = {

        onView: (u: any) =>
            router.push(`/admin/arbitros/edicion/${u.id}`),

        onEdit: (u: any) =>
            router.push(`/admin/arbitros/edicion/${u.id}/editar`),

    };

    const arbitroColumns = [
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
            header: "Categoria",
            accessor: (row: any) => row.categoria,
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
        arbitroColumns,
        arbitroActions,
        query,
        data,
        page,
        totalPages,
        handleSearch,
        handleFilter,
        setPage,
        arbitroFilters
    }
}