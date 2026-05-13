import { useEffect, useState } from "react";
import { getAniosEstadios, getEstadios } from "../services/estadio.service";

import { useRouter } from "next/navigation";
import { EstadioQueryState } from "../types/estadioQueryState.types";
import { stadiumColumns } from "../constants/estadioColumns";

export default function useEstadio() {

    const router = useRouter();
    const [data, setData] = useState<any[]>([]);
    const [anios, setAnios] = useState<number[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 15;

    const [query, setQuery] = useState<EstadioQueryState>({
        search: "",
        tipoCesped: "",
        pais: "",
        anio: "",
        estado: "",
    });

    const fetchEstadios = async (q: EstadioQueryState, currentPage: number) => {
        try {
            const res = await getEstadios({
                page: currentPage,
                pageSize,
                search: q.search,
                tipoCesped: q.tipoCesped,
                pais: q.pais,
                anio: q.anio ? Number(q.anio) : 0,
                estado: q.estado,
            });

            const lista = res?.items ?? res?.data ?? res;

            setData(Array.isArray(lista) ? lista : []);

            setTotalPages(res?.totalPages ?? 1);

        } catch (error) {
            setData([]);
            setTotalPages(1);
        }
    };

    const fetchAnios = async () => {
        try {
            const res = await getAniosEstadios();
            const lista = res?.data ?? res;

            setAnios(Array.isArray(lista) ? lista : []);
        } catch (error) {
            setAnios([]);
        }
    };

    useEffect(() => {
        fetchAnios();
    }, []);

    useEffect(() => {
        fetchEstadios(query, page);
    }, [query, page]);

    const handleSearch = (value: string) => {
        setQuery((prev) => ({
            ...prev,
            search: value,
        }));

        setPage(1);
    };

    const estadioFilters = [
        {
            key: "estado",
            placeholder: "Estado",
            options: [
                { label: "Disponible", value: "Disponible" },
                { label: "Mantenimiento", value: "Mantenimiento" },
                { label: "Suspendido", value: "Suspendido" },
                { label: "Cerrado", value: "Cerrado" },
            ],
        },
        {
            key: "pais",
            placeholder: "País",
            options: [
                { label: "Perú", value: "Perú" },
                { label: "Brasil", value: "Brasil" },
                { label: "Argentina", value: "Argentina" },
            ],
        },
        {
            key: "anio",
            placeholder: "Año",
            options: anios.map((a) => ({
                label: a.toString(),
                value: a.toString(),
            })),
        },
        {
            key: "tipoCesped",
            placeholder: "Tipo de césped",
            options: [
                { label: "Natural", value: "Natural" },
                { label: "Sintético", value: "Sintetico" },
                { label: "Híbrido", value: "Hibrido" },
            ],
        },
    ];

    const handleFilter = (filters: Record<string, any>) => {
        setQuery((prev) => ({
            ...prev,
            ...filters,
        }));

        setPage(1);
    };

    const estadioActions = {
        onView: (e: any) =>
            router.push(`/admin/estadios/edicion/${e.id}`),

        onEdit: (e: any) =>
            router.push(`/admin/estadios/edicion/${e.id}/editar`),

    };

    return {
        estadioActions, stadiumColumns, data, query, handleSearch,
        estadioFilters, handleFilter, page, totalPages, setPage
    }
}