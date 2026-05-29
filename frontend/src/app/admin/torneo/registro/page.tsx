"use client";

import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import AdminLayout from "@/shared/components/layout/admin/layout";
import styles from "@/shared/styles/form.module.css";
import ActionButton from "@/shared/components/ui/button/button";
import useTorneoRegistro from "@/features/torneo/hooks/useTorneoRegistro";
import { useEffect, useState } from "react";
import { GENERO_OPTIONS } from "@/shared/constants/generos.options";

export default function TorneoFormularioPage() {

    const [tipo, setTipo] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        setTipo(params.get("tipo") ?? "");
    }, []);

    const {
        categorias,
        formRef,
        limpiarFormulario,
        registrarTorneo
    } = useTorneoRegistro(tipo);

    return (
        <AdminLayout>
            <Breadcrumb
                items={[
                    { label: "Selección de Torneo", href: "/admin/torneo", },
                    { label: "Tipo de Torneo", href: `/admin/torneo/tipo-torneo?tipo=${tipo}`, },
                    { label: "Formulario" },
                ]}
            />

            <div className={styles.card}>
                <div className={styles.cardHead}>
                    <p className={styles.cardName}>
                        Formulario de {tipo}
                    </p>
                </div>

                <form ref={formRef} noValidate className={styles.form}>

                    {/* NOMBRE */}
                    <div className={styles.field}>
                        <label htmlFor="torneo-name" className={styles.label}>
                            Nombre de Torneo
                        </label>
                        <div className={styles.inputWrap}>
                            <input
                                id="torneo-name"
                                name="nombreTorneo"
                                type="text"
                                placeholder="Nombre del torneo"
                                className={styles.input}
                                required
                            />
                        </div>
                    </div>

                    {/* DESCRIPCIÓN */}
                    <div className={styles.field}>
                        <label htmlFor="torneo-descripcion" className={styles.label}>
                            Descripción
                        </label>

                        <div className={styles.inputWrap}>
                            <textarea
                                id="torneo-descripcion"
                                name="descripcion"
                                className={styles.input}
                                placeholder="Describe el torneo..."
                                rows={3}
                                required
                            />
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-12 col-sm-6 col-lg-4">
                            <div className={styles.field}>
                                <label htmlFor="torneo-genero" className={styles.label}>
                                    Género
                                </label>
                                <div className={styles.inputWrap}>
                                    <select
                                        id="torneo-genero"
                                        name="genero"
                                        className={styles.input}
                                        required
                                        defaultValue=""
                                    >
                                        <option value="">Selecciona un género</option>

                                        {GENERO_OPTIONS.map((g) => (
                                            <option key={g.value} value={g.value}>
                                                {g.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4">
                            <div className={styles.field}>
                                <label htmlFor="torneo-tipo" className={styles.label}>
                                    Tipo de Torneo
                                </label>

                                <div className={styles.inputWrap}>
                                    <select
                                        id="torneo-tipo"
                                        name="tipoTorneo"
                                        className={styles.input}
                                        required
                                        defaultValue=""
                                    >
                                        <option value="">
                                            Selecciona tipo de torneo
                                        </option>

                                        {TIPO_TORNEO_OPTIONS.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4">
                            <div className={styles.field}>
                                <label htmlFor="torneo-categoria" className={styles.label}>
                                    Categoría
                                </label>

                                <div className={styles.inputWrap}>
                                    <select
                                        id="torneo-categoria"
                                        name="categoria"
                                        className={styles.input}
                                        required
                                        defaultValue=""
                                    >
                                        <option value="">Selecciona categoría</option>

                                        {categorias.map((cat) => (
                                            <option key={cat.id} value={cat.nombre}>
                                                {cat.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-2 mt-3">

                        <div className="col-12 col-sm-6">
                            <ActionButton mode="clear" onClick={limpiarFormulario} />
                        </div>

                        <div className="col-12 col-sm-6">
                            <ActionButton mode="create" onClick={registrarTorneo} />
                        </div>

                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}