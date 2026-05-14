
"use client";
import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import SelectionCard from "@/shared/components/ui/selection-card/selection-card";
import { useRouter } from "next/navigation";

export default function SeleccionesPage() {
    const router = useRouter();

    return (
        <AdminLayout pageTitle="Selecciones" pageSubtitle="Mantenimiento">
            <Breadcrumb items={[{ label: "Selecciona Opciones" }]} />
            <div className="container py-3">

                <div className="row g-3">

                    <div className="col-12 col-sm-6 col-md-6">
                        <SelectionCard
                            icon="fas fa-plus-circle"
                            title="Registrar Selección"
                            description="Agregar nuevas selecciones al sistema"
                            onClick={() => router.push("/admin/selecciones/registro")}
                        />
                    </div>

                    <div className="col-12 col-sm-6 col-md-6">
                        <SelectionCard
                            icon="fas fa-flag"
                            title="Ver Selecciones"
                            description="Explorar selecciones registradas"
                            onClick={() => router.push("/admin/selecciones/listar")}
                        />
                    </div>

                    <div className="col-12 col-sm-6 col-md-6">
                        <SelectionCard
                            icon="fas fa-pen"
                            title="Edición de Selecciones"
                            description="Modificar información de selecciones"
                            onClick={() => router.push("/admin/selecciones/edicion")}
                        />
                    </div>

                    <div className="col-12 col-sm-6 col-md-6">
                        <SelectionCard
                            icon="fas fa-chart-bar"
                            title="Estadísticas"
                            description="Ver rendimiento y datos de selecciones"
                            onClick={() => router.push("/admin/selecciones/estadisticas")}
                        />
                    </div>

                </div>

            </div>

        </AdminLayout>
    );
}