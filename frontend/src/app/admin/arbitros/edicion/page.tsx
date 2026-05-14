"use client";
import useArbitro from "@/features/arbitro/hooks/useArbitro";
import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import FilterBar from "@/shared/components/ui/filter-bar/filter-bar";
import Pagination from "@/shared/components/ui/pagination/pagination";
import SearchBar from "@/shared/components/ui/search-bar/search-bar";
import Table from "@/shared/components/ui/table/table";

export default function ListarArbitros() {

    const {
        query, data, page,arbitroColumns,
        totalPages, handleSearch, handleFilter,
        arbitroFilters, setPage,arbitroActions,
    } = useArbitro();

    return (
        <AdminLayout>
            <Breadcrumb
                items={[
                    { label: "Arbitros", href: "/admin/arbitros" },
                    { label: "Edicion Arbitros" },
                ]}
            />

            <div className="container mt-3">

                <SearchBar
                    value={query.search}
                    onSearch={handleSearch}
                />

                <FilterBar
                    onChange={handleFilter}
                    selectFilters={arbitroFilters}
                />
                <Table
                    data={data}
                    columns={arbitroColumns}
                    showActions
                    actions={arbitroActions}
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