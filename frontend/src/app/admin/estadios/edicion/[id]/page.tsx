"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import AdminLayout from "@/shared/components/layout/admin/layout";
import EntityDetail from "@/shared/components/ui/detail/entity-detail";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";

import { getEstadioById } from "@/services/estadio.service";
import { buildEstadioFields } from "./estadio-detail.data";

export default function EstadioDetailPage() {

    const { id } = useParams();

    const [estadio, setEstadio] = useState<any>(null);

    useEffect(() => {

        const fetchEstadio = async () => {
            const res = await getEstadioById(Number(id));
            setEstadio(res);
        };

        if (id) {
            fetchEstadio();
        }

    }, [id]);

    const items = estadio
        ? buildEstadioFields(estadio)
        : [];

    return (
        <AdminLayout
            pageTitle="Detalle"
            pageSubtitle="Información"
        >

            <Breadcrumb
                items={[
                    { label: "Estadios", href: "/admin/estadios" },
                    { label: "Edición", href: "/admin/estadios/edicion" },
                    { label: "Detalle Estadio" },
                ]}
            />

            <EntityDetail fields={items} />

        </AdminLayout>
    );
}