"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminLayout from "@/app/admin/layout/AdminLayout";
import EntityDetail from "@/components/detail/entity-detail";
import { getUserById } from "@/services/user.service";
import Breadcrumb from "@/components/bread-crumb/bread-cumb";

export default function UserDetailPage() {
  const { id } = useParams();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserById(Number(id));
      setUser(res);
    };

    if (id) fetchUser();
  }, [id]);

  const getFields = () => [
    { label: "ID", value: user?.id },
    { label: "Usuario", value: user?.username },
    { label: "Email", value: user?.email },
    { label: "Estado", value: user?.estado },
    { label: "Rol", value: user?.rol?.nombre },
  ];

  return (
    <AdminLayout pageTitle="Detalle Usuario" pageSubtitle="Información">

      <Breadcrumb
        items={[
          { label: "Usuario", href: "/admin/usuario" },
          { label: "Detalle Usuario" },
        ]}
      />

      <EntityDetail fields={getFields()} />

    </AdminLayout>
  );
}