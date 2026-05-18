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

/* =========================================================
   DATA
========================================================= */
interface StatusItem {
    label: string;
    value: number | string;
    icon: string;
    color?: "green" | "blue" | "purple" | "amber" | "red";
}
const ESTADO_EQUIPO: StatusItem[] = [
    {
        label: "Excelente",
        value: "12",
        icon: "fas fa-circle-check",
        color: "green",
    },
    {
        label: "Bueno",
        value: "8",
        icon: "fas fa-star",
        color: "blue",
    },
    {
        label: "Regular",
        value: "4",
        icon: "fas fa-triangle-exclamation",
        color: "amber",
    },
];
export const estadios = [
    {
        nombre: "Monumental",
        capacidad: 80000,
        pais: "Perú",
        ciudad: "Lima",
        tipoCesped: "Natural",
        anio: 2000,
        estado: "Disponible",
    },
    {
        nombre: "Maracaná",
        capacidad: 78000,
        pais: "Brasil",
        ciudad: "Río de Janeiro",
        tipoCesped: "Natural",
        anio: 1950,
        estado: "Disponible",
    },
    {
        nombre: "Santiago Bernabéu",
        capacidad: 74000,
        pais: "España",
        ciudad: "Madrid",
        tipoCesped: "Híbrido",
        anio: 1947,
        estado: "Remodelación",
    },
    {
        nombre: "Camp Nou",
        capacidad: 99000,
        pais: "España",
        ciudad: "Barcelona",
        tipoCesped: "Natural",
        anio: 1957,
        estado: "Disponible",
    },
    {
        nombre: "Wembley",
        capacidad: 90000,
        pais: "Inglaterra",
        ciudad: "Londres",
        tipoCesped: "Natural",
        anio: 2007,
        estado: "Disponible",
    },
    {
        nombre: "Allianz Arena",
        capacidad: 75000,
        pais: "Alemania",
        ciudad: "Múnich",
        tipoCesped: "Híbrido",
        anio: 2005,
        estado: "Disponible",
    },
];

const paises = [
    { pais: "Perú", total: 10 },
    { pais: "Brasil", total: 20 },
    { pais: "España", total: 15 },
    { pais: "Alemania", total: 8 },
];

const anios = [
    { anio: 2020, total: 5 },
    { anio: 2021, total: 10 },
    { anio: 2022, total: 14 },
    { anio: 2023, total: 18 },
];

const tipoCesped = [
    {
        tipo: "Natural",
        total: 18,
    },
    {
        tipo: "Híbrido",
        total: 7,
    },
    {
        tipo: "Sintético",
        total: 3,
    },
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
    return (
        <AdminLayout>

            <div className="grid gap-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

                    <div className="row g-3 mb-4">
                        <div className="col-12 col-md-6 col-lg-3">
                            <DashboardCard
                                title="Total Estadios"
                                value={25}
                            />
                        </div>

                        <div className="col-12 col-md-6 col-lg-3">
                            <DashboardCard
                                title="Países"
                                value={12}
                            />
                        </div>

                        <div className="col-12 col-md-6 col-lg-3">
                            <DashboardCard
                                title="Capacidad Total"
                                value="1,250,000"
                            />
                        </div>

                        <div className="col-12 col-md-6 col-lg-3">
                            <DashboardCard
                                title="Promedio"
                                value="52,000"
                            />
                        </div>
                    </div>

                </div>


                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                    <div className="row g-3 mb-4">

                        <div className="col-12 col-lg-4">
                            <CustomBarChart
                                title="Top Estadios"
                                data={estadios}
                                xKey="nombre"
                                dataKey="capacidad"
                            />
                        </div>

                        <div className="col-12 col-lg-4">
                            <CustomPieChart
                                title="Estadios por País"
                                data={paises}
                                nameKey="pais"
                                dataKey="total"
                            />
                        </div>

                        <div className="col-12 col-lg-4">
                            <CustomLineChart
                                title="Estadios por Año"
                                data={anios}
                                xKey="anio"
                                dataKey="total"
                            />
                        </div>
                        <div className="col-12 col-lg-4">
                            <CustomAreaChart
                                title="Crecimiento de Estadios"
                                data={anios}
                                xKey="anio"
                                dataKey="total"
                            />
                        </div>
                        <div className="col-12 col-lg-4">
                            <CustomRadarChart
                                title="Nivel del Estadio"
                                data={radarData}
                                nameKey="estadistica"
                                dataKey="valor"
                            />
                        </div>
                        <div className="col-12 col-lg-4">

                            <CustomScatterChart
                                title="Capacidad vs Año"
                                data={scatterData}
                                xKey="anio"
                                yKey="capacidad"
                            />
                        </div>

                        <div className="col-12 col-lg-4">
                            <CustomComposedChart
                                title="Análisis General"
                                data={composedData}
                                xKey="anio"
                                barKey="estadios"
                                lineKey="crecimiento"
                                areaKey="capacidad"
                            />
                        </div>
                        <div className="col-12 col-lg-4">
                            <CustomPieChart
                                title="Tipo de Césped"
                                data={tipoCesped}
                                nameKey="tipo"
                                dataKey="total"
                            />
                        </div>
                    </div>

                </div>

                <div className="mb-3">
                    <TeamStatusCard items={ESTADO_EQUIPO} />
                </div>
               

            </div>

        </AdminLayout>
    );
}