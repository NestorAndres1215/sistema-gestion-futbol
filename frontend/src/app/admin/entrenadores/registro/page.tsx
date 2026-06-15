"use client";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import AdminLayout from "../../../../shared/components/layout/admin/layout";
import styles from "@/shared/styles/form.module.css";
import ActionButton from "@/shared/components/ui/button/button";
import useEntrenadorRegistro from "@/features/entrenador/hooks/useEntrenadorRegistro";


import { maxFechaNacimiento } from "@/shared/utils/date.utils";
import { LICENCIAS_ENTRENADOR_OPTIONS } from "@/shared/constants/arbitro.options";
export default function EntrenadorRegistroPage() {

    const {
        form, paises, ciudades,estiloJuego,
        setFoto, handleChange, limpiarFormulario, registrarEntrenador,
    } = useEntrenadorRegistro();

    return (
        <AdminLayout>
            <Breadcrumb
                items={[
                    { label: "Entrenadores", href: "/admin/entrenadores" },
                    { label: "Formulario" },
                ]} />
            <div className={styles.card}>
                <div className={styles.cardHead}>
                    <p className={styles.cardName}>
                        Formulario de Entrenadores
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

                                    <input
                                        type="text"
                                        placeholder="Nombre del estadio"
                                        className={styles.input}
                                        value={form.nombre}
                                        onChange={(e) =>
                                            handleChange("nombre", e.target.value)}
                                    />

                                </div>

                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>Apellido </label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="text"
                                        placeholder="Apellido paterno"
                                        className={styles.input}
                                        value={form.apellido}
                                        onChange={(e) => handleChange("apellido", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row g-3">
                        <div className="col-12 col-md-4">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>Fecha Nacimiento</label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="date"
                                        className={styles.input}
                                        max={maxFechaNacimiento}
                                        value={form.fechaNacimiento}
                                        onChange={(e) => handleChange("fechaNacimiento", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* PAÍS - CIUDAD */}
                        <div className="col-12 col-md-4">
                            <div className="d-flex flex-column gap-2 w-100">

                                <label className={styles.label}>
                                    País Nacimiento
                                </label>

                                <div className={styles.inputWrap}>

                                    <select
                                        className={styles.input}
                                        value={form.paisNacimiento}
                                        onChange={(e) => handleChange("paisNacimiento", e.target.value)}
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

                        <div className="col-12 col-md-4">
                            <div className="d-flex flex-column gap-2 w-100">

                                <label className={styles.label}>
                                    Ciudad Nacimiento
                                </label>

                                <div className={styles.inputWrap}>

                                    <select
                                        className={styles.input}
                                        value={form.ciudadNacimiento}
                                        onChange={(e) => handleChange("ciudadNacimiento", e.target.value)}
                                        disabled={!form.paisNacimiento}
                                    >
                                        <option value="">
                                            Seleccione una ciudad
                                        </option>

                                        {ciudades.map((ciudad) => (
                                            <option key={ciudad.id} value={ciudad.ciudad}                >
                                                {ciudad.ciudad}
                                            </option>
                                        ))}

                                    </select>

                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="row g-3">
                        <div className="col-12 col-md-4">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>Fecha Debut</label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="date"
                                        className={styles.input}
                                        value={form.fechaDebut}
                                        onChange={(e) => handleChange("fechaDebut", e.target.value)}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="col-12 col-md-4">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>Estilo de Juego</label>

                                <div className={styles.inputWrap}>
                                    <select
                                        className={styles.input}
                                        value={form.estiloJuego}
                                        onChange={(e) => handleChange("estiloJuego", e.target.value)}
                                    >
                                        <option value="">
                                            Seleccione estilo de juego
                                        </option>
                                        {estiloJuego.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>Licencia</label>

                                <div className={styles.inputWrap}>
                                    <select
                                        className={styles.input}
                                        value={form.licencia}
                                        onChange={(e) => handleChange("licencia", e.target.value)}
                                    >
                                        <option value="">
                                            Seleccione Licencia
                                        </option>
                                        {LICENCIAS_ENTRENADOR_OPTIONS.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="row g-3">

                        <div className="col-12 col-md-4">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>Nivel</label>

                                <div className={styles.inputWrap}>
                                    <select
                                        className={styles.input}
                                        value={form.nivel}
                                        onChange={(e) =>
                                            handleChange("nivel", Number(e.target.value))
                                        }
                                    >
                                        <option value="">Nivel</option>

                                        {Array.from({ length: 21 }, (_, i) => i * 5).map((val) => (
                                            <option key={val} value={val}>
                                                {val}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>Reputación</label>

                                <div className={styles.inputWrap}>
                                    <select
                                        className={styles.input}
                                        value={form.reputacion}
                                        onChange={(e) =>
                                            handleChange("reputacion", Number(e.target.value))
                                        }
                                    >
                                        <option value="">Reputación</option>

                                        {Array.from({ length: 21 }, (_, i) => i * 5).map((val) => (
                                            <option key={val} value={val}>
                                                {val}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>Manejo de Equipo</label>

                                <div className={styles.inputWrap}>
                                    <select
                                        className={styles.input}
                                        value={form.manejoEquipo}
                                        onChange={(e) =>
                                            handleChange("manejoEquipo", Number(e.target.value))
                                        }
                                    >
                                        <option value="">Manejo del equipo</option>

                                        {Array.from({ length: 21 }, (_, i) => i * 5).map((val) => (
                                            <option key={val} value={val}>
                                                {val}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="d-flex flex-column gap-2 w-100">
                        <label className={styles.label}>Foto</label>
                        <div className={styles.inputWrap}>
                            <input
                                type="file"
                                className={styles.input}
                                accept="image/*"
                                onChange={(e) => {

                                    if (e.target.files?.[0]) {

                                        setFoto(
                                            e.target.files[0]
                                        );
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="row g-2 mt-3">
                        <div className="col-12 col-sm-6">
                            <ActionButton mode="clear" onClick={limpiarFormulario} />
                        </div>
                        <div className="col-12 col-sm-6">
                            <ActionButton mode="create" onClick={registrarEntrenador} />
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}