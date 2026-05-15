import { useEffect, useState } from "react";
import { getAniosEstadios, getEstadios } from "../services/estadio.service";
import { useRouter } from "next/navigation";
import { EstadioQueryState } from "../types/estadioQueryState.types";
import { stadiumColumns } from "../constants/estadioColumns";
import { getPaises } from "@/shared/services/paises.service";
import { ESTADO_ESTADIO_OPTIONS } from "@/shared/constants/estado-estadio.options";
import { TIPO_CESPED_OPTIONS } from "@/shared/constants/tipo-cesped.options";

export default function useEstadio() {

    const router = useRouter();
    const [data, setData] = useState<any[]>([]);
    const [anios, setAnios] = useState<number[]>([]);
    const [page, setPage] = useState(1);
    const [paises, setPaises] = useState<any[]>([]);
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

    useEffect(() => { fetchAnios(); }, []);

    useEffect(() => { fetchEstadios(query, page); }, [query, page]);

    const handleSearch = (value: string) => {
        setQuery((prev) => ({ ...prev, search: value, }));
        setPage(1);
    };

    const estadioFilters = [
        {
            key: "estado",
            placeholder: "Selecciona Estado",
            options: ESTADO_ESTADIO_OPTIONS,
        },
        {
            key: "pais",
            placeholder: "Selecciona Pais",
            options: paises.map((p: any) => ({ value: p.nombre, label: p.nombre, })),
        },
        {
            key: "anio",
            placeholder: "Selecciona Año",
            options: anios.map((a) => ({ label: a.toString(), value: a.toString(), })),
        },
        {
            key: "tipoCesped",
            placeholder: "Selecciona Tipo de césped",
            options: TIPO_CESPED_OPTIONS,
        },
    ];

    const handleFilter = (filters: Record<string, any>) => {
        setQuery((prev) => ({ ...prev, ...filters, }));
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