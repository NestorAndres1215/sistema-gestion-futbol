"use client";

import { useRouter } from "next/navigation";
import AdminLayout from "@/shared/components/layout/admin/layout";
import SelectionCard from "@/shared/components/ui/selection-card/selection-card";

export default function ConfiguracionPage() {
    const router = useRouter();

    return (
        <AdminLayout pageTitle="Configuración" pageSubtitle="Sistema">

            <div className="container py-3">

                <div className="row g-3">

                    <div className="col-12 col-sm-6 col-md-6">
                        <SelectionCard
                            icon="fas fa-user-plus"
                            title="Registrar Usuario Admin"
                            description="Crear nuevos usuarios administradores del sistema"
                            onClick={() => router.push("/admin/configuracion/usuarios-admin")}
                        />
                    </div>

                    <div className="col-12 col-sm-6 col-md-6">
                        <SelectionCard
                            icon="fas fa-key"
                            title="Cambiar Contraseña"
                            description="Actualizar credenciales de acceso"
                            onClick={() => router.push("/admin/configuracion/cambiar-password")}
                        />
                    </div>

                    <div className="col-12 col-sm-6 col-md-6">
                        <SelectionCard
                            icon="fas fa-user-cog"
                            title="Perfil de Usuario"
                            description="Administrar información del usuario"
                            onClick={() => router.push("/admin/configuracion/perfil-usuario")}
                        />
                    </div>

                    <div className="col-12 col-sm-6 col-md-6">
                        <SelectionCard
                            icon="fas fa-cogs"
                            title="Parámetros del Sistema"
                            description="Configurar reglas y parámetros generales"
                            onClick={() => router.push("/admin/configuracion/sistema")}
                        />
                    </div>

                    <div className="col-12 col-sm-6 col-md-6">
                        <SelectionCard
                            icon="fas fa-bell"
                            title="Notificaciones"
                            description="Gestionar alertas y notificaciones"
                            onClick={() => router.push("/admin/configuracion/notificaciones")}
                        />
                    </div>

                    <div className="col-12 col-sm-6 col-md-6">
                        <SelectionCard
                            icon="fas fa-shield-alt"
                            title="Seguridad"
                            description="Contraseñas, accesos y permisos"
                            onClick={() => router.push("/admin/configuracion/seguridad")}
                        />
                    </div>

                </div>

            </div>

        </AdminLayout>
    );
}