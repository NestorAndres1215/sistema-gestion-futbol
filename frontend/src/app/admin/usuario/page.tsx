"use client";

import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import SearchBar from "@/shared/components/ui/search-bar/search-bar";
import FilterBar from "@/shared/components/ui/filter-bar/filter-bar";
import Table from "@/shared/components/ui/table/table";
import Pagination from "@/shared/components/ui/pagination/pagination";
import { useUsers } from "@/features/usuario/hooks/useUsuarios";



export default function UsuarioPage() {
  const {
    data, page, query, breadcrumbUsuario, userColumns, userActions, userFilters,
    handleSearch, handleFilter, setPage,
  } = useUsers();

  return (
    <AdminLayout pageTitle="Usuario" pageSubtitle="Mantenimiento">

      <Breadcrumb items={breadcrumbUsuario} />

      <SearchBar
        value={query.search}
        onSearch={handleSearch}
      />

      <FilterBar
        onChange={handleFilter}
        selectFilters={userFilters}
      />

      <Table
        data={data?.items || []}
        columns={userColumns}
        showActions
        actions={userActions}
      />

      <Pagination
        currentPage={page}
        totalPages={data?.totalPages || 1}
        onPageChange={setPage}
      />

    </AdminLayout>
  );
}