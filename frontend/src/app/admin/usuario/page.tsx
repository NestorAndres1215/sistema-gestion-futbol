
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { getUsers } from "@/services/user.service";
import SearchBar from "@/components/search-bar/search-bar";
import Table from "@/components/table/table";
import Pagination from "@/components/pagination/pagination";
import Breadcrumb from "@/components/bread-crumb/bread-cumb";
export const userColumns = [
  { header: "ID", accessor: "id" },
  { header: "Usuario", accessor: "username" },
  { header: "Email", accessor: "email" },
  {
    header: "Rol",
    accessor: (u: any) => u.rol?.nombre,
  },
];

export default function UsersPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const pageSize = 10;

  const fetchUsers = async () => {
    const res = await getUsers({ page, pageSize, search });
    setData(res);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  return (
    <AdminLayout pageTitle="Usuario" pageSubtitle="Mantenimiento">
      <Breadcrumb items={[

        { label: "Usuario" },
      ]} />
      <SearchBar onSearch={setSearch} />

      <Table
        data={data?.items || []}
        columns={userColumns}
        showActions
        actions={{
          onView: (u) => router.push(`/admin/usuario/${u.id}`),
          onEdit: (u) => router.push(`/admin/usuario/${u.id}/editar`),
          onDelete: (u) => console.log("eliminar", u),
        }}
      />

      <Pagination
        currentPage={page}
        totalPages={data?.totalPages || 1}
        onPageChange={setPage}
      />
    </AdminLayout>
  );
}