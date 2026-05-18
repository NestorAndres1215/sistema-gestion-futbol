"use client";

import useEntrenadorDetail from "@/features/entrenador/hooks/useEntrenadorDetail";
import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import DetailCard from "@/shared/components/ui/card-detail/card-detail";

export default function EntrenadorDetallePage() {

    const { entrenador, items } = useEntrenadorDetail();

    return (
        <AdminLayout>

            <Breadcrumb
                items={[
                    { label: "Entrenadores", href: "/admin/entrenadores" },
                    { label: " Listado ", href: "/admin/entrenadores/listar" },
                    { label: "Detalle" },
                ]}
            />
            {
                entrenador && (
                    <DetailCard
                        title={`${entrenador.persona.nombre} ${entrenador.persona.apellido}`}
                        image={`https://localhost:7269${entrenador.persona.fotoUrl}`}
                        items={items}
                    />
                )
            }
        </AdminLayout>
    );
}