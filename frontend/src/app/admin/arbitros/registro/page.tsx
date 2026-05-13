"use client";

import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import AdminLayout from "../../../../shared/components/layout/admin/layout";
import styles from "@/shared/styles/form.module.css";
import ActionButton from "@/shared/components/ui/button/button";
import { useRouter } from "next/navigation";
import useArbitroRegistro from "@/features/arbitro/hooks/useArbitroRegistro";

export default function ArbitroFormulario() {
    const router = useRouter();

    const {
        piesDominantes,
        categorias,
        especialidades,
        limpiarFormulario,
        registrarArbitro,
        handleChange,
        form,
        setForm,
        foto,
        setFoto,
    } = useArbitroRegistro();





    return (
        <AdminLayout pageTitle="Árbitros" pageSubtitle="Mantenimiento">

            <Breadcrumb
                items={[
                    { label: "Árbitros", href: "/admin/arbitros" },
                    { label: "Formulario" },
                ]}
            />

            <div className={styles.card}>
                <div className={styles.cardHead}>
                    <p className={styles.cardName}>
                        Formulario de Árbitros
                    </p>
                </div>

                <form noValidate className={styles.form}>

                    <div className="d-flex flex-column gap-2 w-100">
                        <label className={styles.label}>Nombre</label>
                        <div className={styles.inputWrap}>
                            <input
                                type="text"
                                placeholder="Nombre del árbitro"
                                className={styles.input}
                                value={form.nombre}
                                onChange={(e) =>
                                    handleChange("nombre", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row g-3">

                        <div className="col-12 col-md-6">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>Apellido Paterno</label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="text"
                                        placeholder="Apellido paterno"
                                        className={styles.input}
                                        value={form.apellidoPaterno}
                                        onChange={(e) => handleChange("apellidoPaterno", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>Apellido Materno</label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="text"
                                        placeholder="Apellido materno"
                                        className={styles.input}
                                        value={form.apellidoMaterno}
                                        onChange={(e) => handleChange("apellidoMaterno", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="d-flex flex-column gap-2 w-100">
                        <label className={styles.label}>Fecha Nacimiento</label>
                        <div className={styles.inputWrap}>
                            <input
                                type="date"
                                className={styles.input}
                                value={form.fechaNacimiento}
                                onChange={(e) => handleChange("fechaNacimiento", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row g-3">

                        {/* PAÍS - CIUDAD */}
                        <div className="col-12 col-md-6">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>País Nacimiento</label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="text"
                                        placeholder="País de nacimiento"
                                        className={styles.input}
                                        value={form.paisNacimiento}
                                        onChange={(e) => handleChange("paisNacimiento", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>Ciudad Nacimiento</label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="text"
                                        placeholder="Ciudad de nacimiento"
                                        className={styles.input}
                                        value={form.ciudadNacimiento}
                                        onChange={(e) => handleChange("ciudadNacimiento", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ALTURA - PESO */}
                        <div className="col-12 col-md-6">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>Altura</label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="number"
                                        placeholder="Altura en cm"
                                        className={styles.input}
                                        value={form.alturaCm}
                                        onChange={(e) => handleChange("alturaCm", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>Peso</label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="number"
                                        placeholder="Peso en kg"
                                        className={styles.input}
                                        value={form.pesoKg}
                                        onChange={(e) => handleChange("pesoKg", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row g-3">

                        {/* PIE DOMINANTE */}
                        <div className="col-12 col-md-4">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>Pie Dominante</label>

                                <div className={styles.inputWrap}>
                                    <select
                                        className={styles.input}
                                        value={form.pieDominante}
                                        onChange={(e) => handleChange("pieDominante", e.target.value)}
                                    >
                                        {piesDominantes.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* CATEGORÍA */}
                        <div className="col-12 col-md-4">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>Categoría</label>

                                <div className={styles.inputWrap}>
                                    <select
                                        className={styles.input}
                                        value={form.categoria}
                                        onChange={(e) => handleChange("categoria", e.target.value)}
                                    >
                                        <option value="">Selecciona categoría</option>
                                        {categorias.map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>Especialidad</label>

                                <div className={styles.inputWrap}>
                                    <select
                                        className={styles.input}
                                        value={form.especialidad}
                                        onChange={(e) => handleChange("especialidad", e.target.value)}
                                    >
                                        <option value="">Selecciona especialidad</option>
                                        {especialidades.map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>


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
                    <div className="row g-3">

                        <div className="col-12 col-md-4">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>Años Experiencia</label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="number"
                                        placeholder="Años dirigiendo"
                                        className={styles.input}
                                        value={form.anosExperiencia}
                                        onChange={(e) => handleChange("anosExperiencia", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>Nivel</label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="number"
                                        placeholder="1 - 100"
                                        className={styles.input}
                                        value={form.nivel}
                                        onChange={(e) => handleChange("nivel", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>Reputación</label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="number"
                                        placeholder="1 - 100"
                                        className={styles.input}
                                        value={form.reputacion}
                                        onChange={(e) => handleChange("reputacion", e.target.value)}
                                    />
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
                                        setFoto(e.target.files[0]);
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
                            <ActionButton mode="create" onClick={registrarArbitro} />
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}