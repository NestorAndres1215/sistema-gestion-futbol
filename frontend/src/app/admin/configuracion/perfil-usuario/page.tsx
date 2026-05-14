"use client";

import { useMe } from "@/features/auth/hooks/useMe";
import AdminLayout from "@/shared/components/layout/admin/layout";
import styles from "./perfil-usuario.module.css";

export default function PerfilUsuario() {
  const { user, error } = useMe();

  const initials = user?.nombre
    ? user.nombre.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <AdminLayout>
      <div className={styles.wrapper}>
        <div className={styles.card}>

          <div className={styles.cardHead}>
            <div className={styles.headIcon}>
              <i className="fa fa-user-circle"></i>
            </div>
            <p className={styles.headTitle}>Mi Perfil</p>
          </div>

          {user && (
            <div className={styles.content}>
              <div className={styles.hero}>
                <div className={styles.avatar}>{initials}</div>
                <div>
                  <h2 className={styles.name}>{user.nombre}</h2>
                  <p className={styles.email}>{user.email}</p>
                </div>
              </div>

              <div className={styles.divider} />

              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Nombre</span>
                  <span className={styles.infoValue}>{user.nombre}</span>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Correo</span>
                  <span className={styles.infoValue}>{user.email}</span>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Rol</span>
                  <span className={styles.badge}>{user.role?.nombre ?? "—"}</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </AdminLayout>
  );
}