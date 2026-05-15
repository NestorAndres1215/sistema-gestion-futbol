import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getArbitroById } from "../services/arbitro.service";

type Arbitro = any;

export default function useArbitroDetail() {
    const params = useParams();

    const id = useMemo(() => {
        const raw = Array.isArray(params.id) ? params.id[0] : params.id;
        return raw ? Number(raw) : null;
    }, [params.id]);

    const [arbitro, setArbitro] = useState<Arbitro | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchArbitro = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await getArbitroById(id);
                setArbitro(res);
            } catch (err) {
                setError("Error al cargar árbitro");
            } finally {
                setLoading(false);
            }
        };

        fetchArbitro();
    }, [id]);

    // 🔥 cálculo reutilizable
    const edad = useMemo(() => {
        if (!arbitro?.persona?.fechaNacimiento) return "-";

        const birth = new Date(arbitro.persona.fechaNacimiento);
        const today = new Date();

        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return `${age} años`;
    }, [arbitro]);

    // 🔥 construcción de items SIN duplicación
    const items = useMemo(() => {
        if (!arbitro) return [];

        return [
            { label: "País", value: arbitro.persona?.paisNacimiento?.nombre ?? "-" },
            { label: "Ciudad", value: arbitro.persona?.ciudadNacimiento?.nombre ?? "-" },
            { label: "Edad", value: edad },
            { label: "Especialidad", value: arbitro.especialidad ?? "-" },
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
            { label: "Categoria", value: arbitro.categoria ?? "-" },
            { label: "Partidos Dirigidos", value: arbitro.partidosDirigidos ?? "-" },
        ];
    }, [arbitro, edad]);

    const itemsDel = useMemo(() => {
        if (!arbitro) return [];

        const persona = arbitro.persona;

        return [
            {
                label: "Nombre Completo",
                value: `${persona?.nombre ?? ""} ${persona?.apellido ?? ""} `.trim(),
            },
            ...items,
        ];
    }, [arbitro, items]);

    return {
        arbitro,
        items,
        itemsDel,
        loading,
        error,
    };
}