import { useEffect, useState } from "react";
import { getAniosEstadios, getEstadios } from "../services/estadio.service";
import { useRouter } from "next/navigation";
import { EstadioQueryState } from "../types/estadioQueryState.types";

import { getPaises } from "@/shared/services/paises.service";


import { getEstadoEstadio, getTipoCesped } from "@/shared/services/catalogs.service";

export default function useEstadio() {

    const router = useRouter();
    const [data, setData] = useState<any[]>([]);
    const [anios, setAnios] = useState<number[]>([]);
    const [tipoCesped, setTipoCesped] = useState<any[]>([]);
    const [estadoEstadio, setEstadoEstadio] = useState<any[]>([]);
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

    const fetchTipoCesped = async () => {
        try {
            const res = await getTipoCesped();
            const lista = res?.data ?? res;
            setTipoCesped(Array.isArray(lista) ? lista : []);
        } catch (error) {
            setTipoCesped([]);
        }
    };
    const fetchEstadoEstadio = async () => {
        try {
            const res = await getEstadoEstadio();
            const lista = res?.data ?? res;
            setEstadoEstadio(Array.isArray(lista) ? lista : []);
        } catch (error) {
            setEstadoEstadio([]);
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

    useEffect(() => { fetchAnios();  fetchEstadoEstadio();}, []);
    useEffect(() => { fetchTipoCesped(); }, [])
    useEffect(() => { fetchEstadios(query, page); }, [query, page]);

    const handleSearch = (value: string) => {
        setQuery((prev) => ({ ...prev, search: value, }));
        setPage(1);
    };

    const estadioFilters = [
        {
            key: "estado",
            placeholder: "Selecciona Estado",
            options:  estadoEstadio.map((p: any) => ({ value: p.value, label: p.label, })),
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
            options: tipoCesped.map((p: any) => ({ value: p.value, label: p.label, })),
        },
    ];

    const handleFilter = (filters: Record<string, any>) => {
        setQuery((prev) => ({ ...prev, ...filters, }));
        setPage(1);
    };

    const estadioActions = {
        onEdit: (e: any) =>
            router.push(`/admin/estadios/edicion/${e.id}/editar`),
    };

    const stadiumColumns = [
        { header: "ID", accessor: (row: any) => row.id, },
        { header: "Nombre", accessor: (row: any) => row.nombre, },
        { header: "Pais", accessor: (row: any) => row.pais, },
        { header: "Ciudad", accessor: (row: any) => row.ciudad, },
        { header: "Capacidad", accessor: (row: any) => row.capacidad, },
    ];

    return {
        estadioActions, stadiumColumns, data, query, handleSearch,
        estadioFilters, handleFilter, page, totalPages, setPage
    }
}