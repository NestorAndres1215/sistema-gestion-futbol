"use client";
import useSeleccionesRegistro from "@/features/selecciones/hooks/useSeleccionesRegistro";
import { getSeleccionByNombre } from "@/features/selecciones/services/selecciones.service";
import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import ActionButton from "@/shared/components/ui/button/button";
import { CONFEDERACION_OPTIONS } from "@/shared/constants/confederacion.options";
import styles from "@/shared/styles/form.module.css";

export default function SeleccionRegistro() {

    const { paises, setBandera, setEscudo, registrarSeleccion,
        form, handleChange, limpiarFormulario,
    } = useSeleccionesRegistro();

    return (
        <AdminLayout>
            <Breadcrumb
                items={[
                    { label: "Selecciones", href: "/admin/selecciones" },
                    { label: "Formulario" },
                ]} />
            <div className={styles.card}>
                <div className={styles.cardHead}>
                    <p className={styles.cardName}>
                        Formulario de Selecciones
                    </p>
                </div>
                <form noValidate className={styles.form}>
                    <div className="row g-3">
                        <div className="col-12 col-md-6">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>
                                    Nombre
                                </label>

                                <div className={styles.inputWrap}>

                                    <select
                                        className={styles.input}
                                        value={form.nombre}
                                        onChange={(e) => handleChange("nombre", e.target.value)}
                                    >
                                        <option value="">
                                            Seleccione un país
                                        </option>

                                        {paises.map((pais) => (
                                            <option key={pais.id} value={pais.nombre}           >
                                                {pais.nombre}
                                            </option>
                                        ))}

                                    </select>

                                </div>

                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>Codigo Fifa </label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="text"
                                        placeholder="Codigo Fifa"
                                        className={styles.input}
                                        value={form.codigoFIFA}
                                        onChange={(e) => handleChange("codigoFIFA", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>Seudonimo </label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="text"
                                        placeholder="Seudonimo de la Seleccion"
                                        className={styles.input}
                                        value={form.seudonimo}
                                        onChange={(e) => handleChange("seudonimo", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>
                                    Confederacion
                                </label>

                                <div className={styles.inputWrap}>

                                    <select
                                        className={styles.input}
                                        value={form.confederacion}
                                        onChange={(e) => handleChange("confederacion", e.target.value)}
                                    >
                                        <option value="">
                                            Seleccione un país
                                        </option>
                                        {CONFEDERACION_OPTIONS.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}

                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="d-flex flex-column gap-2 w-100">

                                <label className={styles.label}>
                                    Seleccionar Bandera
                                </label>

                                <div className={styles.inputWrap}>

                                    <input
                                        type="file"
                                        className={styles.input}
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) {
                                                setBandera(e.target.files[0]);
                                            }
                                        }}
                                    />

                                </div>

                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="d-flex flex-column gap-2 w-100">

                                <label className={styles.label}>
                                    Seleccionar Escudo
                                </label>

                                <div className={styles.inputWrap}>

                                    <input
                                        type="file"
                                        className={styles.input}
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) {
                                                setEscudo(e.target.files[0]);
                                            }
                                        }}
                                    />

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row g-2 mt-3">

                        <div className="col-12 col-sm-6">
                            <ActionButton mode="clear" onClick={limpiarFormulario} />
                        </div>

                        <div className="col-12 col-sm-6">
                            <ActionButton mode="create" onClick={registrarSeleccion} />
                        </div>

                    </div>
                </form>
            </div>

        </AdminLayout>
    )

}