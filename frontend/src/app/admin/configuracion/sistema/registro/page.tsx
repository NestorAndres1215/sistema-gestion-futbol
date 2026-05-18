"use client";

import useSistemaRegistro from "@/features/configuracion/hooks/useSistemaRegistro";
import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import ActionButton from "@/shared/components/ui/button/button";
import { CATEGORIA_PARAMETROS_OPTIONS } from "@/shared/constants/categoria.options";
import { TIPO_DATO_OPTIONS } from "@/shared/constants/tipo-dato.options";
import styles from "@/shared/styles/form.module.css";

export default function RegistroSistem() {

    const { registrarArbitro, handleChange, limpiarFormulario, form } = useSistemaRegistro();
    return (
        <AdminLayout>
            <Breadcrumb
                items={[
                    { label: "Configuracion", href: "/admin/configuracion" },
                    { label: "Parametros de Sistema", href: "/admin/configuracion/sistema" },
                    { label: "Formulario" },
                ]}
            />
            <div className={styles.card}>
                <div className={styles.cardHead}>
                    <p className={styles.cardName}>
                        Formulario de Parametros
                    </p>
                </div>

                <form noValidate className={styles.form}>
                    <div className="row g-3">
                        <div className="col-12 col-md-4">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>Nombre</label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="text"
                                        placeholder="Nombre del árbitro"
                                        className={styles.input}
                                        value={form.nombre}
                                        onChange={(e) => handleChange("nombre", e.target.value)}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="col-12 col-md-4">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>Clave </label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="text"
                                        placeholder="Clave"
                                        className={styles.input}
                                        value={form.clave}
                                        onChange={(e) => handleChange("clave", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>Valor </label>
                                <div className={styles.inputWrap}>
                                    <input
                                        type="text"
                                        placeholder="Valor"
                                        className={styles.input}
                                        value={form.valor}
                                        onChange={(e) => handleChange("valor", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>
                                    Descripción
                                </label>

                                <div className={styles.inputWrap}>

                                    <input
                                        
                                        className={styles.input}
                                        placeholder="Descripción"
                                        value={form.descripcion}
                                        onChange={(e) => handleChange("descripcion", e.target.value)}
                                    />

                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>Tipo de Datos</label>
                                <div className={styles.inputWrap}>
                                    <select
                                        className={styles.input}
                                        value={form.tipoDato}
                                        onChange={(e) => handleChange("tipoDato", e.target.value)}
                                    >
                                        <option value="">
                                            Seleccione un tipo de datos
                                        </option>

                                        {TIPO_DATO_OPTIONS.map((item) => (
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
                                <label className={styles.label}>Categoria </label>
                                <div className={styles.inputWrap}>
                                         <select
                                        className={styles.input}
                                        value={form.categoria}
                                        onChange={(e) => handleChange("categoria", e.target.value)}
                                    >
                                        <option value="">
                                            Seleccione un categoria
                                        </option>

                                        {CATEGORIA_PARAMETROS_OPTIONS.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
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
                            <ActionButton mode="create" onClick={registrarArbitro} />
                        </div>
                    </div>
                </form>
            </div>


        </AdminLayout>
    )
}