"use client";

import useSeleccionesDetail from "@/features/selecciones/hooks/useSeleccionesDetail";
import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";

import styles from "./vista.module.css";
import Pagination from "@/shared/components/ui/pagination/pagination";
import { useState } from "react";

export default function EntrenadorDetallePage() {
    const { seleccion, items } = useSeleccionesDetail();

    const JUGADORES_ACTUALES: any[] = [];
    const [page, setPage] = useState(1);

    const itemsPerPage = 10;

    const totalPages = Math.ceil(
        JUGADORES_ACTUALES.length / itemsPerPage
    );

    const jugadoresPaginados = JUGADORES_ACTUALES.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );


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
                            <i className={`${styles.cardIcon} fa-solid fa-users `}></i>
                            <p className={styles.cardName}>
                                Jugadores Actuales
                            </p>
                        </div>
                        <div className={styles.form}>
                            <div className={styles.tablaWrap}>
                                <table className={styles.tabla}>
                                    <thead>
                                        <tr>
                                            <th>N°</th>
                                            <th>Posicion</th>
                                            <th>Nombre</th>
                                            <th className={styles.colFecha}>
                                                Fecha de nacimiento (edad)
                                            </th>
                                            <th>PJ</th>
                                            <th>G</th>
                                            <th>Equipo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jugadoresPaginados.length > 0 ? (
                                            jugadoresPaginados.map((jugador) => (
                                                <tr key={jugador.id}>
                                                    <td>{jugador.id}</td>

                                                    <td>
                                                        <span className={styles[`pos${jugador.posicion}`]}>
                                                            {jugador.posicion}
                                                        </span>
                                                    </td>

                                                    <td>{jugador.nombre}</td>

                                                    <td className={styles.colFecha}>
                                                        {jugador.nacimiento}
                                                    </td>

                                                    <td>{jugador.pj}</td>

                                                    <td>{jugador.goles}</td>

                                                    <td>{jugador.equipo}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={7}>
                                                    <div className={styles.empty}>
                                                        <div className={styles.emptyIcon}>
                                                            <i className="fa-solid fa-ranking-star"></i>
                                                        </div>

                                                        <span className={styles.emptyTxt}>
                                                            Sin datos
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                {jugadoresPaginados.length > 0 && (
                                    <Pagination
                                        currentPage={page}
                                        totalPages={totalPages}
                                        onPageChange={(p) => setPage(p)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className={`${styles.card} mb-3 flex-fill`}>
                        <div className={styles.cardHead}>
                            <i className={`${styles.cardIcon} fa-solid fa-person-chalkboard`}></i>

                            <p className={styles.cardName}>
                                Historial de Entrenadores
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className={`${styles.card} mb-3 flex-fill`}>
                        <div className={styles.cardHead}>
                            <i className={`${styles.cardIcon} fa-solid fa-building-flag`}></i>

                            <p className={styles.cardName}>
                                Historial de Estadios
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className={`${styles.card} mb-3 flex-fill`}>
                        <div className={styles.cardHead}>
                            <i className={`${styles.cardIcon} fa-solid fa-trophy`}></i>

                            <p className={styles.cardName}>
                                Palmares
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className={`${styles.card} mb-3 flex-fill`}>
                        <div className={styles.cardHead}>
                            <i className={`${styles.cardIcon} fa-solid fa-futbol`}></i>

                            <p className={styles.cardName}>
                                Últimos Partidos Jugados
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className={`${styles.card} mb-3 flex-fill`}>
                        <div className={styles.cardHead}>
                            <i className={`${styles.cardIcon} fa-solid fa-crown`}></i>

                            <p className={styles.cardName}>
                                Historial Capitanes
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className={`${styles.card} mb-3 flex-fill`}>
                        <div className={styles.cardHead}>
                            <i className={`${styles.cardIcon} fa-solid fa-fire`}></i>

                            <p className={styles.cardName}>
                                Rivalidades Históricas
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className={`${styles.card} mb-3 flex-fill`}>
                        <div className={styles.cardHead}>
                            <i className={`${styles.cardIcon} fa-solid fa-medal`}></i>

                            <p className={styles.cardName}>
                                Historial en Torneos
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className={`${styles.card} mb-3 flex-fill`}>
                        <div className={styles.cardHead}>
                            <i className={`${styles.cardIcon} fa-solid fa-bullseye`}></i>

                            <p className={styles.cardName}>
                                Máximos Goleadores
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className={`${styles.card} mb-3 flex-fill`}>
                        <div className={styles.cardHead}>
                            <i className={`${styles.cardIcon} fa-solid fa-handshake-angle`}></i>

                            <p className={styles.cardName}>
                                Máximos Asistentes
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className={`${styles.card} mb-3 flex-fill`}>
                        <div className={styles.cardHead}>
                            <i className={`${styles.cardIcon} fa-solid fa-shirt`}></i>

                            <p className={styles.cardName}>
                                Más Presencias
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </AdminLayout>
    );
}