import { useParams } from "next/navigation";
import { getArbitroById } from "../services/arbitro.service";
import { useEffect, useState } from "react";

export default function useArbitroDetail() {

    const params = useParams();

    const [arbitro, setArbitro] = useState<any>(null);

    useEffect(() => {

        const fetchArbitro = async () => {
            console.log("hola")
            const res = await getArbitroById(Number(params.id));
            console.log(res)
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
                value: arbitro.persona?.paisNacimiento?.nombre ?? "-",
            },
            {
                label: "Ciudad",
                value: arbitro.persona?.ciudadNacimiento?.nombre ?? "-",
            },
            {
                label: "Edad",
                value: arbitro.persona?.fechaNacimiento
                    ? `${new Date().getFullYear() - new Date(arbitro.persona.fechaNacimiento).getFullYear()} años`
                    : "-",
            },
            {
                label: "Especialidad",
                value: arbitro.especialidad ?? "-",
            },
            {
                label: "Experiencia",
                value: arbitro.anosExperiencia != null
                    ? `${arbitro.anosExperiencia} años`
                    : "-",
            },
            {
                label: "Fecha de Debut",
                value: arbitro.fechaDebut
                    ? new Date(arbitro.fechaDebut).toLocaleDateString("es-PE")
                    : "-",
            },
            {
                label: "Categoria",
                value: arbitro.categoria ?? "-",
            },
            {
                label: "Partidos Dirigidos",
                value: arbitro.partidosDirigidos ?? "-",
            },
        ]
        : [];



    return {
        arbitro,
        items,
    }
}