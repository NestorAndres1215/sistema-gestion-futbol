"use client";

import AdminLayout from "@/shared/components/layout/admin/layout";
import EntityDetail from "@/shared/components/ui/detail/entity-detail";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import useEstadioDetail from "@/features/estadio/hooks/useEstadioDetail";

export default function EstadioEdicionDetallePage() {

    const { items } = useEstadioDetail();
    return (
        <AdminLayout
            pageTitle="Detalle"
            pageSubtitle="Información"
        >

            <Breadcrumb
                items={[
                    { label: "Estadios", href: "/admin/estadios" },
                    { label: "Edición", href: "/admin/estadios/edicion" },
                    { label: "Detalle" },
                ]}
            />

            <EntityDetail fields={items} />

        </AdminLayout>
    );
}