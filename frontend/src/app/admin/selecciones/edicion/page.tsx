"use client";
import useSelecciones from "@/features/selecciones/hooks/useSelecciones";
import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import FilterBar from "@/shared/components/ui/filter-bar/filter-bar";
import Pagination from "@/shared/components/ui/pagination/pagination";
import SearchBar from "@/shared/components/ui/search-bar/search-bar";
import Table from "@/shared/components/ui/table/table";

export default function EdicionSeleccion() {
    const { data, handleSearch,seleccionActions, query, page, totalPages, setPage, confederacionFilters, handleFilter ,seleccionColumns} = useSelecciones();

    return (
        <AdminLayout>
            <Breadcrumb
                items={[
                    { label: "Selecciones", href: "/admin/selecciones" },
                    { label: "Edicion" },
                ]}
            />

            <SearchBar value={query.search} onSearch={handleSearch} />
            <FilterBar onChange={handleFilter} selectFilters={confederacionFilters} />
            <Table
                data={data}
                columns={seleccionColumns}
                showActions
                actions={seleccionActions}
            />

            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(p) => setPage(p)}
            />
        </AdminLayout>
    )
}