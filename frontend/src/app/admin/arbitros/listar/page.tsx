"use client";

import Breadcrumb from "@/components/bread-crumb/bread-cumb";
import AdminLayout from "../../layout/AdminLayout";
import SearchBar from "@/components/search-bar/search-bar";
import FilterBar from "@/components/filter-bar/filter-bar";
import CardList from "@/components/card-list/card-list";
import Pagination from "@/components/pagination/pagination";
import styles from "@/components/card-list/card-list.module.css";
import { useEffect, useState } from "react";
import { getArbitros } from "@/services/arbitro.service";

type QueryState = {
    search: string;
    categoria: string;
    pais: string;
    estado: string;
};

export default function ListarArbitros() {

    const [query, setQuery] = useState<QueryState>({
        search: "",
        categoria: "",
        pais: "",
        estado: "",
    });

    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const pageSize = 15;

    const fetchData = async (q: QueryState, currentPage: number) => {
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

    const handleFilter = (filters: Partial<QueryState>) => {
        setQuery((prev) => ({
            ...prev,
            ...filters,
        }));

        setPage(1);
    };

    const userFilters = [
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

    return (
        <AdminLayout>
            <Breadcrumb
                items={[
                    { label: "Árbitros", href: "/admin/arbitros" },
                    { label: "Listado de Árbitros" },
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
                    getTitle={(e) =>
                        `${e.persona.nombre} ${e.persona.apellidoPaterno}`
                    }
                    getSubtitle={(e) =>
                        `${e.persona.ciudadNacimiento?.nombre ?? "Sin ciudad"} - ${e.persona.paisNacimiento?.nombre ?? "Sin país"}`
                    }
                    getImage={(e) =>
                        e.persona.fotoUrl
                            ? `https://localhost:7269${e.persona.fotoUrl}`
                            : null
                    }
                    imageClassName={styles.imagePerfil}
                    onDetail={(e) => console.log(e.id)}
                />

                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={(p) => setPage(p)}
                />

            </div>
        </AdminLayout>
    );
}