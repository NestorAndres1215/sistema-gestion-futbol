import { CONFEDERACION_OPTIONS } from "@/shared/constants/confederacion.options";
import { useEffect, useState } from "react";
import { getSelecciones } from "../services/selecciones.service";

type SeleccionQueryState = {
    search: string;
    confederacion: string;
    estado: string;
};
export default function useSelecciones() {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 15;
    const [data, setData] = useState<any[]>([]);
    const [query, setQuery] = useState<SeleccionQueryState>({
        search: "",
        confederacion: "",
        estado: "",
    });
    const confederacionFilters = [
        {
            key: "confederacion",
            placeholder: "Selecciona Confederación",
            options: CONFEDERACION_OPTIONS,
        },
    ];

    const handleSearch = (value: string) => {
        setQuery((prev) => ({ ...prev, search: value, }));
        setPage(1);
    };

    const handleFilter = (filters: Record<string, any>) => {
        setQuery((prev) => ({ ...prev, ...filters, }));
        setPage(1);
    };

    const fetchSelecciones = async (q: SeleccionQueryState, currentPage: number) => {
        try {

            const res = await getSelecciones({
                page: currentPage,
                pageSize,
                search: q.search,
                confederacion: q.confederacion,
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

    useEffect(() => { fetchSelecciones(query, page); }, [query, page]);
    return {
        data,
        handleSearch, query, page, totalPages, setPage, confederacionFilters, handleFilter
    }
}