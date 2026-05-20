"use client";
import useArbitroEstadisticas from "@/features/arbitro/hooks/useArbitroEstadisticas";
import CustomBarChart from "@/shared/components/charts/custom-bart-chart/custom-bar-chart";
import CustomLineChart from "@/shared/components/charts/custom-line-chart/custom-line-chart";
import CustomPieChart from "@/shared/components/charts/custom-pie-chart/custom-pie-chart";
import TeamStatusCard from "@/shared/components/charts/custom-team-status-card/custom-team-status-card";

import DashboardCard from "@/shared/components/charts/dashboard-card/dashboard-card";
import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";

export default function EstadisticasArbitros() {

  const {
    totalArbitros, arbitrosActivos, precisionPromedio, arbitrosPorPais, estadoItems,
    arbitrosMasPartidos, rolArbitral, estadoFisico, debutsPorAnio,
    mejorNivel, activosVsRetirados, edadPromedio, promedioTarjetas,
    topExperiencia, topReputacion, } = useArbitroEstadisticas();
  console.log(activosVsRetirados)
  return (
    <AdminLayout>
      <Breadcrumb
        items={[
          { label: "Arbitros", href: "/admin/arbitros" },
          { label: "Estadisticas" },
        ]}
      />
      <div className="grid gap-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="row g-3 mb-4">
            <div className="col-12 col-md-6 col-lg-4">
              <DashboardCard
                title="Total Arbitros"
                value={totalArbitros}
                icon="fas fa-users"
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <DashboardCard
                title="Arbitros Activos"
                value={arbitrosActivos}
                icon="fas fa-user-check"
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <DashboardCard
                title="Promedio de Preciision"
                value={precisionPromedio}
                icon="fas fa-chart-line"
              />
            </div>
          </div>
          <div className="row g-3 mb-4">
            <div className="col-12 col-lg-6">
              <CustomBarChart
                title="Arbitros con mejor reputacion"
                data={topReputacion}
                xKey="nombre"
                dataKey="valor"
              />
            </div>

            <div className="col-12 col-lg-6">
              <CustomBarChart
                title="Arbitros con mas experiencia"
                data={topExperiencia}
                xKey="nombre"
                dataKey="valor"
              />
            </div>
          </div>
          <div className="row g-3 mb-4">
            <div className="col-12 col-lg-6">
              <CustomBarChart
                title="Arbitros con mas paises"
                data={arbitrosPorPais}
                xKey="nombre"
                dataKey="valor"
              />
            </div>

            <div className="col-12 col-lg-6">
              <CustomBarChart
                title="Arbitros con mas partidos"
                data={arbitrosMasPartidos}
                xKey="nombre"
                dataKey="valor"
              />
            </div>
          </div>
          <div className="row g-3 mb-4">
            <div className="col-12 col-lg-6">

              <CustomPieChart
                title="Arbitros Activos y Retirados"
                data={activosVsRetirados}
                nameKey="nombre"
                dataKey="valor"
              />
            </div>
            <div className="col-12 col-lg-6">
              <TeamStatusCard
                title="Estados fisicos de los arbitros"
                icon="fas fa-futbol"
                items={estadoItems}
              />
            </div>

          </div>
          <div className="row g-3 mb-4">
            <div className="col-12 col-lg-12">
              <CustomLineChart
                title="Estadios mayor capacidad"
                data={debutsPorAnio}
                xKey="nombre"
                dataKey="valor"
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}