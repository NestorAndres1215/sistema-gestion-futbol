"use client";

import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import AdminLayout from "@/shared/components/layout/admin/layout";
import SearchBar from "@/shared/components/ui/search-bar/search-bar";
import FilterBar from "@/shared/components/ui/filter-bar/filter-bar";
import CardList from "@/shared/components/ui/card-list/card-list";
import Pagination from "@/shared/components/ui/pagination/pagination";
import styles from "@/shared/components/ui/card-list/card-list.module.css";
import { useRouter } from "next/navigation";
import useEstadio from "@/features/estadio/hooks/useEstadio";


export default function EstadiosListaPage() {
    const router = useRouter();

    const {
        query, data, page, totalPages, estadioFilters,
        setPage, handleSearch, handleFilter,
    } = useEstadio();

    return (
        <AdminLayout pageTitle="Estadios" pageSubtitle="Listado">
            <Breadcrumb
                items={[
                    { label: "Estadios", href: "/admin/estadios" },
                    { label: "Listado" },
                ]}
            />

            <div className="container mt-3">
                <SearchBar
                    value={query.search}
                    onSearch={handleSearch}
                />

                <FilterBar
                    onChange={handleFilter}
                    selectFilters={estadioFilters}
                />

                <CardList
                    data={data}
                    getTitle={(e) => e.nombre}
                    getSubtitle={(e) => `${e.ciudad} - ${e.pais}`}
                    getImage={(e) =>
                        e.fotoUrl ? `https://localhost:7269${e.fotoUrl}` : null
                    }
                    imageClassName={styles.imageStadium}
                    onDetail={(e) => router.push(`/admin/estadios/listar/${e.id}`)}
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