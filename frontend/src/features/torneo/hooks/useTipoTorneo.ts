import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useTipoTorneo() {

    const router = useRouter();

    const [tipo, setTipo] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        setTipo(params.get("tipo") ?? "");
    }, []);

    const irATorneo = (categoria: string) => {
        router.push(
            `/admin/torneo/listar?tipo=${tipo}&categoria=${categoria}`
        );
    };

    const irFormulario = () => {
        router.push(`/admin/torneo/registro?tipo=${tipo}`);
    };

    return {
        tipo,
        irATorneo,
        irFormulario
    };
}