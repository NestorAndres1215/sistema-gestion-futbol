"use client";

import DashboardCard from "@/shared/components/charts/dashboard-card/dashboard-card";
import CustomBarChart from "@/shared/components/charts/custom-bart-chart/custom-bar-chart";
import CustomPieChart from "@/shared/components/charts/custom-pie-chart/custom-pie-chart";
import CustomLineChart from "@/shared/components/charts/custom-line-chart/custom-line-chart";
import CustomAreaChart from "@/shared/components/charts/custom-area-chart/custom-area-chart";
import AdminLayout from "@/shared/components/layout/admin/layout";
import TeamStatusCard from "@/shared/components/charts/custom-team-status-card/custom-team-status-card";
import useEstadioEstadisticas from "@/features/estadio/hooks/useEstadioEstadisticas";

export default function DashboardPage() {

    const {
        totalEstadios, promedioCapacidad, totalPaises,
        paisesMasEstadios, paisesMenosEstadios,
        ciudadesMasEstadios, ciudadesMenosEstadios,
        estadiosMayorCapacidad, estadiosMenorCapacidad,
        estadiosMasAntiguos, estadiosMasNuevos,
        estadoItems, tiposCesped
    } = useEstadioEstadisticas();

    return (
        <AdminLayout>

            <div className="grid gap-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="row g-3 mb-4">
                        <div className="col-12 col-md-6 col-lg-4">
                            <DashboardCard
                                title="Total Estadios"
                                value={totalEstadios}
                                icon="fas fa-futbol"
                            />
                        </div>

                        <div className="col-12 col-md-6 col-lg-4">
                            <DashboardCard
                                title="Países"
                                value={totalPaises}
                                icon="fas fa-globe-americas"
                            />
                        </div>

                        <div className="col-12 col-md-6 col-lg-4">
                            <DashboardCard
                                title="Promedio"
                                value={promedioCapacidad}
                                icon="fas fa-chart-bar"
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="row g-3 mb-4">
                        <div className="col-12 col-lg-6">
                            <CustomBarChart
                                title="Paises con Más Estadios"
                                data={paisesMasEstadios}
                                xKey="nombre"
                                dataKey="valor"
                            />
                        </div>

                        <div className="col-12 col-lg-6">
                            <CustomBarChart
                                title="Paises con Menos Estadios"
                                data={paisesMenosEstadios}
                                xKey="nombre"
                                dataKey="valor"
                            />
                        </div>
                    </div>
                    <div className="row g-3 mb-4">
                        <div className="col-12 col-lg-6">
                            <CustomBarChart
                                title="Ciudad con Más Estadios"
                                data={ciudadesMasEstadios}
                                xKey="nombre"
                                dataKey="valor"
                            />
                        </div>

                        <div className="col-12 col-lg-6">
                            <CustomBarChart
                                title="Ciudad con Menos Estadios"
                                data={ciudadesMenosEstadios}
                                xKey="nombre"
                                dataKey="valor"
                            />
                        </div>
                    </div>
                    <div className="row g-3 mb-4">
                        <div className="col-12 col-lg-6">
                            <CustomPieChart
                                title="Tipos de Cesped"
                                data={tiposCesped}
                                nameKey="nombre"
                                dataKey="valor"
                            />
                        </div>
                        <div className="col-12 col-lg-6">
                            <TeamStatusCard
                                title="Estado de Estadios"
                                icon="fas fa-futbol"
                                items={estadoItems}
                            />
                        </div>
                    </div>
                    <div className="row g-3 mb-4">


                        <div className="col-12 col-lg-12">


                            <CustomLineChart
                                title="Estadios por Año"
                                data={estadiosMayorCapacidad}
                                xKey="nombre"
                                dataKey="valor"
                            />

                        </div>
                        <div className="col-12 col-lg-12">

                            <CustomAreaChart
                                title="Estadios Mas Antigua"
                                data={estadiosMasAntiguos}
                                xKey="nombre"
                                dataKey="valor"
                            />
                        </div>
                    </div>

                </div>
            </div>

        </AdminLayout>
    );
}