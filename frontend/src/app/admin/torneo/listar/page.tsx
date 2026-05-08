"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import AdminLayout from "../../layout/AdminLayout";
import Breadcrumb from "@/components/bread-crumb/bread-cumb";
import { getTorneos } from "@/services/torneo.service";
import SelectionCard from "@/components/selection-card/selection-card";

export default function Listar() {
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