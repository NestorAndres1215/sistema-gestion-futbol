"use client";

import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import ActionButton from "@/shared/components/ui/button/button";
import useUsuarioEdit from "@/features/usuario/hooks/useUsuarioEdit";

import styles from "@/shared/styles/form.module.css";
import { useRouter } from "next/navigation";
export default function UsuarioDetallePage() {
  const router = useRouter();
  const {
    form, breadcrumbUsuarioEdit,
    handleChange, handleSubmit,
  } = useUsuarioEdit();

  return (
    <AdminLayout pageTitle="Editar" pageSubtitle="Modificar datos">
      <Breadcrumb items={breadcrumbUsuarioEdit} />

      <div className={styles.card}>
        <div className={styles.cardHead}>
          <p className={styles.cardName}>
            Formulario de Usuario
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="d-flex flex-column gap-4 p-4">

          <div className="d-flex flex-column gap-2">
            <label htmlFor="eu-username" className={styles.label}>
              Nombre de usuario
            </label>
            <div className={styles.inputWrap}>
              <input
                id="eu-username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                placeholder="Nombre de usuario"
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className="d-flex flex-column gap-2">
            <label htmlFor="eu-email" className={styles.label}>
              Correo electrónico
            </label>
            <div className={styles.inputWrap}>

              <input
                id="eu-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className="row g-2">
            <div className="col-12 col-sm-6">
              <ActionButton mode="cancelar" onClick={() => router.back()} />
            </div>

            <div className="col-12 col-md-6">
              <ActionButton mode="update" type="submit" />
            </div>
          </div>

        </form>
      </div>
    </AdminLayout>
  );
}