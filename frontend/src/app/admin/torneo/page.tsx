"use client";

import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import AdminLayout from "@/shared/components/layout/admin/layout";
import SelectionCard from "@/shared/components/ui/selection-card/selection-card";
import useTorneo from "@/features/torneo/hooks/useTorneo";

export default function TorneoPage() {

  const { tipo, handleSelectTipo } = useTorneo()
  
  return (
    <AdminLayout pageTitle="Torneos" pageSubtitle="Mantenimiento">

      <Breadcrumb items={[{ label: "Selecciona Tipo de Torneo" }]} />

      <div className="row g-3">

        <div className="col-12 col-sm-6">
          <SelectionCard
            icon="fas fa-trophy"
            title="Clubes"
            selected={tipo === "clubes"}
            onClick={() => handleSelectTipo("clubes")}
          />
        </div>

        <div className="col-12 col-sm-6">
          <SelectionCard
            icon="fas fa-earth-americas"
            title="Selecciones"
            description="Torneos entre selecciones"
            selected={tipo === "selecciones"}
            onClick={() => handleSelectTipo("selecciones")}
          />
        </div>

      </div>

    </AdminLayout>
  );
}