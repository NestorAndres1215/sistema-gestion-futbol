"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/shared/components/layout/admin/layout";
import { useParams } from "next/navigation";
import DetailCard from "@/shared/components/ui/card-detail/card-detail";

import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import { getArbitroById } from "@/features/arbitro/services/arbitro.service";

export default function ArbitroDetalle() {

    const params = useParams();

    const [arbitro, setArbitro] = useState<any>(null);

    useEffect(() => {

        const fetchArbitro = async () => {
            const res = await getArbitroById(Number(params.id));
            setArbitro(res);
        };

        if (params.id) {
            fetchArbitro();
        }

    }, [params.id]);

    const items = arbitro
        ? [
            {
                label: "País",
                value: arbitro.persona.paisNacimiento?.nombre,
            },
            {
                label: "Ciudad",
                value: arbitro.persona.ciudadNacimiento?.nombre,
            },
            {
                label: "Edad",
                value: arbitro.persona.fechaNacimiento
                    ? `${new Date().getFullYear() - new Date(
                        arbitro.persona.fechaNacimiento
                    ).getFullYear()} años`
                    : "Sin registro",
            },
            {
                label: "Especialidad",
                value: arbitro.especialidad,
            },
            {
                label: "Experiencia",
                value: `${arbitro.anosExperiencia} años`,
            },
            {
                label: "Fecha de Debut",
                value: new Date(
                    arbitro.fechaDebut
                ).toLocaleDateString(),
            },
            {
                label: "Categoria",
                value: `${arbitro.categoria}`,
            },
            {
                label: "Partidos Dirigidos",
                value: arbitro.partidosDirigidos,
            },
        ]
        : [];

    return (
        <AdminLayout>
            <Breadcrumb
                items={[
                    { label: "Árbitros", href: "/admin/arbitros" },
                    { label: "Listado de Árbitros", href: "/admin/arbitros/listar" },
                    { label: "Detalle de Árbitro" },
                ]}
            />

            {
                arbitro && (
                    <DetailCard
                        title={`${arbitro.persona.nombre} ${arbitro.persona.apellidoPaterno}`}
                        image={`https://localhost:7269${arbitro.persona.fotoUrl}`}
                        items={items}
                    />
                )
            }
        </AdminLayout>
    );
}