"use client";

import { useSearchParams } from "next/dist/client/components/navigation";
import AdminLayout from "../../layout/AdminLayout";
import Breadcrumb from "@/components/bread-crumb/bread-cumb";

export default function Categoria() {

    const searchParams = useSearchParams();
    const tipo = searchParams.get("tipo");
    const categoria = searchParams.get("categoria");
    const isGenero = categoria === "copa-mundial";
    return (
        <AdminLayout>

            <Breadcrumb
                items={[
                    { label: "Selección de Torneo", href: "/admin/torneo" },
                    {
                        label: "Tipo de Torneo",
                        href: `/admin/torneo/tipo-torneo?tipo=${tipo}`,
                    },
                    { label: "Categoria" },
                ]}
            />

            <div className="container mt-3">
                <h2>Categorías</h2>
                <p>Aquí se gestionarán las categorías del torneo.</p>
            </div>

        </AdminLayout>
    );
}