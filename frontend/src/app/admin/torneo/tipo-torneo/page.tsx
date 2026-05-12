"use client";

import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import AdminLayout from "../../../../shared/components/layout/admin/layout";
import { useRouter, useSearchParams } from "next/navigation";
import SelectionCard from "@/shared/components/ui/selection-card/selection-card";

export default function TipoTorneo() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tipo = searchParams.get("tipo");


  const irATorneo = (categoria: string) => {
    router.push(`/admin/torneo/listar?tipo=${tipo}&categoria=${categoria}`);
  };
  const irFormulario = () => {
    router.push(`/admin/torneo/registro?tipo=${tipo}`);
  }
  return (
    <AdminLayout>
      <Breadcrumb
        items={[
          { label: "Selección de Torneo", href: "/admin/torneo" },
          { label: "Tipo de Torneo" },
        ]}
      />

      <div className="row g-3">
        <div className="col-12 col-sm-6">
          <SelectionCard
            icon="fas fa-plus-circle"
            title="Registro de Torneos"
            onClick={() => irFormulario()}
          /></div>
        <div className="col-12 col-sm-6">
          <SelectionCard
            icon="fas fa-trophy"
            title="Copa Nacional"
            onClick={() => irATorneo("copa_nacional")}
          />
        </div>

        {tipo !== "selecciones" && (
          <div className="col-12 col-sm-6">
            <SelectionCard
              icon="fas fa-futbol"
              title="Ligas"
              onClick={() => irATorneo("ligas")}
            />
          </div>
        )}
        <div className="col-12 col-sm-6">
          <SelectionCard
            icon="fas fa-globe"
            title="Copa Internacional"
            onClick={() => irATorneo("copa_internacional")}
          />
        </div>

        <div className="col-12 col-sm-6">
          <SelectionCard
            icon="fas fa-calendar"
            title="Temporada"
            onClick={() => irATorneo("temporada")}
          />
        </div>


        {tipo !== "clubes" && (
          <div className="col-12 col-sm-6">
            <SelectionCard
              icon="fas fa-globe"
              title="Copa Mundial"
              onClick={() => irATorneo("copa_mundial")}
            />
          </div>
        )}

        {tipo !== "clubes" && (
          <div className="col-12 col-sm-6">
            <SelectionCard
              icon="fas fa-medal"
              title="Olimpiadas"
              onClick={() => irATorneo("olimpiadas")}
            />
          </div>
        )}

      </div>
    </AdminLayout>
  );
}