"use client";
import useArbitroEdit from "@/features/arbitro/hooks/useArbitroEdit";
import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import ActionButton from "@/shared/components/ui/button/button";
import styles from "@/shared/styles/editar.module.css";
import { useRouter } from "next/navigation";
export default function ArbitrosEditar() {

    const router = useRouter();
    const { foto, form,
        fotoPreview, handleChange, actualizarArbitro,
        handleFotoChange, } = useArbitroEdit();
    return (
        <AdminLayout>
            <Breadcrumb
                items={[
                    { label: "Árbitros", href: "/admin/arbitros" },
                    { label: "Edicion", href: "/admin/arbitros/edicion" },
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
                        <p className={styles.cardName}>Editar Árbitro</p>
                    </div>

                    <form noValidate className="d-flex flex-column gap-3 p-3 p-md-4">

                        {/* NOMBRE + APELLIDO PATERNO */}
                        <div className="row g-3">

                            <div className="col-12 col-md-6">
                                <div className={styles.field}>
                                    <label className={styles.label}>Nombre</label>
                                    <div className={styles.inputWrap}>
                                        <input
                                            value={form.nombre}
                                            onChange={(e) => handleChange("nombre", e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className={styles.field}>
                                    <label className={styles.label}>Apellido Paterno</label>
                                    <div className={styles.inputWrap}>
                                        <input
                                            value={form.apellidoPaterno}
                                            onChange={(e) => handleChange("apellidoPaterno", e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* APELLIDO MATERNO + FECHA NACIMIENTO */}
                        <div className="row g-3">

                            <div className="col-12 col-md-6">
                                <div className={styles.field}>
                                    <label className={styles.label}>Apellido Materno</label>
                                    <div className={styles.inputWrap}>
                                        <input
                                            value={form.apellidoMaterno}
                                            onChange={(e) => handleChange("apellidoMaterno", e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className={styles.field}>
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

                        </div>

                        {/* PAÍS + CIUDAD */}
                        <div className="row g-3">

                            <div className="col-12 col-md-6">
                                <div className={styles.field}>
                                    <label className={styles.label}>País</label>
                                    <div className={styles.inputWrap}>
                                        <input
                                            value={form.paisNacimiento}
                                            onChange={(e) => handleChange("paisNacimiento", e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className={styles.field}>
                                    <label className={styles.label}>Ciudad</label>
                                    <div className={styles.inputWrap}>
                                        <input
                                            value={form.ciudadNacimiento}
                                            onChange={(e) => handleChange("ciudadNacimiento", e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* CATEGORÍA + ESPECIALIDAD */}
                        <div className="row g-3">

                            <div className="col-12 col-md-6">
                                <div className={styles.field}>
                                    <label className={styles.label}>Categoría</label>
                                    <div className={styles.inputWrap}>
                                        <input
                                            value={form.categoria}
                                            onChange={(e) => handleChange("categoria", e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className={styles.field}>
                                    <label className={styles.label}>Especialidad</label>
                                    <div className={styles.inputWrap}>
                                        <input
                                            value={form.especialidad}
                                            onChange={(e) => handleChange("especialidad", e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* EXPERIENCIA + NIVEL */}
                        <div className="row g-3">

                            <div className="col-12 col-md-6">
                                <div className={styles.field}>
                                    <label className={styles.label}>Años de Experiencia</label>
                                    <div className={styles.inputWrap}>
                                        <input
                                            type="number"
                                            value={form.anosExperiencia}
                                            onChange={(e) => handleChange("anosExperiencia", e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className={styles.field}>
                                    <label className={styles.label}>Nivel</label>
                                    <div className={styles.inputWrap}>
                                        <input
                                            type="number"
                                            value={form.nivel}
                                            onChange={(e) => handleChange("nivel", e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* REPUTACIÓN + FECHA DEBUT */}
                        <div className="row g-3">

                            <div className="col-12 col-md-6">
                                <div className={styles.field}>
                                    <label className={styles.label}>Reputación</label>
                                    <div className={styles.inputWrap}>
                                        <input
                                            type="number"
                                            value={form.reputacion}
                                            onChange={(e) => handleChange("reputacion", e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className={styles.field}>
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

                        {/* BOTONES */}
                        <div className="row g-2 mt-3">

                            <div className="col-12 col-sm-6">
                                <ActionButton mode="cancelar" onClick={() => router.back()} />
                            </div>

                            <div className="col-12 col-sm-6">
                                <ActionButton mode="update" onClick={actualizarArbitro} />
                            </div>

                        </div>

                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}