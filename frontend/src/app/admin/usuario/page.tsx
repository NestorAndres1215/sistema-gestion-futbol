
"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { getUsers } from "@/services/user.service";
import SearchBar from "@/components/SearchBar";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
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
  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const pageSize = 10;

  const fetchUsers = async () => {
    const res = await getUsers({ page, pageSize, search });
    console.log(res)
    setData(res);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  return (
    <AdminLayout>
      <h1>Usuarios</h1>

      <SearchBar onSearch={setSearch} />

      <Table
        data={data?.items || []}
        columns={userColumns}
        showActions
        actions={{
          onView: (u) => console.log("ver", u),
          onEdit: (u) => console.log("editar", u),
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