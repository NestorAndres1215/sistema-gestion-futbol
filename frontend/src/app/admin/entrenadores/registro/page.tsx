"use client";
import Breadcrumb from "@/components/bread-crumb/bread-cumb";
import AdminLayout from "../../layout/AdminLayout";
import styles from "./registro-entrenador.module.css"
import { useRouter } from "next/navigation";
import { useState } from "react";
import ActionButton from "@/components/button/button";
import { addEntrenador } from "@/services/entrenador.service";
export default function EntrenadorFormulario() {
    const router = useRouter();
    const [nombre, setNombre] = useState("");
    const [apellidoPaterno, setApellidoPaterno] = useState("");
    const [apellidoMaterno, setApellidoMaterno] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [paisNacimiento, setPaisNacimiento] = useState("");
    const [ciudadNacimiento, setCiudadNacimiento] = useState("");
    const [alturaCm, setAlturaCm] = useState("");
    const [pesoKg, setPesoKg] = useState("");
    const [pieDominante, setPieDominante] = useState("");
    const [estiloJuego, setEstiloJuego] = useState("");
    const [licencia, setLicencia] = useState("");
    const [fechaDebut, setFechaDebut] = useState("");
    const [salario, setSalario] = useState("");
    const [anosExperiencia, setAnosExperiencia] = useState("");
    const [nivel, setNivel] = useState("");
    const [reputacion, setReputacion] = useState("");
    const piesDominantes = [
        { value: "", label: "Selecciona pie dominante" },
        { value: "Derecho", label: "Derecho" },
        { value: "Izquierdo", label: "Izquierdo" },
    ];
    const estilosJuego = [
        { value: "", label: "Seleccionar" },
        { value: "Ofensivo", label: "Ofensivo" },
        { value: "Defensivo", label: "Defensivo" },
        { value: "Posesión", label: "Posesión" },
        { value: "Contraataque", label: "Contraataque" },
        { value: "Presión Alta", label: "Presión Alta" },
        { value: "Equilibrado", label: "Equilibrado" },
    ];
    const licencias = [
        { value: "", label: "Seleccionar" },
        { value: "Nacional", label: "Nacional" },
        { value: "CONMEBOL", label: "CONMEBOL" },
        { value: "UEFA A", label: "UEFA A" },
        { value: "UEFA Pro", label: "UEFA Pro" },
        { value: "FIFA Elite", label: "FIFA Elite" },
    ];
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
        setEstiloJuego("");
        setLicencia("");
        setFechaDebut("");
        setSalario("");
        setAnosExperiencia("");
        setNivel("");
        setReputacion("");
        setFoto(null);
    };

    const registrarArbitro = async () => {
        try {
            const formData = new FormData();

            formData.append("nombre", nombre);
            formData.append("apellidoPaterno", apellidoPaterno);
            formData.append("apellidoMaterno", apellidoMaterno);
            formData.append("fechaNacimiento", fechaNacimiento);
            formData.append("paisNacimiento", paisNacimiento);
            formData.append("ciudadNacimiento", ciudadNacimiento);
            formData.append("alturaCm", alturaCm);
            formData.append("pesoKg", pesoKg);
            formData.append("pieDominante", pieDominante);

            formData.append("estiloJuego", estiloJuego);
            formData.append("licencia", licencia);

            formData.append("fechaDebut", fechaDebut);

            formData.append("anosExperiencia", anosExperiencia);
            formData.append("nivel", nivel);
            formData.append("reputacion", reputacion);
            formData.append("salario", salario);

            if (foto) {
                formData.append("foto", foto);
            }

            await addEntrenador(formData);
            limpiarFormulario();

            router.push("/admin/entrenadores");
        } catch (error) {
            console.error(error);
        }
    };
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
                    <div className={styles.field}>
                        <label className={styles.label}>
                            Nombre
                        </label>

                        <div className={styles.inputWrap}>

                            <input
                                type="text"
                                placeholder="Nombre del estadio"
                                className={styles.input}
                                value={nombre}
                                onChange={(e) =>
                                    setNombre(e.target.value)
                                }
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

                        <div className="col-12 col-md-4">
                            <div className={styles.field}>
                                <label className={styles.label}>Estilo de Juego</label>

                                <div className={styles.inputWrap}>
                                    <select
                                        className={styles.input}
                                        value={estiloJuego}
                                        onChange={(e) => setEstiloJuego(e.target.value)}
                                    >
                                        {estilosJuego.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className={styles.field}>
                                <label className={styles.label}>Licencia</label>

                                <div className={styles.inputWrap}>
                                    <select
                                        className={styles.input}
                                        value={licencia}
                                        onChange={(e) => setLicencia(e.target.value)}
                                    >
                                        {licencias.map((item) => (
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
                        <div className="col-12 col-md-6">
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

                        </div>
                        <div className="col-12 col-md-6">

                            <div className={styles.field}>
                                <label className={styles.label}>Años de Experiencia</label>

                                <div className={styles.inputWrap}>
                                    <input
                                        type="number"
                                        placeholder="Años de Experiencia"
                                        className={styles.input}
                                        value={anosExperiencia}
                                        onChange={(e) => setAnosExperiencia((e.target.value))}
                                        min={0}
                                    />
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="row g-3">

                        <div className="col-12 col-md-4">
                            <div className={styles.field}>
                                <label className={styles.label}>Nivel</label>

                                <div className={styles.inputWrap}>
                                    <input
                                        type="number"
                                        placeholder="Nivel del entrenador"
                                        className={styles.input}
                                        value={nivel}
                                        onChange={(e) => setNivel((e.target.value))}
                                        min={0}
                                        max={100}
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
                                        placeholder="Reputación del entrenador"
                                        className={styles.input}
                                        value={reputacion}
                                        onChange={(e) => setReputacion((e.target.value))}
                                        min={0}
                                        max={100}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className={styles.field}>
                                <label className={styles.label}>Salario</label>

                                <div className={styles.inputWrap}>
                                    <input
                                        type="number"

                                        className={styles.input}
                                        value={salario}
                                        onChange={(e) => setSalario((e.target.value))}
                                        min={0}
                                        step="0.01"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
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
    )
}