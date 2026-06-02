"use client";
import useEntrenadorEdit from "@/features/entrenador/hooks/useEntrenadorEdit";
import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import ActionButton from "@/shared/components/ui/button/button";
import { LICENCIAS_ENTRENADOR_OPTIONS } from "@/shared/constants/arbitro.options";
import { ESTILO_JUEGO_OPTIONS } from "@/shared/constants/estilo-juego.options";

import styles from "@/shared/styles/editar.module.css";
import { useRouter } from "next/navigation";

export default function EntrenadorEditar() {
    const router = useRouter();

    const {
        form,
        fotoPreview,
        handleChange,
        handleFotoChange, paises, ciudades,
        actualizarEntrenador
    } = useEntrenadorEdit();

    return (
        <AdminLayout>
            <Breadcrumb
                items={[
                    { label: "Entrenadores", href: "/admin/entrenadores" },
                    { label: "Edicion ", href: "/admin/entrenadores/edicion" },
                    { label: "Editar" },
                ]}
            />

            <div className={styles.layout}>
                <div className={styles.card}>
                    <div className={styles.cardHead}>
                        <p className={styles.cardName}>Foto del Estadio</p>
                    </div>
                    <div className={styles.photoWrap}>
                        <img
                            src={
                                fotoPreview
                                    ? fotoPreview.startsWith("blob:")
                                        ? fotoPreview
                                        : fotoPreview.startsWith("http")
                                            ? fotoPreview
                                            : `https://localhost:7269${fotoPreview.startsWith("/") ? "" : "/"}${fotoPreview}`
                                    : "/placeholder.png"
                            }
                            alt="foto estadio"
                            className={styles.photo}
                        />
                    </div>
                    <div className={styles.photoField}>
                        <div className={styles.inputWrap}>
                            <input
                                type="file"
                                accept="image/*"
                                className={styles.input}
                                onChange={(e) => {
                                    if (e.target.files?.[0]) handleFotoChange(e.target.files[0]);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardHead}>
                        <p className={styles.cardName}>Editar Entrenador</p>
                    </div>

                    <form noValidate className="d-flex flex-column gap-3 p-3 p-md-4">

                        <div className="row g-3">

                            <div className="col-12 col-md-6">
                                <div className="d-flex flex-column gap-2 w-100">
                                    <label className={styles.label}>Nombre</label>

                                    <div className={styles.inputWrap}>
                                        <input
                                            placeholder="Nombre"
                                            value={form.nombre}
                                            onChange={(e) => handleChange("nombre", e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className="d-flex flex-column gap-2 w-100">
                                    <label className={styles.label}>Apellido Paterno</label>

                                    <div className={styles.inputWrap}>
                                        <input
                                            placeholder="Apellido paterno"
                                            value={form.apellido}
                                            onChange={(e) => handleChange("apellidoPaterno", e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="row g-3">
                            <div className="col-12 col-md-6">
                                <div className="d-flex flex-column gap-2 w-100">
                                    <label className={styles.label}>Fecha Nacimiento</label>

                                    <div className={styles.inputWrap}>
                                        <input
                                            type="date"
                                            value={form.fechaNacimiento}
                                            onChange={(e) => handleChange("fechaNacimiento", e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="d-flex flex-column gap-2 w-100">
                                    <label className={styles.label}>Fecha Debut</label>

                                    <div className={styles.inputWrap}>
                                        <input
                                            type="date"
                                            value={form.fechaDebut}
                                            onChange={(e) => handleChange("fechaDebut", e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row g-3">

                            <div className="col-12 col-md-6">
                                <div className="d-flex flex-column gap-2 w-100">
                                    <label className={styles.label}>País Nacimiento</label>

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

                            <div className="col-12 col-md-6">
                                <div className="d-flex flex-column gap-2 w-100">
                                    <label className={styles.label}>Ciudad Nacimiento</label>

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
                                                <option key={ciudad.id} value={ciudad.nombre}                >
                                                    {ciudad.nombre}
                                                </option>
                                            ))}

                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="row g-3">

                            <div className="col-12 col-md-6">
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
                            <div className="col-12 col-md-6">
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
                                            {ESTILO_JUEGO_OPTIONS.map((item) => (
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
                                            <option value="">Manejo</option>

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
                                    <label className={styles.label}>Motivación</label>

                                    <div className={styles.inputWrap}>
                                        <select
                                            className={styles.input}
                                            value={form.motivacion}
                                            onChange={(e) =>
                                                handleChange("motivacion", Number(e.target.value))
                                            }
                                        >
                                            <option value="">Motivación</option>

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
                                    <label className={styles.label}>Disciplina</label>

                                    <div className={styles.inputWrap}>
                                        <select
                                            className={styles.input}
                                            value={form.disciplina}
                                            onChange={(e) =>
                                                handleChange("disciplina", Number(e.target.value))
                                            }
                                        >
                                            <option value="">Disciplina</option>

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
                                    <label className={styles.label}>Adaptabilidad</label>

                                    <div className={styles.inputWrap}>
                                        <select
                                            className={styles.input}
                                            value={form.adaptabilidad}
                                            onChange={(e) => handleChange("adaptabilidad", Number(e.target.value))}
                                        >
                                            <option value="">Adaptabilidad</option>

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

                        {/* BOTONES */}
                        <div className="row g-2 mt-3">

                            <div className="col-12 col-sm-6">
                                <ActionButton mode="cancelar" onClick={() => router.back()} />
                            </div>

                            <div className="col-12 col-sm-6">
                                <ActionButton mode="update" onClick={actualizarEntrenador} />
                            </div>

                        </div>

                    </form>
                </div>
            </div>

        </AdminLayout>
    )
}