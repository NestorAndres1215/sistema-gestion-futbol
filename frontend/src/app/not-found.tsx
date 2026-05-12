"use client";
import Link from "next/link";
import styles from "./not-found.module.css";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <div className={styles.bgBlobs} aria-hidden="true">
        <div className={styles.blob1} />
        <div className={styles.blob2} />
      </div>

      <div className={styles.page}>
        <div className={styles.logoRow}>
          <div className={styles.logoMark}>
            <i className="fa-solid fa-futbol" />
          </div>
          <div className={styles.logoName}>
            Football<span className={styles.logoAccent}>Manager</span>
          </div>
        </div>
        <div className={styles.code}>404</div>
        <div className={styles.iconWrap} aria-hidden="true">
          <i className="fa-solid fa-triangle-exclamation" />
        </div>

        <h1 className={styles.title}>Página no encontrada</h1>
        <p className={styles.sub}>
          El recurso que buscas no existe o fue movido.
        </p>

        <div className={styles.actions}>
          <Link href="/admin/dashboard" className={styles.btnPrimary}>
            <i className="fa-solid fa-house" />
            Ir al dashboard
          </Link>
          <button
            type="button"
            onClick={() => router.push("/")}
            className={styles.btnSecondary}
          >
            <i className="fa-solid fa-arrow-left" />
            Volver atrás
          </button>
        </div>
      </div>
    </>
  );
}