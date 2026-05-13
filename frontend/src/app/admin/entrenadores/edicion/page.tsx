"use client";
import useEntrenador from "@/features/entrenador/hooks/useEntrenador";
import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import FilterBar from "@/shared/components/ui/filter-bar/filter-bar";
import Pagination from "@/shared/components/ui/pagination/pagination";
import SearchBar from "@/shared/components/ui/search-bar/search-bar";
import Table from "@/shared/components/ui/table/table";


export default function ListarEntrenadores() {
    const { 
        query, handleSearch, entrenadorColumns, 
        handleFilter, entrenadorActions, entrenadorFilters, 
        data, page, totalPages, setPage 
    } = useEntrenador();
    
    return (
        <AdminLayout pageTitle="Entrenadores" pageSubtitle="Listado">
            <Breadcrumb
                items={[
                    { label: "Entrenadores", href: "/admin/entrenadores" },
                    { label: "Listado de Entrenadores" },
                ]}
            />
            <div className="container mt-3">
                <SearchBar
                    value={query.search}
                    onSearch={handleSearch}
                />

                <FilterBar
                    onChange={handleFilter}
                    selectFilters={entrenadorFilters}
                />
                <Table
                    data={data}
                    columns={entrenadorColumns}
                    showActions
                    actions={entrenadorActions}
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