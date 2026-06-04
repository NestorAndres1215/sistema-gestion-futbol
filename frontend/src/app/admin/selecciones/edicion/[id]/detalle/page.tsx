"use client";
import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import styles from "./detalle.module.css";
import { useEffect, useState } from "react";
import { getEstadioByPais } from "@/features/estadio/services/estadio.service";
import { useParams, useRouter } from "next/navigation";
import ActionButton from "@/shared/components/ui/button/button";
import { addSeleccionEstadio, getSeleccionEstadioByEstadio, getSeleccionEstadiosBySeleccion, updateSeleccionEstadio } from "@/features/selecciones-estadio/services/seleccionEstadio.service";
import { SwalService } from "@/shared/lib/swal/swal.service";
import Pagination from "@/shared/components/ui/pagination/pagination";
import useSeleccionEstadioDetalle from "@/features/selecciones-estadio/hooks/useSeleccionEstadioDetalle";
import Table from "@/shared/components/ui/table/table";

export default function DetalleSeleccionPage() {
    const params = useParams();
    const seleccionId = params.id as string;


    const {
        formEstadio, estadio, editando, page, totalPages, seleccionEstadios, tipoSeleccionEstadio,
        handleChange, registrar, actualizar, limpiarFormulario, setPage, seleccionActions, seleccionColumns
    } = useSeleccionEstadioDetalle(seleccionId);

    return (
        <AdminLayout>
            <Breadcrumb
                items={[
                    { label: "Selecciones", href: "/admin/selecciones" },
                    { label: "Edicion", href: "/admin/selecciones/edicion" },
                    { label: "Detalle" },
                ]}
            />
            <div className="row g-3">

                <div className="col-12 col-md-6">
                    <div className={`${styles.card} mb-3 flex-fill`}>
                        <div className={styles.cardHead}>
                            <i className={`${styles.cardIcon} fa-solid fa-futbol `}></i>
                            <p className={styles.cardName}>
                                Formulario de Estadios
                            </p>
                        </div>
                        <div className={styles.form}>
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>
                                    Estadios
                                </label>

                                <div className={styles.inputWrap}>
                                    <select
                                        className={styles.input}
                                        value={formEstadio.estadio}
                                        onChange={(e) => handleChange("estadio", e.target.value)}
                                    >
                                        <option value="">
                                            Seleccione un estadio
                                        </option>

                                        {estadio.map((item) => (
                                            <option key={item.id} value={item.nombre}   >
                                                {item.nombre}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                                <label className={styles.label}>
                                    Confederacion
                                </label>

                                <div className={styles.inputWrap}>

                                    <select
                                        className={styles.input}
                                        value={formEstadio.tipo}
                                        onChange={(e) => handleChange("tipo", e.target.value)}
                                    >
                                        <option value="">
                                            Seleccione un país
                                        </option>
                                        {tipoSeleccionEstadio.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}

                                    </select>
                                </div>
                                <div className="my-4 d-flex flex-column gap-2">
                                    {
                                        editando ? (
                                            <>
                                                <ActionButton mode="update" onClick={actualizar} />
                                                <ActionButton mode="clear" onClick={limpiarFormulario} />
                                            </>
                                        ) : (
                                            <ActionButton mode="create" onClick={registrar} />
                                        )
                                    }</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className={`${styles.card} mb-3 flex-fill`}>
                        <div className={styles.cardHead}>
                            <i className={`${styles.cardIcon} fa-solid fa-futbol `}></i>
                            <p className={styles.cardName}>
                                Estadios de Fútbol
                            </p>
                        </div>
                        <div className="container my-4 ">
                            <Table
                                data={seleccionEstadios}
                                columns={seleccionColumns}
                                showActions
                                actions={seleccionActions}
                            />
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={(p) => setPage(p)}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className={`${styles.card} mb-3 flex-fill`}>
                        <div className={styles.cardHead}>
                            <i className={`${styles.cardIcon} fa-solid fa-futbol `}></i>
                            <p className={styles.cardName}>
                                Formulario de Entrenadores
                            </p>
                        </div>
                        <div className={styles.form}>
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>
                                    Entrenadores
                                </label>

                                <div className={styles.inputWrap}>
                                    <select
                                        className={styles.input}
                                        value={formEstadio.estadio}
                                        onChange={(e) => handleChange("estadio", e.target.value)}
                                    >
                                        <option value="">
                                            Seleccione un estadio
                                        </option>

                                        {estadio.map((item) => (
                                            <option key={item.id} value={item.nombre}   >
                                                {item.nombre}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                            </div>
                        </div>


                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className={`${styles.card} mb-3 flex-fill`}>
                        <div className={styles.cardHead}>
                            <i className={`${styles.cardIcon} fa-solid fa-user-tie `}></i>
                            <p className={styles.cardName}>
                                Entrenadores
                            </p>
                        </div>
                        <div className={styles.form}>
                            <div className={styles.tablaWrap}>
                                <table className={styles.tabla}>
                                    <thead>
                                        <tr>
                                            <th>N°</th>
                                            <th>Entrenador</th>
                                            <th>Fecha Inicio</th>
                                            <th>Fecha Final</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </AdminLayout >
    )
}