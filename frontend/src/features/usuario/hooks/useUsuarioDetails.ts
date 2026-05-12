"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getUserById } from "../services/usuario.service";

export function useUsuarioDetails() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserById(Number(id));
      setUser(res);
    };

    if (id) fetchUser();
  }, [id]);

  const fields = [
    { label: "ID", value: user?.id },
    { label: "Usuario", value: user?.username },
    { label: "Email", value: user?.email },
    { label: "Estado", value: user?.estado },
    { label: "Rol", value: user?.rol?.nombre },
  ];

  const breadcrumbUsuarioDetails = [
    { label: "Usuario", href: "/admin/usuario" },
    { label: "Detalle Usuario" },
  ];

  return { user, fields, breadcrumbUsuarioDetails };
}