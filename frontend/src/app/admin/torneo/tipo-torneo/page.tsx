"use client";

import Breadcrumb from "@/components/bread-crumb/bread-cumb";
import AdminLayout from "../../layout/AdminLayout";
import { useRouter, useSearchParams } from "next/navigation";
import SelectionCard from "@/components/selection-card/selection-card";

export default function TipoTorneo() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tipo = searchParams.get("tipo");


  const irATorneo = (categoria: string) => {
    if (categoria === "copa-mundial") {
      router.push(`/admin/torneo/categoria?tipo=${tipo}&categoria=${categoria}`);
    } 

    else {
      router.push(`/admin/torneo/registro?tipo=${tipo}&categoria=${categoria}`);
    }
  };
   const  irFormulario =()=>{
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
            onClick={() => console.log("copa-nacional")}
          />
        </div>

        {tipo !== "selecciones" && (
          <div className="col-12 col-sm-6">
            <SelectionCard
              icon="fas fa-futbol"
              title="Ligas"
              onClick={() => console.log("ligas")}
            />
          </div>
        )}
        <div className="col-12 col-sm-6">
          <SelectionCard
            icon="fas fa-globe"
            title="Copa Internacional"
            onClick={() => console.log("copa-internacional")}
          />
        </div>

        <div className="col-12 col-sm-6">
          <SelectionCard
            icon="fas fa-calendar"
            title="Temporada"
            onClick={() => console.log("temporada")}
          />
        </div>


        {tipo !== "clubes" && (
          <div className="col-12 col-sm-6">
            <SelectionCard
              icon="fas fa-globe"
              title="Copa Mundial"
              onClick={() => console.log("copa-mundial")}
            />
          </div>
        )}

        {tipo !== "clubes" && (
          <div className="col-12 col-sm-6">
            <SelectionCard
              icon="fas fa-medal"
              title="Olimpiadas"
              onClick={() => console.log("olimpiadas")}
            />
          </div>
        )}

      </div>
    </AdminLayout>
  );
}