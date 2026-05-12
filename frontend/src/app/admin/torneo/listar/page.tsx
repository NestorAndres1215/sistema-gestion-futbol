"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import AdminLayout from "../../../../shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";

import SelectionCard from "@/shared/components/ui/selection-card/selection-card";
import { getTorneos } from "@/features/torneo/services/torneo.service";

export default function ListarTorneo() {
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

    return (
        <AdminLayout>

            <Breadcrumb
                items={[
                    { label: "Selección de Torneo", href: "/admin/torneo" },
                    { label: "Listado de Torneos" },
                ]}
            />

            <div className="container mt-3">
                <div className="row g-3" >
                    {data?.items?.map((t: any) => (
                        <div key={t.id} className="col-12 col-md-4">

                            <SelectionCard
                                icon="fas fa-trophy"
                                title={t.nombre}
                                selected={false}
                                onClick={() =>
                                    console.log("torneo seleccionado:", t.id)
                                }
                            />

                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}