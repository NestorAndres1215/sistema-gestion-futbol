import { useRouter } from "next/navigation";
import { useState } from "react";
import { addParametros } from "../services/parametros.service";
import { SwalService } from "@/shared/lib/swal/swal.service";

export default function useSistemaRegistro() {
    const router = useRouter();

    const [form, setForm] = useState({
        clave: "",
        valor: "",
        nombre: "",
        descripcion: "",
        categoria: "",
        tipoDato: "",
    });

    const handleChange = (key: string, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const limpiarFormulario = () => {
        setForm({
            clave: "",
            valor: "",
            nombre: "",
            descripcion: "",
            categoria: "",
            tipoDato: "",
        });
    }


    const registrarArbitro = async () => {
        try {

            await addParametros(form);

            SwalService.success("Árbitro registrado exitosamente");
            router.push("/admin/configuracion/sistema");
        }
        catch (error: any) {
            SwalService.error(error.message);
        }

    };


    return {
        registrarArbitro, handleChange, limpiarFormulario, form
    }
}