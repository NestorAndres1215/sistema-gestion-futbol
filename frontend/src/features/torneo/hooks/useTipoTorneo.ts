import { useRouter, useSearchParams } from "next/navigation";

export default function useTipoTorneo() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const tipo = searchParams.get("tipo");

    const irATorneo = (categoria: string) => {
        router.push(`/admin/torneo/listar?tipo=${tipo}&categoria=${categoria}`);
    };

    const irFormulario = () => {
        router.push(`/admin/torneo/registro?tipo=${tipo}`);
    }

    return{
        tipo,
        irATorneo,
        irFormulario
    }
}