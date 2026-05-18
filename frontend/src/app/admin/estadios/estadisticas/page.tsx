"use client";

import DashboardCard from "@/shared/components/charts/dashboard-card/dashboard-card";

import CustomBarChart from "@/shared/components/charts/custom-bart-chart/custom-bar-chart";

import CustomPieChart from "@/shared/components/charts/custom-pie-chart/custom-pie-chart";

import CustomLineChart from "@/shared/components/charts/custom-line-chart/custom-line-chart";

import CustomAreaChart from "@/shared/components/charts/custom-area-chart/custom-area-chart";

import CustomRadarChart from "@/shared/components/charts/custom-radar-chart/custom-radar-chart";

import CustomScatterChart from "@/shared/components/charts/custom-scatter-chart/custom-scatter-chart";

import CustomComposedChart from "@/shared/components/charts/custom-composed-chart/custom-composed-chart";

import AdminLayout from "@/shared/components/layout/admin/layout";
import TeamStatusCard from "@/shared/components/charts/custom-team-status-card/custom-team-status-card";
import useEstadioEstadisticas from "@/features/estadio/hooks/useEstadioEstadisticas";



const anios = [
    { anio: 2020, total: 5 },
    { anio: 2021, total: 10 },
    { anio: 2022, total: 14 },
    { anio: 2023, total: 18 },
];


const radarData = [
    {
        estadistica: "Capacidad",
        valor: 95,
    },
    {
        estadistica: "Infraestructura",
        valor: 88,
    },
    {
        estadistica: "Accesibilidad",
        valor: 80,
    },
    {
        estadistica: "Seguridad",
        valor: 92,
    },
    {
        estadistica: "Tecnología",
        valor: 85,
    },
];

const scatterData = [
    {
        capacidad: 80000,
        anio: 2000,
    },
    {
        capacidad: 78000,
        anio: 1950,
    },
    {
        capacidad: 99000,
        anio: 1957,
    },
    {
        capacidad: 90000,
        anio: 2007,
    },
];

const composedData = [
    {
        anio: 2020,
        estadios: 5,
        capacidad: 200000,
        crecimiento: 3,
    },
    {
        anio: 2021,
        estadios: 10,
        capacidad: 400000,
        crecimiento: 6,
    },
    {
        anio: 2022,
        estadios: 14,
        capacidad: 650000,
        crecimiento: 8,
    },
    {
        anio: 2023,
        estadios: 18,
        capacidad: 900000,
        crecimiento: 10,
    },
];

export default function DashboardPage() {

    const {
        totalEstadios,
        promedioCapacidad,
        totalPaises,

        paisesMasEstadios,
        paisesMenosEstadios,

        ciudadesMasEstadios,
        ciudadesMenosEstadios,

        estadiosMayorCapacidad,
        estadiosMenorCapacidad,

        estadiosMasAntiguos,
        estadiosMasNuevos,
        estadoItems,
        tiposCesped
    } = useEstadioEstadisticas();
    console.log(estadiosMasAntiguos)
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


                        <CustomAreaChart
                            title="Estadios Mas Antigua"
                            data={estadiosMasAntiguos}
                            xKey="nombre"
                            dataKey="valor"
                        />

                    </div>

                </div>

                <div className="mb-3">

                </div>


            </div>

        </AdminLayout>
    );
}