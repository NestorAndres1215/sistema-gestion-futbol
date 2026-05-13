"use client";

import Link from "next/link";
import styles from "./not-found.module.css";
import { useRouter } from "next/navigation";
import ActionButton from "@/shared/components/ui/button/button";

export function useAppRouter() {
  const router = useRouter();

  const goTo = (path: string) => {
    router.push(path);
  };

  return { goTo };
}

export default function NotFound() {
  const router = useRouter();
  const { goTo } = useAppRouter();

  return (
    <>
      <div className={styles.bgBlobs} aria-hidden="true">
        <div className={styles.blob1} />
        <div className={styles.blob2} />
      </div>

      <div className={styles.page}>
        <div className="d-flex align-items-center gap-2 mb-5">
          <div className={styles.logoMark}>
            <i className="fa-solid fa-futbol" />
          </div>
          <div className={styles.logoName}>
            Football<span className={styles.logoAccent}>Manager</span>
          </div>
        </div>

        <div className={styles.code}>404</div>



        <h1 className={styles.title}>Página no encontrada</h1>
        <p className={styles.sub}>
          El recurso que buscas no existe o fue movido.
        </p>


        <div className="d-flex flex-column gap-2 w-100" style={{ maxWidth: "450px" }}>
          <div className="row">
            <div className="col-6">
              <ActionButton
                mode="dashboard"
                onClick={() => goTo("/admin/dashboard")}
              />
            </div>

            <div className="col-6">
              <ActionButton
                mode="volver"
                onClick={() => router.back()}
              />
            </div>
          </div>
        </div>


      </div>
    </>
  );
}