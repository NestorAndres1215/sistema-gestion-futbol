import { useRouter } from "next/navigation";
import { useState } from "react";

import { addEntrenador } from "../services/entrenador.service";
import { SwalService } from "@/shared/lib/swal/swal.service";

export default function useEntrenadorRegistro() {

    const router = useRouter();

    const [form, setForm] = useState({
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        fechaNacimiento: "",
        paisNacimiento: "",
        ciudadNacimiento: "",
        alturaCm: "",
        pesoKg: "",
        pieDominante: "",
        estiloJuego: "",
        licencia: "",
        fechaDebut: "",
        salario: "",
        anosExperiencia: "",
        nivel: "",
        reputacion: "",
    });

    const [foto, setFoto] = useState<File | null>(null);

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

    const handleChange = (
        key: string,
        value: any
    ) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const limpiarFormulario = () => {

        setForm({
            nombre: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
            fechaNacimiento: "",
            paisNacimiento: "",
            ciudadNacimiento: "",
            alturaCm: "",
            pesoKg: "",
            pieDominante: "",
            estiloJuego: "",
            licencia: "",
            fechaDebut: "",
            salario: "",
            anosExperiencia: "",
            nivel: "",
            reputacion: "",
        });

        setFoto(null);
    };

    const registrarEntrenador = async () => {

        try {

            const formData = new FormData();

            Object.entries(form).forEach(
                ([key, value]) => {
                    formData.append(
                        key,
                        String(value)
                    );
                }
            );

            
            if (foto) {
                formData.append("Foto", foto);
            }

            await addEntrenador(formData);
            SwalService.success("Estadio registrado exitosamente");
            limpiarFormulario();

            router.push("/admin/entrenadores");

        } catch (error: any) {

            SwalService.error(error.message);
        }
    };

    return {
        form,
        foto,
        setFoto,
        handleChange,
        limpiarFormulario,
        registrarEntrenador,
        piesDominantes,
        estilosJuego,
        licencias,
    };
}