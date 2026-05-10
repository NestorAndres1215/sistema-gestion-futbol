"use client";

import { useState } from "react";
import Breadcrumb from "@/components/bread-crumb/bread-cumb";
import AdminLayout from "../../layout/AdminLayout";
import styles from "./registro-arbitros.module.css";
import ActionButton from "@/components/button/button";
import { addArbitro } from "@/services/arbitro.service";
import { useRouter } from "next/navigation";

export default function ArbitroFormulario() {
    const router = useRouter();
    const piesDominantes = [
        { value: "", label: "Selecciona pie dominante" },
        { value: "Derecho", label: "Derecho" },
        { value: "Izquierdo", label: "Izquierdo" },
    ];
    const categorias = ["FIFA", "Nacional", "Regional"];
    const especialidades = ["Principal", "VAR", "Asistente"];
    // PERSONA
    const [nombre, setNombre] = useState("");
    const [apellidoPaterno, setApellidoPaterno] = useState("");
    const [apellidoMaterno, setApellidoMaterno] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [paisNacimiento, setPaisNacimiento] = useState("");
    const [ciudadNacimiento, setCiudadNacimiento] = useState("");
    const [alturaCm, setAlturaCm] = useState("");
    const [pesoKg, setPesoKg] = useState("");
    const [pieDominante, setPieDominante] = useState("");

    // ARBITRO
    const [categoria, setCategoria] = useState("");
    const [especialidad, setEspecialidad] = useState("");
    const [fechaDebut, setFechaDebut] = useState("");
    const [fechaRetiro, setFechaRetiro] = useState("");
    const [anosExperiencia, setAnosExperiencia] = useState("");
    const [nivel, setNivel] = useState("");
    const [reputacion, setReputacion] = useState("");

    const [foto, setFoto] = useState<File | null>(null);

    const limpiarFormulario = () => {
        setNombre("");
        setApellidoPaterno("");
        setApellidoMaterno("");
        setFechaNacimiento("");
        setPaisNacimiento("");
        setCiudadNacimiento("");
        setAlturaCm("");
        setPesoKg("");
        setPieDominante("");

        setCategoria("");
        setEspecialidad("");
        setFechaDebut("");
        setFechaRetiro("");
        setAnosExperiencia("");
        setNivel("");
        setReputacion("");

        setFoto(null);
    };

    const registrarArbitro = async () => {
        try {
            const formData = new FormData();

            // PERSONA
            formData.append("Nombre", nombre);
            formData.append("ApellidoPaterno", apellidoPaterno);
            formData.append("ApellidoMaterno", apellidoMaterno);
            formData.append("FechaNacimiento", fechaNacimiento);
            formData.append("PaisNacimiento", paisNacimiento);
            formData.append("CiudadNacimiento", ciudadNacimiento);
            formData.append("AlturaCm", alturaCm);
            formData.append("PesoKg", pesoKg);
            formData.append("PieDominante", pieDominante);

            // ARBITRO
            formData.append("Categoria", categoria);
            formData.append("Especialidad", especialidad);
            formData.append("FechaDebut", fechaDebut);
            formData.append("AnosExperiencia", anosExperiencia);
            formData.append("Nivel", nivel);
            formData.append("Reputacion", reputacion);

            if (foto) {
                formData.append("Foto", foto);
            }

            await addArbitro(formData);
            router.push("/admin/arbitros");

        } catch (error) {
            console.error(error);
            alert("Error al registrar árbitro");
        }
    };

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

                    <div className={styles.field}>
                        <label className={styles.label}>Nombre</label>
                        <div className={styles.inputWrap}>
                            <input
                                type="text"
                                placeholder="Nombre del árbitro"
                                className={styles.input}
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row g-3">

                        <div className="col-12 col-md-6">
                            <div className={styles.field}>
                                <label className={styles.label}>Apellido Paterno</label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="text"
                                        placeholder="Apellido paterno"
                                        className={styles.input}
                                        value={apellidoPaterno}
                                        onChange={(e) => setApellidoPaterno(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className={styles.field}>
                                <label className={styles.label}>Apellido Materno</label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="text"
                                        placeholder="Apellido materno"
                                        className={styles.input}
                                        value={apellidoMaterno}
                                        onChange={(e) => setApellidoMaterno(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Fecha Nacimiento</label>
                        <div className={styles.inputWrap}>
                            <input
                                type="date"
                                className={styles.input}
                                value={fechaNacimiento}
                                onChange={(e) => setFechaNacimiento(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row g-3">

                        {/* PAÍS - CIUDAD */}
                        <div className="col-12 col-md-6">
                            <div className={styles.field}>
                                <label className={styles.label}>País Nacimiento</label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="text"
                                        placeholder="País de nacimiento"
                                        className={styles.input}
                                        value={paisNacimiento}
                                        onChange={(e) => setPaisNacimiento(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className={styles.field}>
                                <label className={styles.label}>Ciudad Nacimiento</label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="text"
                                        placeholder="Ciudad de nacimiento"
                                        className={styles.input}
                                        value={ciudadNacimiento}
                                        onChange={(e) => setCiudadNacimiento(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ALTURA - PESO */}
                        <div className="col-12 col-md-6">
                            <div className={styles.field}>
                                <label className={styles.label}>Altura</label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="number"
                                        placeholder="Altura en cm"
                                        className={styles.input}
                                        value={alturaCm}
                                        onChange={(e) => setAlturaCm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className={styles.field}>
                                <label className={styles.label}>Peso</label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="number"
                                        placeholder="Peso en kg"
                                        className={styles.input}
                                        value={pesoKg}
                                        onChange={(e) => setPesoKg(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row g-3">

                        {/* PIE DOMINANTE */}
                        <div className="col-12 col-md-4">
                            <div className={styles.field}>
                                <label className={styles.label}>Pie Dominante</label>

                                <div className={styles.inputWrap}>
                                    <select
                                        className={styles.input}
                                        value={pieDominante}
                                        onChange={(e) => setPieDominante(e.target.value)}
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
                            <div className={styles.field}>
                                <label className={styles.label}>Categoría</label>

                                <div className={styles.inputWrap}>
                                    <select
                                        className={styles.input}
                                        value={categoria}
                                        onChange={(e) => setCategoria(e.target.value)}
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

                        {/* ESPECIALIDAD */}
                        <div className="col-12 col-md-4">
                            <div className={styles.field}>
                                <label className={styles.label}>Especialidad</label>

                                <div className={styles.inputWrap}>
                                    <select
                                        className={styles.input}
                                        value={especialidad}
                                        onChange={(e) => setEspecialidad(e.target.value)}
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


                    <div className={styles.field}>
                        <label className={styles.label}>Fecha Debut</label>
                        <div className={styles.inputWrap}>
                            <input
                                type="date"
                                className={styles.input}
                                value={fechaDebut}
                                onChange={(e) => setFechaDebut(e.target.value)}
                            />
                        </div>
                    </div>





                    <div className="row g-3">

                        <div className="col-12 col-md-4">
                            <div className={styles.field}>
                                <label className={styles.label}>Años Experiencia</label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="number"
                                        placeholder="Años dirigiendo"
                                        className={styles.input}
                                        value={anosExperiencia}
                                        onChange={(e) => setAnosExperiencia(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className={styles.field}>
                                <label className={styles.label}>Nivel</label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="number"
                                        placeholder="1 - 100"
                                        className={styles.input}
                                        value={nivel}
                                        onChange={(e) => setNivel(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className={styles.field}>
                                <label className={styles.label}>Reputación</label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="number"
                                        placeholder="1 - 100"
                                        className={styles.input}
                                        value={reputacion}
                                        onChange={(e) => setReputacion(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* FOTO */}
                    <div className={styles.field}>
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

                    {/* BOTONES */}
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