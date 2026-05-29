"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUsers, updateUserState } from "../services/usuario.service";
import { SwalService } from "@/shared/lib/swal/swal.service";
import { ESTADO_SISTEMA_OPTIONS } from "@/shared/constants/estado.options";

export function useUsers() {
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(1);

  const [query, setQuery] = useState({
    search: "",
    estado: "",
    rol: "",
  });

  const pageSize = 10;

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
    setQuery((prev) => ({ ...prev, search: value }));
    setPage(1);
  };

  const handleFilter = (newFilters: any) => {
    setQuery((prev) => ({ ...prev, ...newFilters }));
    setPage(1);
  };

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

  const userColumns = [
    { header: "ID", accessor: (row: any) => row.id, },
    { header: "Usuario", accessor: (row: any) => row.username, },
    { header: "Email", accessor: (row: any) => row.email, },
    { header: "Rol", accessor: (u: any) => u.rol.nombre, },
  ];

  const userActions = {
    onView: (u: any) => router.push(`/admin/usuario/${u.id}`),
    onEdit: (u: any) => router.push(`/admin/usuario/${u.id}/editar`),
    onDelete: (u: any) => handleDelete(u),
  };

  const userFilters = [
    {
      key: "estado",
      placeholder: "Selecciona Estado",
      options: ESTADO_SISTEMA_OPTIONS,
    },
    {
      key: "rol",
      placeholder: "Selecciona Rol",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Usuario", value: "user" },
      ],
    },
  ];

  const breadcrumbUsuario = [
    { label: "Usuario" },
  ];

  return {
    data, query, page,
    userColumns, userActions, userFilters, breadcrumbUsuario,
    setPage, setQuery, handleSearch, handleFilter,
  };

}