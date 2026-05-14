"use client";
import useEntrenadorDetail from "@/features/entrenador/hooks/useEntrenadorDetail";
import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import EntityDetail from "@/shared/components/ui/detail/entity-detail";

export default function EntrenadorEdicionDetalle() {
    const { items } = useEntrenadorDetail();
    return (
        <AdminLayout>

            <Breadcrumb
                items={[
                    { label: "Entrenadores", href: "/admin/entrenadores" },
                    { label: "Edición", href: "/admin/entrenadores/edicion" },
                    { label: "Detalle Entrenador" },
                ]}
            />

            <EntityDetail fields={items} />
        </AdminLayout>
    )
}