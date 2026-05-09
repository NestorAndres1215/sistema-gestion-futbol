"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import Breadcrumb from "@/components/bread-crumb/bread-cumb";
import AdminLayout from "../../layout/AdminLayout";
import styles from "./registro-torneo.module.css";

import { getCategories } from "@/services/categoria.service";
import ActionButton from "@/components/button/button";

import { addTorneo } from "@/services/torneo.service";


import { useRouter } from "next/navigation";
type Categoria = {
    id: number;
    nombre: string;
    descripcion: string;
    fechaCreacion: string;
};


export default function TorneoFormulario() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tipo = searchParams.get("tipo");


    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const formRef = useRef<HTMLFormElement>(null);
    useEffect(() => {
        const loadCategories = async () => {
            try {

                const data = await getCategories();
                setCategorias(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error(error);
                setCategorias([]);
            }
        };

        loadCategories();
    }, []);
    const limpiarFormulario = () => {
        formRef.current?.reset();
    };

    const registrarTorneo = async () => {
        const form = formRef.current;
        if (!form) return;

        const data = new FormData(form);

        const getCookie = (name: string) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(";").shift();
            return null;
        };

        const rawUser = getCookie("user");
        const payload = {
            nombre: String(data.get("nombreTorneo") || ""),
            descripcion: String(data.get("descripcion") || ""),
            genero: String(data.get("genero") || ""),
            tipoParticipante: tipo,
            tipo: String(data.get("tipoTorneo") || ""),
            categoria: String(data.get("categoria") || ""),
            estado: "Activo",
            creado: rawUser
        };

        await addTorneo(payload);
        router.push("/admin/torneo");
    };
    return (
        <AdminLayout>
            <Breadcrumb
                items={[
                    {
                        label: "Selección de Torneo",
                        href: "/admin/torneo",
                    },
                    {
                        label: "Tipo de Torneo",
                        href: `/admin/torneo/tipo-torneo?tipo=${tipo}`,
                    },
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

                    {/* GÉNERO */}
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
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                            </select>
                        </div>
                    </div>

                    {/* TIPO DE TORNEO */}
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

                                <option value="copa_nacional">Copa Nacional</option>
                                <option value="copa_internacional">Copa Internacional</option>
                                <option value="ligas">Ligas</option>
                                <option value="temporada">Temporada</option>
                            </select>
                        </div>
                    </div>

                    {/* CATEGORÍAS (DINÁMICO DESDE BACKEND) */}
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