"use client";

import useArbitroDetail from "@/features/arbitro/hooks/useArbitroDetail";
import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import EntityDetail from "@/shared/components/ui/detail/entity-detail";

export default function ArbitroEdicionDetalle() {
    const { arbitro, itemsDel } = useArbitroDetail();
    return (
        <AdminLayout>
            <Breadcrumb
                items={[
                    { label: "Árbitros", href: "/admin/arbitros" },
                    { label: "Edicion", href: "/admin/arbitros/edicion" },
                    { label: "Detalle de Árbitro" },
                ]}
            />
            <EntityDetail fields={itemsDel} />
        </AdminLayout>

    )
}