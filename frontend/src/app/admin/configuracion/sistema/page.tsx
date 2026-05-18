"use client";

import { useRouter } from "next/navigation";
import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import ActionButton from "@/shared/components/ui/button/button";
import SearchBar from "@/shared/components/ui/search-bar/search-bar";
import UseSistema from "@/features/configuracion/hooks/useSistema";
import Table from "@/shared/components/ui/table/table";
import Pagination from "@/shared/components/ui/pagination/pagination";
import FilterBar from "@/shared/components/ui/filter-bar/filter-bar";

export default function SistemaPage() {
    const router = useRouter();

    const registrar = () => {
        router.push("/admin/configuracion/sistema/registro");
    };
    const { sistemasColumns, handleSearch, query,
        data,
        page,
        totalPages, parametrosFilters,
        handleFilter,
        setPage,
        parametrosActions } = UseSistema();

    return (
        <AdminLayout>
            <Breadcrumb
                items={[
                    { label: "Configuracion", href: "/admin/configuracion" },
                    { label: "Parametros de Sistema" },
                ]}
            />



            <SearchBar value={query.search} onSearch={handleSearch} />


            <FilterBar
                onChange={handleFilter}
                selectFilters={parametrosFilters}
            />
            <div className="row mt-3 align-items-center">



                <div className="col-md-4 ms-auto mb-4">
                    <ActionButton
                        mode="create"
                        onClick={registrar}
                    />
                </div>

            </div>
            <Table
                data={data}
                columns={sistemasColumns}
                showActions
                actions={parametrosActions}
            />

            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(p) => setPage(p)}
            />
        </AdminLayout>
    );
}