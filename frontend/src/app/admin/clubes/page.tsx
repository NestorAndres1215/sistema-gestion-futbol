"use client";

import { useRouter } from "next/navigation";
import AdminLayout from "@/shared/components/layout/admin/layout";
import SelectionCard from "@/shared/components/ui/selection-card/selection-card";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";

export default function ClubesPage() {
    const router = useRouter();

    return (
        <AdminLayout pageTitle="Clubes" pageSubtitle="Mantenimiento">
   <Breadcrumb items={[{ label: "Selecciona Opciones" }]} />
            <div className="container py-3">

                <div className="row g-3">

                    <div className="col-12 col-sm-6 col-md-6">
                        <SelectionCard
                            icon="fas fa-plus-circle"
                            title="Registrar Club"
                            description="Agregar nuevos clubes al sistema"
                            onClick={() => router.push("/admin/clubes/registro")}
                        />
                    </div>

                    <div className="col-12 col-sm-6 col-md-6">
                        <SelectionCard
                            icon="fas fa-shield-alt"
                            title="Ver Clubes"
                            description="Explorar clubes registrados"
                            onClick={() => router.push("/admin/clubes/listar")}
                        />
                    </div>

                    <div className="col-12 col-sm-6 col-md-6">
                        <SelectionCard
                            icon="fas fa-pen"
                            title="Edición de Clubes"
                            description="Modificar información de los clubes"
                            onClick={() => router.push("/admin/clubes/edicion")}
                        />
                    </div>

                    <div className="col-12 col-sm-6 col-md-6">
                        <SelectionCard
                            icon="fas fa-chart-bar"
                            title="Estadísticas"
                            description="Ver rendimiento y datos de clubes"
                            onClick={() => router.push("/admin/clubes/estadisticas")}
                        />
                    </div>

                </div>

            </div>

        </AdminLayout>
    );
}