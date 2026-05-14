"use client";

import AdminLayout from "@/shared/components/layout/admin/layout";
import EntityDetail from "@/shared/components/ui/detail/entity-detail";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import { useUsuarioDetails } from "@/features/usuario/hooks/useUsuarioDetails";


export default function UserDetallePage() {
  const { fields, breadcrumbUsuarioDetails } = useUsuarioDetails();

  return (
    <AdminLayout pageTitle="Detalle Usuario" pageSubtitle="Información">
      <Breadcrumb items={breadcrumbUsuarioDetails} />
      <EntityDetail fields={fields} />
    </AdminLayout>
  );
}

