"use client";

import useEntrenadorDetail from "@/features/entrenador/hooks/useEntrenadorDetail";
import AdminLayout from "@/shared/components/layout/admin/layout";
import DetailCard from "@/shared/components/ui/card-detail/card-detail";

export default function EntrenadorDetalle() {

    const { entrenador, items } = useEntrenadorDetail();

    return (
        <AdminLayout>
            {
                entrenador && (
                    <DetailCard
                        title={`${entrenador.persona.nombre} ${entrenador.persona.apellidoPaterno}`}
                        image={`https://localhost:7269${entrenador.persona.fotoUrl}`}
                        items={items}
                    />
                )
            }
        </AdminLayout>
    );
}