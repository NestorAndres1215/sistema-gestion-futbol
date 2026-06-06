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
import useSeleccionEntrenadorDetalle from "@/features/selecciones-estadio/hooks/useSeleccionEntrenadorDetalle";
import { fechaHoy, fechaManana } from "@/shared/utils/date.utils";
import SelectModal from "@/shared/components/ui/select-modal/select-modal";

export default function DetalleSeleccionPage() {
    const params = useParams();
    const seleccionId = params.id as string;

    const [openModal, setOpenModal] = useState(false);
    const {
        formEstadio, estadio, editando, page,
        totalPages, seleccionEstadios, tipoSeleccionEstadio,
        seleccionActions, seleccionColumns,
        handleChange, registrar, actualizar, limpiarFormulario, setPage
    } = useSeleccionEstadioDetalle(seleccionId);

    const {
        entrenadores, formEntrenador, seleccionEntrenadores, entrenadorColumns,
        entrenadorActions, totalPagesEntrenador, pageEntrenador, setFormEntrenador,
        handleChangeEntrenador, registrarEntrenador, setPageEntrenador
    } = useSeleccionEntrenadorDetalle(seleccionId);

    const selected = entrenadores.find(
        (e: any) => e.id === formEntrenador.entrenador
    );


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
                                    <button
                                        type="button"
                                        className={styles.input}
                                        onClick={() => setOpenModal(true)}
                                    >
                                        {selected?.nombreCompleto || "Seleccione un entrenador"}
                                    </button>
                                </div>
                                {/* MODAL */}
                                <SelectModal
                                    open={openModal}
                                    title="Seleccionar entrenador"
                                    data={entrenadores}
                                    getLabel={(e: any) => e.nombreCompleto}
                                    getValue={(e: any) => e.id}
                                    onClose={() => setOpenModal(false)}
                                    onSelect={(id) => {
                                        setFormEntrenador((prev) => ({ ...prev, entrenador: Number(id) }));
                                        setOpenModal(false);
                                    }}
                                />

                                <label className={styles.label}>
                                    Fecha de Inicio
                                </label>

                                <div className={styles.inputWrap}>

                                    <input
                                        type="date"
                                        className={styles.input}
                                        value={formEntrenador.fechaInicio}
                                        onChange={(e) => handleChangeEntrenador("fechaInicio", e.target.value)}
                                    />

                                </div>

                                <label className={styles.label}>
                                    Fecha de Final
                                </label>

                                <div className={styles.inputWrap}>

                                    <input
                                        type="date"
                                        className={styles.input}
                                        value={formEntrenador.fechaFin}
                                        onChange={(e) => handleChangeEntrenador("fechaFin", e.target.value)}
                                    />

                                </div>
                                <div className="mt-4">
                                    <ActionButton mode="create" onClick={registrarEntrenador} />
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
                        <div className="container my-4 ">
                            <Table
                                data={seleccionEntrenadores}
                                columns={entrenadorColumns}
                                showActions
                                actions={entrenadorActions}
                            />
                            <Pagination
                                currentPage={pageEntrenador}
                                totalPages={totalPagesEntrenador}
                                onPageChange={(p) => setPageEntrenador(p)}
                            />
                        </div>
                    </div>
                </div>

            </div>

        </AdminLayout >
    )
}