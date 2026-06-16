
import { useEffect, useState } from "react";
import { getSelecciones } from "../services/selecciones.service";
import { useRouter } from "next/navigation";
import { getConfederaciones } from "@/shared/services/catalogs.service";

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
    const [confederacion, setConfederacion] = useState<any[]>([]);
    const router = useRouter();
    const [query, setQuery] = useState<SeleccionQueryState>({
        search: "",
        confederacion: "",
        estado: "",
    });
    useEffect(() => {

        const loadConfederacion = async () => {

            try {
                const data = await getConfederaciones();
                setConfederacion(Array.isArray(data) ? data : []);

            } catch (error) {
                setConfederacion([]);
            }
        };

        loadConfederacion();
    }, []);
    const confederacionFilters = [
        {
            key: "confederacion",
            placeholder: "Selecciona Confederación",
            options: confederacion.map((p: any) => ({ value: p.value, label: p.label, })),
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
            console.log(lista)
            setData(Array.isArray(lista) ? lista : []);
            setTotalPages(res?.totalPages ?? 1);

        } catch (error) {
            setData([]);
            setTotalPages(1);
        }
    };

    const seleccionColumns = [
        { header: "ID", accessor: (row: any) => row.id, },
        { header: "Nombre", accessor: (row: any) => row.seleccion, },
        { header: "Codigo FIFA", accessor: (row: any) => row.codigoFIFA, },
        { header: "Confederacion", accessor: (row: any) => row.confederacion, },
    ];



    useEffect(() => { fetchSelecciones(query, page); }, [query, page]);
    const seleccionActions = {

        onEdit: (u: any) =>
            router.push(`/admin/selecciones/edicion/${u.seleccion}/editar`),
        onView: (u: any) =>
            router.push(`/admin/selecciones/edicion/${u.seleccion}/detalle`),

    };
    return {
        data, query, page, totalPages, confederacionFilters, seleccionColumns, seleccionActions,
        handleSearch, setPage, handleFilter
    }
}