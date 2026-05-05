"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminLayout from "@/app/admin/layout/AdminLayout";
import { getUserById, updateUser } from "@/services/user.service";
import { UsuarioModel } from "../../usuario.model";
import { SwalService } from "@/services/swal/swal.service";
import styles from "./editar-usuario.module.css";
import Breadcrumb from "@/components/bread-crumb/bread-cumb";
export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<UsuarioModel>({
    username: "",
    email: "",
    estado: "",
    rol: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserById(Number(id));
      setForm({
        username: res.username,
        email: res.email,
        estado: res.estado,
        rol: res.rol.nombre,
      });
      setLoading(false);
    };
    if (id) fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateUser(Number(id), form);
      router.push("/admin/usuario");
    } catch (error: any) {
      SwalService.error(
        error?.response?.data?.message || error?.message || "Error inesperado"
      );
    } finally {
      setSaving(false);
    }
  };

  const initials = form.username
    ? form.username.slice(0, 2).toUpperCase()
    : "??";

  return (
    <AdminLayout pageTitle="Editar Usuario" pageSubtitle="Modificar datos">
      <Breadcrumb items={[
        { label: "Usuario", href: "/admin/usuario" },
        { label: "Editar Usuario" },
      ]} />

      <div className={styles.card}>
        <div className={styles.cardHead}>
          <div className={styles.avatar}>{initials}</div>
          <div>
            <p className={styles.cardName}>{form.username || "Usuario"}</p>
            <p className={styles.cardMeta}>ID #{id}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className={styles.form}>

          <div className={styles.field}>
            <label htmlFor="eu-username" className={styles.label}>
              Nombre de usuario
            </label>
            <div className={styles.inputWrap}>
              <i className={`fa-solid fa-user me-2 ${styles.icon}`} />
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

          <div className={styles.field}>
            <label htmlFor="eu-email" className={styles.label}>
              Correo electrónico
            </label>
            <div className={styles.inputWrap}>
              <i className={`fa-regular fa-envelope me-2 ${styles.icon}`} />
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

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.btnCancel}
              onClick={() => router.push("/admin/usuario")}
            >
              <i className="fa-solid fa-xmark" />
              Cancelar
            </button>
            <button type="submit" disabled={saving} className={styles.btnSave}>
              {saving
                ? <i className={`fa-solid fa-circle-notch ${styles.spin}`} />
                : <i className="fa-solid fa-floppy-disk" />
              }
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>

        </form>
      </div>
    </AdminLayout>
  );
}