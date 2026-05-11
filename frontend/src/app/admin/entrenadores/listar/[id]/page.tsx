"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/app/admin/layout/AdminLayout";
import { useParams } from "next/navigation";
import { getEntrenadorById } from "@/services/entrenador.service";
import DetailCard from "@/components/card-detail/card-detail";

export default function EntrenadorDetalle() {

    const params = useParams();

    const [entrenador, setEntrenador] = useState<any>(null);

    useEffect(() => {

        const fetchEntrenador = async () => {
            try {

                const res = await getEntrenadorById(Number(params.id));

                setEntrenador(res);

            } catch (error) {
                console.error(error);
            }
        };

        if (params.id) {
            fetchEntrenador();
        }

    }, [params.id]);

    const items = entrenador
        ? [
            {
                label: "País",
                value: entrenador.persona.paisNacimiento?.nombre,
            },
            {
                label: "Ciudad",
                value: entrenador.persona.ciudadNacimiento?.nombre,
            },
            {
                label: "Edad",
                value: entrenador.persona.fechaNacimiento
                    ? `${new Date().getFullYear() - new Date(
                        entrenador.persona.fechaNacimiento
                    ).getFullYear()} años`
                    : "Sin registro",
            },
            {
                label: "Estilo de Juego",
                value: entrenador.estiloJuego,
            },
            {
                label: "Experiencia",
                value: `${entrenador.anosExperiencia} años`,
            },
            {
                label: "Fecha de Debut",
                value: new Date(
                    entrenador.fechaDebut
                ).toLocaleDateString(),
            },
            {
                label: "Salario",
                value: `$${entrenador.salario}`,
            },
            {
                label: "Licencia",
                value: entrenador.licencia,
            },
        ]
        : [];

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