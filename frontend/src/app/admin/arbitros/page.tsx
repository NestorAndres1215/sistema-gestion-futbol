"use client";

import { useRouter } from "next/navigation";

import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import AdminLayout from "@/shared/components/layout/admin/layout";
import SelectionCard from "@/shared/components/ui/selection-card/selection-card";

export default function ArbitrosPage() {
    const router = useRouter();

    return (
        <AdminLayout pageTitle="Árbitros" pageSubtitle="Mantenimiento">

            <Breadcrumb items={[{ label: "Selecciona Opciones" }]} />

            <div className="row g-3">

                <div className="col-12 col-sm-6 col-md-6">
                    <SelectionCard
                        icon="fas fa-user-plus"
                        title="Registrar Árbitros"
                        onClick={() => router.push("/admin/arbitros/registro")}
                    />
                </div>

                <div className="col-12 col-sm-6 col-md-6">
                    <SelectionCard
                        icon="fas fa-clipboard-list"
                        title="Ver Árbitros"
                        onClick={() => router.push("/admin/arbitros/listar")}
                    />
                </div>

                <div className="col-12 col-sm-6 col-md-6">
                    <SelectionCard
                        icon="fas fa-pen"
                        title="Edición de Árbitros"
                        description="Modificar información y datos de los árbitros"
                        onClick={() => router.push("/admin/arbitros/edicion")}
                    />
                </div>

                <div className="col-12 col-sm-6 col-md-6">
                    <SelectionCard
                        icon="fas fa-chart-bar"
                        title="Estadísticas"
                        description="Visualizar datos y rendimiento del sistema"
                        onClick={() => router.push("/admin/arbitros/estadisticas")}
                    />
                </div>

            </div>

        </AdminLayout>
    );
}