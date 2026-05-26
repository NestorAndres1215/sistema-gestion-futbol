"use client";

import useSeleccionesDetail from "@/features/selecciones/hooks/useSeleccionesDetail";
import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";

import styles from "./vista.module.css";

export default function EntrenadorDetallePage() {
    const { seleccion, items } = useSeleccionesDetail();

    return (
        <AdminLayout>

            <Breadcrumb
                items={[
                    { label: "Entrenadores", href: "/admin/selecciones" },
                    { label: "Listado", href: "/admin/selecciones/listar" },
                    { label: "Detalle" },
                ]}
            />

            <div className="row g-3">

                <div className="col-12 col-md-4">
                    <div className={styles.card}>
                        <div className={styles.imgWrap}>
                            <img
                                src={`https://localhost:7269${seleccion?.escudoUrl || seleccion?.banderaUrl}`}
                                alt={seleccion?.nombre}
                                className={styles.image}
                            />
                        </div>

                        <div className="d-flex flex-column gap-3 p-3">
                            <div className="d-flex flex-column gap-2">
                                <h1 className={styles.title}>{seleccion?.nombre}</h1>
                                <div className={styles.divider} />
                            </div>

                            <div className="d-flex flex-column gap-2">
                                {items.map((item, i) => (
                                    <div key={i} className={styles.item}>
                                        <span className={styles.label}>{item.label}</span>
                                        <p className={styles.value}>{item.value ?? "—"}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-8">
                    <div className={`${styles.card} mb-3 flex-fill`}>
                        <div className={styles.cardHead}>
                            <p className={styles.cardName}>
                                Historial de Estadios
                            </p>
                        </div>
                        <div className={styles.form}>

                        </div>
                    </div>
                    <div className={`${styles.card} mb-3 flex-fill`}>
                        <div className={styles.cardHead}>
                            <p className={styles.cardName}>
                                Historial de Entrenadores
                            </p>
                        </div>
                    </div>
                    <div className={`${styles.card} mb-3 flex-fill`}>
                        <div className={styles.cardHead}>
                            <p className={styles.cardName}>
                                Palmares
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </AdminLayout>
    );
}