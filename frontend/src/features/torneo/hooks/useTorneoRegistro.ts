
import { useRouter } from "next/navigation";
import { Categoria } from "@/features/categoria/types/categoria.types";
import { getCategories } from "@/features/categoria/services/categoria.service";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { addTorneo } from "../services/torneo.service";

export default function useTorneoRegistro() {

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

    return{ categorias,tipo,formRef,limpiarFormulario, registrarTorneo }
}