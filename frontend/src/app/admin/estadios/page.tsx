"use client";

import { useRouter } from "next/navigation";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import AdminLayout from "@/shared/components/layout/admin/layout";
import SelectionCard from "@/shared/components/ui/selection-card/selection-card";

export default function Estadio() {
  const router = useRouter();
  return (
    <AdminLayout pageTitle="Estadios" pageSubtitle="Mantenimiento">

      <Breadcrumb items={[{ label: "Selecciona Opciones" }]} />

      <div className="row g-3">

        <div className="col-12 col-sm-6">
          <SelectionCard
            icon="fas fa-plus-circle"
            title="Registrar Estadios"
            description="Agregar nuevos estadios al sistema"
            onClick={() => router.push("/admin/estadios/registro")}
          />
        </div>

        <div className="col-12 col-sm-6">
          <SelectionCard
            icon="fas fa-map-location-dot"
            title="Ver Estadios"
            description="Explorar y administrar estadios registrados"
            onClick={() => router.push("/admin/estadios/listar")}
          />
        </div>

        <div className="col-12 col-sm-6">
          <SelectionCard
            icon="fas fa-pen-to-square"
            title="Edición de Estadios"
            description="Modificar información y datos de los estadios"
            onClick={() => router.push("/admin/estadios/edicion")}
          />
        </div>

      </div>

    </AdminLayout>
  );
}