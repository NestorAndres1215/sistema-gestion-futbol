"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Breadcrumb from "@/components/bread-crumb/bread-cumb";
import AdminLayout from "../layout/AdminLayout";
import SelectionCard from "@/components/selection-card/selection-card";

export default function Torneo() {
  const router = useRouter();
  const [tipo, setTipo] = useState<string>("");

  const handleSelectTipo = (value: string) => {
    setTipo(value);
    router.push(`/admin/torneo/tipo-torneo?tipo=${value}`);
  };

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