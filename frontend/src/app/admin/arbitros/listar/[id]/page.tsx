"use client";

import AdminLayout from "@/shared/components/layout/admin/layout";
import DetailCard from "@/shared/components/ui/card-detail/card-detail";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import useArbitroDetail from "@/features/arbitro/hooks/useArbitroDetail";

export default function ArbitroDetallePage() {

    const { arbitro, items } = useArbitroDetail();
    return (
        <AdminLayout>
            <Breadcrumb
                items={[
                    { label: "Árbitros", href: "/admin/arbitros" },
                    { label: "Listado", href: "/admin/arbitros/listar" },
                    { label: "Detalle" },
                ]}
            />

            {
                arbitro && (
                    <DetailCard
                        title={`${arbitro.persona.nombre} ${arbitro.persona.apellido}`}
                        image={`https://localhost:7269${arbitro.persona.fotoUrl}`}
                        items={items}
                    />
                )
            }
        </AdminLayout>
    );
}