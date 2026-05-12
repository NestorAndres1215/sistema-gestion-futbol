"use client";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import AdminLayout from "../../../shared/components/layout/admin/layout";
import SelectionCard from "@/shared/components/ui/selection-card/selection-card";
import { useRouter } from "next/navigation";

export default function Estadio() {
    const router = useRouter();
    return (
        <AdminLayout>
            <Breadcrumb items={[{ label: "Selecciona Opciones" }]} />
            <div className="row g-3">

                <div className="col-12 col-sm-6">
                    <SelectionCard
                        icon="fas fa-plus-circle"
                        title="Registrar Entrenador"
                        description="Agregar nuevos estadios al sistema"
                        onClick={() => router.push("/admin/entrenadores/registro")}
                    />
                </div>

                <div className="col-12 col-sm-6">
                    <SelectionCard
                        icon="fas fa-user-tie"
                        title="Ver Entrenadores"
                        description="Explorar y administrar entrenadores registrados"
                        onClick={() => router.push("/admin/entrenadores/listar")}
                    />
                </div>
            </div>
        </AdminLayout>
    )
}