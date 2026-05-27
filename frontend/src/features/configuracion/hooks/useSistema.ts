import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SistemaQueryState } from "../types/sistemaQueryState";
import { getParametros } from "../services/parametros.service";
import { ESTADO_SISTEMA_OPTIONS } from "@/shared/constants/estado-estadio.options";
import { TIPO_DATO_OPTIONS } from "@/shared/constants/tipo-dato.options";
import { CATEGORIA_PARAMETROS_OPTIONS } from "@/shared/constants/categoria.options";

export default function UseSistema() {

    const router = useRouter();

    const [query, setQuery] = useState<SistemaQueryState>({
        search: "",
        categoria: "",
        tipoDato: "",
        estado: "",
    });

    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 15;


    const fetchData = async (q: SistemaQueryState, currentPage: number) => {
        try {

            const res = await getParametros({ ...q, page: currentPage, pageSize });
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

    const handleFilter = (filters: Partial<SistemaQueryState>) => {
        setQuery((prev) => ({ ...prev, ...filters, }));
        setPage(1);
    };

    const parametrosActions = {

        onView: (u: any) =>
            router.push(`/admin/sistema/${u.id}`),

        onEdit: (u: any) =>
            router.push(`/admin/sistema/${u.id}/editar`),

    };

    const sistemasColumns = [
        { header: "ID", accessor: (row: any) => row.id, },
        { header: "Clave", accessor: (row: any) => row.clave, },
        { header: "Nombre", accessor: (row: any) => row.nombre, },
        { header: "Categoria", accessor: (row: any) => row.categoria, },
        { header: "Tipo Dato", accessor: (row: any) => row.tipoDato, },
        { header: "Estado", accessor: (row: any) => row.estado, },
    ];

    const parametrosFilters = [
        {
            key: "categoria",
            placeholder: "Selecciona Categoría",
            options: CATEGORIA_PARAMETROS_OPTIONS,
        },

        {
            key: "tipoDato",
            placeholder: "Selecciona Tipo de Dato",
            options: TIPO_DATO_OPTIONS,
        },

        {
            key: "estado",
            placeholder: "Selecciona Estado",
            options: ESTADO_SISTEMA_OPTIONS,
        },
    ];

    return {
        sistemasColumns, query, data, page,
        parametrosFilters, totalPages, parametrosActions,
        handleFilter, handleSearch, setPage
    }
}