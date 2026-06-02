"use client";

import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import AdminLayout from "@/shared/components/layout/admin/layout";
import styles from "@/shared/styles/form.module.css";
import ActionButton from "@/shared/components/ui/button/button";
import useEstadioRegistro from "@/features/estadio/hooks/useEstadioRegistro";
import { TIPO_CESPED_OPTIONS } from "@/shared/constants/estadio.options";


export default function EstadioRegistroPage() {


    const {
        form, setFoto, handleChange, ciudades, paises,
        limpiarFormulario, registrarEstadio
    } = useEstadioRegistro();
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
                                onChange={(e) => handleChange("nombre", e.target.value)}
                            />

                        </div>

                    </div>

                    <div className="d-flex flex-column gap-2 w-100">

                        <label className={styles.label}>
                            Descripción
                        </label>

                        <div className={styles.inputWrap}>

                            <textarea
                                rows={3}
                                className={styles.input}
                                placeholder="Descripción"
                                value={form.descripcion}
                                onChange={(e) => handleChange("descripcion", e.target.value)}
                            />

                        </div>

                    </div>

                    <div className="row g-3">

                        <div className="col-12 col-md-6">

                            <div className="d-flex flex-column gap-2 w-100">

                                <label className={styles.label}>
                                    Fecha de Apertura
                                </label>

                                <div className={styles.inputWrap}>

                                    <input
                                        type="date"
                                        className={styles.input}
                                        value={form.fechaApertura}
                                        onChange={(e) => handleChange("fechaApertura", e.target.value)}
                                    />

                                </div>

                            </div>

                        </div>

                        <div className="col-12 col-md-6">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>
                                    Año
                                </label>

                                <div className={styles.inputWrap}>
                                    <input
                                        type="number"
                                        placeholder="Año"
                                        className={styles.input}
                                        value={form.anio}
                                        onChange={(e) => handleChange("anio", e.target.value)}
                                    />
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="row g-3">
                        <div className="col-12 col-md-6">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>
                                    País
                                </label>

                                <div className={styles.inputWrap}>

                                    <select
                                        className={styles.input}
                                        value={form.pais}
                                        onChange={(e) => handleChange("pais", e.target.value)}
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
                                <label className={styles.label}>
                                    Ciudad
                                </label>

                                <div className={styles.inputWrap}>

                                    <select
                                        className={styles.input}
                                        value={form.ciudad}
                                        onChange={(e) => handleChange("ciudad", e.target.value)}
                                        disabled={!form.pais}
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
                                <label className={styles.label}>
                                    Latitud
                                </label>

                                <div className={styles.inputWrap}>

                                    <input
                                        type="number"
                                        step="0.000001"
                                        placeholder="Latitud"
                                        className={styles.input}
                                        value={form.latitud}
                                        onChange={(e) => handleChange("latitud", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>
                                    Longitud
                                </label>
                                <div className={styles.inputWrap}>

                                    <input
                                        type="number"
                                        step="0.000001"
                                        placeholder="Longitud"
                                        className={styles.input}
                                        value={form.longitud}
                                        onChange={(e) => handleChange("longitud", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-12 col-md-6">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>
                                    Capacidad
                                </label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="number"
                                        placeholder="Capacidad"
                                        className={styles.input}
                                        value={form.capacidad}
                                        onChange={(e) => handleChange("capacidad", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>
                                    Tipo de Césped
                                </label>
                                <div className={styles.inputWrap}>
                                    <select
                                        className={styles.input}
                                        value={form.tipoCesped}
                                        onChange={(e) => handleChange("tipoCesped", e.target.value)}
                                    >
                                        <option value="">
                                            Seleccione Tipo Cesped
                                        </option>
                                        {TIPO_CESPED_OPTIONS.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}

                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-column gap-2 w-100">

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