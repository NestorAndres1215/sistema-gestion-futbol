"use client";

import useSeleccionesDetail from "@/features/selecciones/hooks/useSeleccionesDetail";
import { getSeleccionById } from "@/features/selecciones/services/selecciones.service";
import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import DetailCard from "@/shared/components/ui/card-detail/card-detail";

export default function EntrenadorDetallePage() {
    const { seleccion, items } = useSeleccionesDetail();
    return (
        <AdminLayout>

            <Breadcrumb
                items={[
                    { label: "Entrenadores", href: "/admin/selecciones" },
                    { label: " Listado ", href: "/admin/selecciones/listar" },
                    { label: "Detalle" },
                ]}
            />
            {
                seleccion && (
                    <DetailCard
                        title={`${seleccion.nombre} `}
                        image={`https://localhost:7269${seleccion.escudoUrl}`}
                        items={items}
                    />
                )
            }
        </AdminLayout>
    )
}