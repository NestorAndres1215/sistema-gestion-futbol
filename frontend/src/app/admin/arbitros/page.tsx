"use client";

import { useRouter } from "next/navigation";

import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import AdminLayout from "@/shared/components/layout/admin/layout";
import SelectionCard from "@/shared/components/ui/selection-card/selection-card";

export default function Estadio() {
    const router = useRouter();


    return (
        <AdminLayout pageTitle="Estadios" pageSubtitle="Mantenimiento">

            <Breadcrumb items={[{ label: "Selecciona Opciones" }]} />

            <div className="row g-3">

                <div className="col-12 col-sm-6">
                    <SelectionCard
                        icon="fas fa-user-plus"
                        title="Registrar Arbitros"
                        onClick={() => router.push("/admin/arbitros/registro")}
                    />
                </div>

                <div className="col-12 col-sm-6">
                    <SelectionCard
                        icon="fas fa-clipboard-list"
                        title="Ver Arbitros"
                        onClick={() => router.push("/admin/arbitros/listar")}
                    />
                </div>

            </div>

        </AdminLayout>
    );
}