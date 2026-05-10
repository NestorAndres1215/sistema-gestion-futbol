"use client";

import Breadcrumb from "@/components/bread-crumb/bread-cumb"
import AdminLayout from "../../layout/AdminLayout"
import FilterBar from "@/components/filter-bar/filter-bar"
import Pagination from "@/components/pagination/pagination"
import SearchBar from "@/components/search-bar/search-bar"
import { useEffect, useState } from "react"
import { QueryState } from "../listar/listar.type"
import { getAniosEstadios, getEstadios } from "@/services/estadio.service"
import Table from "@/components/table/table"
import { useRouter } from "next/navigation";

export default function Estadio() {
    const router = useRouter();
    const [data, setData] = useState<any[]>([]);
    const [anios, setAnios] = useState<number[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 15;

    const [query, setQuery] = useState<QueryState>({
        search: "",
        tipoCesped: "",
        pais: "",
        anio: "",
        estado: "",
    });

    const fetchEstadios = async (q: QueryState, currentPage: number) => {
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

    const userFilters = [
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


    const stadiumColumns = [
        { header: "ID", accessor: "id" },
        { header: "Nombre", accessor: "nombre" },
        { header: "País", accessor: "pais" },
        { header: "Ciudad", accessor: "ciudad" },
        { header: "Año", accessor: "anio" },
        { header: "Capacidad", accessor: "capacidad" },

    ];
    const userActions = {
        onView: (u: any) =>
            router.push(`/admin/usuario/${u.id}`),

        onEdit: (u: any) =>
            router.push(`/admin/usuario/${u.id}/editar`),

    };

    return (
        <AdminLayout>
            <Breadcrumb
                items={[
                    { label: "Estadios", href: "/admin/estadios" },
                    { label: "Edicion Estadios" },
                ]}
            />

            <div className="container mt-3">
                <SearchBar
                    value={query.search}
                    onSearch={handleSearch}
                />

                <FilterBar
                    onChange={handleFilter}
                    selectFilters={userFilters}
                />

                <Table
                    data={data}
                    columns={stadiumColumns}
                    showActions
                    actions={userActions}
                />

                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={(p) => setPage(p)}
                />
            </div>

        </AdminLayout>
    )
}