"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/shared/components/layout/admin/layout";
import { useParams, useRouter } from "next/navigation";
import DetailCard from "@/shared/components/ui/card-detail/card-detail";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import { getEstadioById } from "@/services/estadio.service";

export default function EstadioDetalle() {
 
    const params = useParams();

    const [estadio, setEstadio] = useState<any>(null);

    useEffect(() => {

        const fetchEstadio = async () => {
            const res = await getEstadioById(Number(params.id));
            setEstadio(res);
        };

        if (params.id) {
            fetchEstadio();
        }

    }, [params.id]);

    const items = estadio
        ? [
            {
                label: "País",
                value: estadio.pais,
            },
            {
                label: "Ciudad",
                value: estadio.ciudad,
            },
            {
                label: "Capacidad",
                value: estadio.capacidad,
            },
            {
                label: "Tipo Césped",
                value: estadio.tipoCesped,
            },
            {
                label: "Fecha de Apertura",
                value: estadio.fechaApertura
                    ? new Date(estadio.fechaApertura).toLocaleDateString()
                    : "Sin registro",
            },
            {
                label: "Edad",
                value: estadio.anio
                    ? `${new Date().getFullYear() - estadio.anio} años`
                    : "Sin registro",
            },
            {
                label: "Latitud",
                value: `${estadio.latitud}°`,
            },
            {
                label: "Longitud",
                value: `${estadio.longitud}°`,
            },
        ]
        : [];

    return (
        <AdminLayout>
            <Breadcrumb
                items={[
                    { label: "Estadios", href: "/admin/estadios" },
                    { label: "Listado de Estadios", href: "/admin/estadios/listar" },
                    { label: "Detalle de Estadio" },
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