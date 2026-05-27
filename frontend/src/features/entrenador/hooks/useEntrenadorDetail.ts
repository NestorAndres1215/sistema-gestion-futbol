import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getEntrenadorById } from "../services/entrenador.service";

export default function useEntrenadorDetail() {

    const params = useParams();

    const [entrenador, setEntrenador] = useState<any>(null);

    useEffect(() => {

        const fetchEntrenador = async () => {
            const res = await getEntrenadorById(Number(params.id));
            setEntrenador(res);
        };

        if (params.id) {
            fetchEntrenador();
        }

    }, [params.id]);

    const items = entrenador
        ? [
            { label: "País", value: entrenador.persona.paisNacimiento?.nombre, },
            { label: "Ciudad", value: entrenador.persona.ciudadNacimiento?.nombre, },
            { label: "Edad", value: entrenador.persona.fechaNacimiento ? `${new Date().getFullYear() - new Date(entrenador.persona.fechaNacimiento).getFullYear()} años` : "Sin registro", },
            { label: "Estilo de Juego", value: entrenador.estiloJuego, },
            { label: "Experiencia", value: `${entrenador.anosExperiencia} años`, },
            { label: "Fecha de Debut", value: new Date(entrenador.fechaDebut).toLocaleDateString(), },
            { label: "Salario", value: `$${entrenador.salario}`, },
            { label: "Licencia", value: entrenador.licencia },
        ]
        : [];

    return { items, entrenador }

}