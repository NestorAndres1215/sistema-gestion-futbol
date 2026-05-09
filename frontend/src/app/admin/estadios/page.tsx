"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Breadcrumb from "@/components/bread-crumb/bread-cumb";
import AdminLayout from "../layout/AdminLayout";
import SelectionCard from "@/components/selection-card/selection-card";

export default function Estadio() {
  const router = useRouter();


  return (
    <AdminLayout pageTitle="Estadios" pageSubtitle="Mantenimiento">

      <Breadcrumb items={[{ label: "Selecciona Tipo de Torneo" }]} />

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
            onClick={() => console.log("ver-estadios")}
          />
        </div>

      </div>

    </AdminLayout>
  );
}