import { useEffect, useState } from "react";
import { getTorneos } from "@/features/torneo/services/torneo.service";

export default function useTorneoLista(tipo: string, categoria: string) {

    const [data, setData] = useState<any>(null);
    const [page] = useState(1);
    const pageSize = 30;

    useEffect(() => {
        const fetchTorneos = async () => {
            const res = await getTorneos({
                page,
                pageSize,
                tipo: categoria,
                tipoParticipante: tipo,
            });

            setData(res);
        };

        fetchTorneos();
    }, [page, tipo, categoria]);

    const breadcrumbItems = [
        { label: "Selección de Torneo", href: "/admin/torneo" },
        { label: "Listado de Torneos" },
    ];

    return {
        data,
        breadcrumbItems
    };
}