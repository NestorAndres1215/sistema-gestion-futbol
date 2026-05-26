import { getPaises } from "@/shared/services/paises.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { addSelecciones, getSeleccionByNombre } from "../services/selecciones.service";
import { SwalService } from "@/shared/lib/swal/swal.service";

export default function useEntrenadorRegistro() {
    const router = useRouter();

    const [form, setForm] = useState({
        nombre: "",
        confederacion: "",
        seudonimo: "",
        codigoFIFA: "",
    });

    const [bandera, setBandera] = useState<File | null>(null);
    const [escudo, setEscudo] = useState<File | null>(null);

    const handleChange = (key: string, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value, }));
    };

    const limpiarFormulario = () => {

        setForm({
            nombre: "",//PERU
            confederacion: "",//PERU
            seudonimo: "",//BLANQUIRROJA
            codigoFIFA: "",//PER
        });

        setBandera(null);
        setEscudo(null)
    };
    const [paises, setPaises] = useState<any[]>([]);

    useEffect(() => {

        const loadPaises = async () => {

            try {

                const data = await getPaises();

                const filtrados = await Promise.all(

                    data.map(async (pais: any) => {

                        try {

                            const seleccion = await getSeleccionByNombre(pais.nombre);
                            if (seleccion?.id) {
                                return null;
                            }
                            return pais;

                        } catch {
                            return pais;
                        }

                    })

                );

                setPaises(filtrados.filter(Boolean));

            } catch {
                setPaises([]);
            }
        };

        loadPaises();

    }, []);
    const seleccionToFormData = (form: any, bandera: File | null, escudo: File | null) => {

        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, String(value));
        });

        if (bandera) {
            formData.append("Bandera", bandera);
        }

        if (escudo) {
            formData.append("Escudo", escudo);
        }

        return formData;
    };

    const registrarSeleccion = async () => {

        try {

            const fd = seleccionToFormData(form, bandera, escudo);

            await addSelecciones(fd);

            SwalService.success("Selección registrada exitosamente");

            router.push("/admin/selecciones");

        } catch (error: any) {

            SwalService.error(error.message);

        }

    };
    return {
        registrarSeleccion, setBandera, setEscudo,
        handleChange, limpiarFormulario,
        paises, form
    }
}