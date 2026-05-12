
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getTorneos } from "@/features/torneo/services/torneo.service";
export default function useTorneoRegistro() {

    const searchParams = useSearchParams();

    const tipo = searchParams.get("tipo") ?? "";
    const categoria = searchParams.get("categoria") ?? "";

    const [data, setData] = useState<any>(null);
    const [page, setPage] = useState(1);
    const pageSize = 30;

    const fetchTorneos = async (currentPage: number) => {
        const res = await getTorneos({
            page: currentPage,
            pageSize,
            tipo: categoria,
            tipoParticipante: tipo,
        });

        setData(res);
    };

    useEffect(() => {
        fetchTorneos(page);
    }, [page, tipo, categoria]);

   const breadcrumbItems = [
        { label: "Selección de Torneo", href: "/admin/torneo" },
        { label: "Listado de Torneos" },
    ]
    return {
        data,
        breadcrumbItems
    }
}