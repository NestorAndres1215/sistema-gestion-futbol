import { useEffect, useState } from "react";
import { ArbitroQueryState } from "../types/arbitroQueryState";
import { getArbitros } from "../services/arbitro.service";
import { useRouter } from "next/navigation";
import { formatDate } from "@/shared/utils/date.utils";

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
            placeholder: "Categoría",
            options: [
                { value: "FIFA", label: "FIFA" },
                { value: "Nacional", label: "Nacional" },
                { value: "Regional", label: "Regional" },
            ],
        },
        {
            key: "pais",
            placeholder: "País",
            options: [
                { value: "Perú", label: "Perú" },
                { value: "Brasil", label: "Brasil" },
                { value: "Argentina", label: "Argentina" },
                { value: "Italia", label: "Italia" },
            ],
        },
        {
            key: "estado",
            placeholder: "Estado",
            options: [
                { value: "Activo", label: "Activo" },
                { value: "Retirado", label: "Retirado" },
            ],
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
            accessor: (row: any) => row.persona?.apellidoPaterno,
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