"use client";
import useSelecciones from "@/features/selecciones/hooks/useSelecciones";
import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import CardList from "@/shared/components/ui/card-list/card-list";
import FilterBar from "@/shared/components/ui/filter-bar/filter-bar";
import Pagination from "@/shared/components/ui/pagination/pagination";
import SearchBar from "@/shared/components/ui/search-bar/search-bar";
import styles from "@/shared/components/ui/card-list/card-list.module.css";
import { useRouter } from "next/navigation";

export default function SeleccionListarPage() {
    const router = useRouter();
    const { data, handleSearch, query, page, totalPages, setPage, confederacionFilters, handleFilter } = useSelecciones();

    return (
        <AdminLayout>
            <Breadcrumb
                items={[
                    { label: "Selecciones", href: "/admin/selecciones" },
                    { label: "Listado" },
                ]}
            />
            <div className="container mt-3">

                <SearchBar value={query.search} onSearch={handleSearch} />
                <FilterBar onChange={handleFilter} selectFilters={confederacionFilters} />

                <CardList
                    data={data}
                    getTitle={(e) => e.seleccion}
                    getSubtitle={(e) => `${e.confederacion} `}
                    getImage={(e) => e.escudo ? `https://localhost:7269${e.escudo}` : null}
                    imageVariant="logo"
                    imageClassName={styles.imageSeleccion}
                    onDetail={(e) => router.push(`/admin/selecciones/listar/${e.nombre}`)}
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