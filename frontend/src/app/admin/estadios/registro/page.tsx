"use client";

import { useState } from "react";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import AdminLayout from "../../../../shared/components/layout/admin/layout";
import styles from "./registro-estadio.module.css";
import ActionButton from "@/shared/components/ui/button/button";
import { addEstadio } from "@/services/estadio.service";
import { useRouter } from "next/navigation";

export default function EstadioFormulario() {
    const router = useRouter();
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fechaApertura, setFechaApertura] = useState("");
    const [anio, setAnio] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [pais, setPais] = useState("");
    const [latitud, setLatitud] = useState("");
    const [longitud, setLongitud] = useState("");
    const [capacidad, setCapacidad] = useState("");
    const [tipoCesped, setTipoCesped] = useState("");
    const [foto, setFoto] = useState<File | null>(null);

    const limpiarFormulario = () => {
        setNombre("");
        setDescripcion("");
        setFechaApertura("");
        setAnio("");
        setCiudad("");
        setPais("");
        setLatitud("");
        setLongitud("");
        setCapacidad("");
        setTipoCesped("");
        setFoto(null);
    };

    const tiposCesped = [
        { value: "", label: "Selecciona" },
        { value: "Natural", label: "Natural" },
        { value: "Sintetico", label: "Sintético" },
        { value: "Hibrido", label: "Híbrido" },
    ];

    const registrarEstadio = async () => {

        try {

            const formData = new FormData();

            formData.append("Nombre", nombre);

            formData.append("Descripcion", descripcion);

            formData.append("FechaApertura", fechaApertura);

            formData.append("Anio", anio);

            formData.append("Ciudad", ciudad);

            formData.append("Pais", pais);

            formData.append("Latitud", latitud);

            formData.append("Longitud", longitud);

            formData.append("Capacidad", String(Number(capacidad)));

            formData.append("TipoCesped", tipoCesped);

            if (foto) {
                formData.append("Foto", foto);
            }

            await addEstadio(formData);
            router.push("/admin/estadios");
        } catch (error) {

            console.error(error);

            alert("Error al registrar estadio");
        }
    };

    return (
        <AdminLayout pageTitle="Estadios" pageSubtitle="Mantenimiento">

            <Breadcrumb
                items={[
                    { label: "Estadios", href: "/admin/estadios" },
                    { label: "Formulario" },
                ]} />

            <div className={styles.card}>

                <div className={styles.cardHead}>
                    <p className={styles.cardName}>
                        Formulario de Estadios
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

                    <div className={styles.field}>

                        <label className={styles.label}>
                            Descripción
                        </label>

                        <div className={styles.inputWrap}>

                            <textarea
                                rows={3}
                                className={styles.input}
                                placeholder="Descripción"
                                value={descripcion}
                                onChange={(e) =>
                                    setDescripcion(e.target.value)
                                }
                            />

                        </div>

                    </div>

                    <div className={styles.field}>

                        <label className={styles.label}>
                            Fecha de Apertura
                        </label>

                        <div className={styles.inputWrap}>

                            <input
                                type="date"
                                className={styles.input}
                                value={fechaApertura}
                                onChange={(e) =>
                                    setFechaApertura(e.target.value)
                                }
                            />

                        </div>
                    </div>

                    <div className={styles.field}>

                        <label className={styles.label}>
                            Año
                        </label>

                        <div className={styles.inputWrap}>

                            <input
                                type="number"
                                placeholder="Año"
                                className={styles.input}
                                value={anio}
                                onChange={(e) =>
                                    setAnio(e.target.value)
                                }
                            />

                        </div>

                    </div>

                    <div className={styles.field}>

                        <label className={styles.label}>
                            Ciudad
                        </label>

                        <div className={styles.inputWrap}>

                            <input
                                type="text"
                                placeholder="Ciudad"
                                className={styles.input}
                                value={ciudad}
                                onChange={(e) =>
                                    setCiudad(e.target.value)
                                }
                            />

                        </div>

                    </div>

                    <div className={styles.field}>

                        <label className={styles.label}>
                            País
                        </label>

                        <div className={styles.inputWrap}>

                            <select
                                className={styles.input}
                                value={pais}
                                onChange={(e) =>
                                    setPais(e.target.value)
                                }
                            >

                                <option value="">
                                    Selecciona un país
                                </option>

                                <option value="Perú">
                                    Perú
                                </option>

                                <option value="Argentina">
                                    Argentina
                                </option>

                                <option value="Brasil">
                                    Brasil
                                </option>

                                <option value="Uruguay">
                                    Uruguay
                                </option>

                                <option value="Chile">
                                    Chile
                                </option>

                            </select>

                        </div>

                    </div>

                    <div className={styles.field}>

                        <label className={styles.label}>
                            Latitud
                        </label>

                        <div className={styles.inputWrap}>

                            <input
                                type="number"
                                step="0.000001"
                                placeholder="Latitud"
                                className={styles.input}
                                value={latitud}
                                onChange={(e) =>
                                    setLatitud(e.target.value)
                                }
                            />

                        </div>

                    </div>

                    <div className={styles.field}>

                        <label className={styles.label}>
                            Longitud
                        </label>

                        <div className={styles.inputWrap}>

                            <input
                                type="number"
                                step="0.000001"
                                placeholder="Longitud"
                                className={styles.input}
                                value={longitud}
                                onChange={(e) =>
                                    setLongitud(e.target.value)
                                }
                            />

                        </div>

                    </div>

                    <div className={styles.field}>

                        <label className={styles.label}>
                            Capacidad
                        </label>

                        <div className={styles.inputWrap}>

                            <input
                                type="number"
                                placeholder="Capacidad"
                                className={styles.input}
                                value={capacidad}
                                onChange={(e) =>
                                    setCapacidad(e.target.value)
                                }
                            />

                        </div>

                    </div>

                    <div className={styles.field}>

                        <label className={styles.label}>
                            Tipo de Césped
                        </label>

                        <div className={styles.inputWrap}>

                            <select
                                className={styles.input}
                                value={tipoCesped}
                                onChange={(e) => setTipoCesped(e.target.value)}
                            >
                                {tiposCesped.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>

                        </div>

                    </div>

                    <div className={styles.field}>

                        <label className={styles.label}>
                            Foto
                        </label>

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
                            <ActionButton mode="create" onClick={registrarEstadio} />
                        </div>

                    </div>
                </form>

            </div>

        </AdminLayout>
    );
}