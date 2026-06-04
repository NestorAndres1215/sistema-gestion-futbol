import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSeleccionByNombre, updateSelecciones } from "../services/selecciones.service";
import { SwalService } from "@/shared/lib/swal/swal.service";

export default function useSeleccionesEdit() {
    const params = useParams();
    const router = useRouter();

    const [form, setForm] = useState({
        id: "",
        nombre: "",
        confederacion: "",
        clave: "",
        codigoFifa: "",
        pais: "",
        estado: "",
    });

    const [fotoBandera, setFotoBandera] = useState<File | null>(null);
    const [fotoBanderaPreview, setFotoBanderaPreview] = useState<string | null>(null);
    const [fotoEscudo, setFotoEscudo] = useState<File | null>(null);
    const [fotoEscudoPreview, setFotoEscudoPreview] = useState<string | null>(null);

    useEffect(() => {

        const fetchSeleccion = async () => {

            if (!params?.id) return;
            console.log(params.id);
            const res = await getSeleccionByNombre(String(params.id));
            console.log(res);
            if (!res) return;

            setForm({
                id: res.id ?? "",
                nombre: res.nombre ?? "",
                confederacion: res.confederacion ?? "",
                clave: res.clave ?? "",
                codigoFifa: res.codigoFIFA ?? "",
                pais: res.pais ?? "",
                estado: res.estado ?? "",
            });

            setFotoBanderaPreview(res.banderaUrl ?? null);
            setFotoEscudoPreview(res.escudoUrl ?? null);

        };

        fetchSeleccion();

    }, [params?.id]);

    const handleChange = (key: string, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value, }));
    };

    const handleFotoBanderaChange = (file: File | null) => {
        if (!file) return;
        setFotoBandera(file);
        const url = URL.createObjectURL(file);
        setFotoBanderaPreview(url);
    };

    const handleFotoEscudoChange = (file: File | null) => {
        if (!file) return;
        setFotoEscudo(file);
        const url = URL.createObjectURL(file);
        setFotoEscudoPreview(url);
    };


    const seleccionToFormData = (form: any, fotoBandera: File | null, fotoEscudo: File | null) => {

        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, String(value));
        });

        if (fotoBandera) {
            formData.append("Bandera", fotoBandera);
        }

        if (fotoEscudo) {
            formData.append("Escudo", fotoEscudo);
        }

        return formData;
    };

    const actualizarSeleccion = async () => {
        try {
            const fd = seleccionToFormData(form, fotoBandera, fotoEscudo);
            await updateSelecciones(Number(form.id), fd);
            SwalService.success("Seleccion actualizada exitosamente");
            router.push("/admin/selecciones");

        } catch (error: any) {
            SwalService.error(error.message);
        }

    };

    return {
        actualizarSeleccion, handleChange, handleFotoBanderaChange, handleFotoEscudoChange,
        form, fotoBanderaPreview, fotoEscudoPreview,
    }
}