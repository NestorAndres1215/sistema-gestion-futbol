"use client";

import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import SelectionCard from "@/shared/components/ui/selection-card/selection-card";
import useTorneoLista from "@/features/torneo/hooks/useTorneoList";

export default function ListarTorneo() {

    const tipo = "";
    const categoria = "";

    const { data, breadcrumbItems } =
        useTorneoLista(tipo, categoria);

    return (
        <AdminLayout>
            <Breadcrumb items={breadcrumbItems} />

            <div className="container mt-3">
                <div className="row g-3">
                    {data?.items?.map((t: any) => (
                        <div key={t.id} className="col-12 col-md-4">
                            <SelectionCard
                                icon="fas fa-trophy"
                                title={t.nombre}
                                selected={false}
                                onClick={() => console.log("torneo:", t.id)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}