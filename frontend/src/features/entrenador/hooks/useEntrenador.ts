import { useEffect, useState } from "react";
import { EntrenadorQueryState } from "../types/entrenadorQueryState.types";
import { getEntrenadores } from "../services/entrenador.service";

export default function useEntrenador() {
    const [query, setQuery] = useState<EntrenadorQueryState>({
        search: "",
        estiloJuego: "",
        pais: "",
        estado: "",
    });

    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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
        setQuery((prev) => ({
            ...prev,
            search: value,
        }));

        setPage(1);
    };

    const handleFilter = (filters: Partial<EntrenadorQueryState>) => {
        setQuery((prev) => ({
            ...prev,
            ...filters,
        }));

        setPage(1);
    };

    const userFilters = [
        {
            key: "estiloJuego",
            placeholder: "Estilo de Juego|",
            options: [
                { value: "Ofensivo", label: "Ofensivo" },
                { value: "Defensivo", label: "Defensivo" },
                { value: "Posesión", label: "Posesión" },
                { value: "Contraataque", label: "Contraataque" },
                { value: "Presión Alta", label: "Presión Alta" },
                { value: "Equilibrado", label: "Equilibrado" },
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
                { value: "España", label: "España" },
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

    return{
        query,
        data,
        page,
        totalPages,
        handleSearch,
        handleFilter,
        setPage,
        userFilters,
    }
}