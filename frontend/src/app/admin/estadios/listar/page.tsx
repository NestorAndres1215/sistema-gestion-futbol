"use client";

import Breadcrumb from "@/components/bread-crumb/bread-cumb";
import AdminLayout from "../../layout/AdminLayout";
import { useEffect, useState } from "react";
import { getEstadios, getAniosEstadios } from "@/services/estadio.service";
import SearchBar from "@/components/search-bar/search-bar";
import FilterBar from "@/components/filter-bar/filter-bar";
import CardList from "@/components/card-list/card-list";
import Pagination from "@/components/pagination/pagination";
import { QueryState } from "./listar.type";
import styles from "@/components/card-list/card-list.module.css";

export default function ListarEstadios() {

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

            // 👇 IMPORTANTE: totalPages desde backend
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

    return (
        <AdminLayout pageTitle="Estadios" pageSubtitle="Listado">
            <Breadcrumb
                items={[
                    { label: "Estadios", href: "/admin/estadios" },
                    { label: "Listado de Estadios" },
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

                <CardList
                    data={data}
                    getTitle={(e) => e.nombre}
                    getSubtitle={(e) => `${e.ciudad} - ${e.pais}`}
                    getImage={(e) =>
                        e.fotoUrl ? `https://localhost:7269${e.fotoUrl}` : null
                    }
                    imageClassName={styles.imageStadium}
                    onDetail={(e) => console.log(e.id)}
                />

                {/* 🔥 PAGINACIÓN */}
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={(p) => setPage(p)}
                />
            </div>
        </AdminLayout>
    );
}