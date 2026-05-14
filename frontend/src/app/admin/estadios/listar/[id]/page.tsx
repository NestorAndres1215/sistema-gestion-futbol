"use client";

import AdminLayout from "@/shared/components/layout/admin/layout";
import DetailCard from "@/shared/components/ui/card-detail/card-detail";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import useEstadioDetail from "@/features/estadio/hooks/useEstadioDetail";


export default function EstadioDetallePage() {
    const { estadio, items } = useEstadioDetail();
    return (
        <AdminLayout>
            <Breadcrumb
                items={[
                    { label: "Estadios", href: "/admin/estadios" },
                    { label: "Listado", href: "/admin/estadios/listar" },
                    { label: "Detalle" },
                ]}
            />

            {
                estadio && (
                    <DetailCard
                        title={`${estadio.nombre}`}
                        image={`https://localhost:7269${estadio.fotoUrl}`}
                        items={items}
                    />
                )
            }
        </AdminLayout>
    );
}