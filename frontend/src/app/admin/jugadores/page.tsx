"use client";

import { useRouter } from "next/navigation";
import AdminLayout from "@/shared/components/layout/admin/layout";
import SelectionCard from "@/shared/components/ui/selection-card/selection-card";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";

export default function Jugadores() {
    const router = useRouter();

    return (
        <AdminLayout pageTitle="Jugadores" pageSubtitle="Mantenimiento">
   <Breadcrumb items={[{ label: "Selecciona Opciones" }]} />
            <div className="container py-3">

                <div className="row g-3">

                    <div className="col-12 col-sm-6 col-md-6">
                        <SelectionCard
                            icon="fas fa-user-plus"
                            title="Registrar Jugador"
                            description="Agregar nuevos jugadores al sistema"
                            onClick={() => router.push("/admin/jugadores/registro")}
                        />
                    </div>

                    <div className="col-12 col-sm-6 col-md-6">
                        <SelectionCard
                            icon="fas fa-running"
                            title="Ver Jugadores"
                            description="Explorar jugadores registrados"
                            onClick={() => router.push("/admin/jugadores/listar")}
                        />
                    </div>

                    <div className="col-12 col-sm-6 col-md-6">
                        <SelectionCard
                            icon="fas fa-pen"
                            title="Edición de Jugadores"
                            description="Modificar información de los jugadores"
                            onClick={() => router.push("/admin/jugadores/edicion")}
                        />
                    </div>

                    <div className="col-12 col-sm-6 col-md-6">
                        <SelectionCard
                            icon="fas fa-chart-bar"
                            title="Estadísticas"
                            description="Rendimiento y datos de jugadores"
                            onClick={() => router.push("/admin/jugadores/estadisticas")}
                        />
                    </div>

                </div>

            </div>

        </AdminLayout>
    );
}