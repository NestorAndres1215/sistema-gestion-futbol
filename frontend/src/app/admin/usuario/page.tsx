"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { getUsers, updateUserState } from "@/services/user.service";
import SearchBar from "@/components/search-bar/search-bar";
import Table from "@/components/table/table";
import Pagination from "@/components/pagination/pagination";
import Breadcrumb from "@/components/bread-crumb/bread-cumb";
import FilterBar from "@/components/filter-bar/filter-bar";
import { SwalService } from "@/services/swal/swal.service";

export default function UsersPage() {
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(1);

  const [query, setQuery] = useState({
    search: "",
    estado: "",
    rol: "",
  });

  const pageSize = 10;

  const userFilters = [
    {
      key: "estado",
      placeholder: "Estado",
      options: [
        { label: "Activo", value: "ACTIVO" },
        { label: "Inactivo", value: "INACTIVO" },
      ],
    },
    {
      key: "rol",
      placeholder: "Rol",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Usuario", value: "usuario" },
        { label: "Supervisor", value: "supervisor" },
      ],
    },
  ];

  const handleDelete = async (user: any) => {
    const confirmed = await SwalService.confirm(
      "¿Eliminar usuario?",
      "Esta acción cambiará el estado a INACTIVO"
    );

    if (!confirmed) return;

    await updateUserState(user.id);

    await SwalService.success("Usuario desactivado");

    fetchUsers(query, page);
  };

  const fetchUsers = async (q: any, currentPage: number) => {
    const res = await getUsers({
      page: currentPage,
      pageSize,
      search: q.search,
      estado: q.estado,
      rol: q.rol,
    });

    setData(res);
  };

  useEffect(() => {
    fetchUsers(query, page);
  }, [query, page]);

  const handleSearch = (value: string) => {
    setQuery((prev) => ({
      ...prev,
      search: value,
    }));
    setPage(1);
  };


  const handleFilter = (newFilters: any) => {
    setQuery((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setPage(1);
  };


  const userColumns = [
    { header: "ID", accessor: "id" },
    { header: "Usuario", accessor: "username" },
    { header: "Email", accessor: "email" },
    {
      header: "Rol",
      accessor: (u: any) => u.rol?.nombre,
    },
  ];

  const userActions = {
    onView: (u: any) =>
      router.push(`/admin/usuario/${u.id}`),

    onEdit: (u: any) =>
      router.push(`/admin/usuario/${u.id}/editar`),

    onDelete: (u: any) => handleDelete(u),
  };

  return (
    <AdminLayout pageTitle="Usuario" pageSubtitle="Mantenimiento">
      <Breadcrumb items={[{ label: "Usuario" }]} />

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
        onPageChange={(p) => setPage(p)}
      />

    </AdminLayout>
  );
}