"use client";

import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb"
import AdminLayout from "../../../../shared/components/layout/admin/layout"
import FilterBar from "@/shared/components/ui/filter-bar/filter-bar"
import Pagination from "@/shared/components/ui/pagination/pagination"
import SearchBar from "@/shared/components/ui/search-bar/search-bar"
import Table from "@/shared/components/ui/table/table"
import useEstadio from "@/features/estadio/hooks/useEstadio";

export default function EstadioEdicionPage() {

    const {
        estadioActions,
        stadiumColumns,
        data,
        query,
        handleSearch,
        estadioFilters,
        handleFilter,
        page,
        totalPages,
        setPage
    } = useEstadio();
    
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
                    selectFilters={estadioFilters}
                />

                <Table
                    data={data}
                    columns={stadiumColumns}
                    showActions
                    actions={estadioActions}
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