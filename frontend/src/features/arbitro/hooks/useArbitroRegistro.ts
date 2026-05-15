import { useEffect, useState } from "react";
import { addArbitro } from "../services/arbitro.service";
import { SwalService } from "@/shared/lib/swal/swal.service";
import { useRouter } from "next/navigation";
import { getPaises } from "@/shared/services/paises.service";
import { getCiudadesByPais } from "@/shared/services/ciudad.service";

export default function useArbitroRegistro() {
    const router = useRouter();
    const piesDominantes = [
        { value: "", label: "Selecciona pie dominante" },
        { value: "Derecho", label: "Derecho" },
        { value: "Izquierdo", label: "Izquierdo" },
    ];



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
        categoria: "",
        especialidad: "",
        fechaDebut: "",
        fechaRetiro: "",
        anosExperiencia: "",
        nivel: "",
        reputacion: "",
    });


    const [paises, setPaises] = useState<any[]>([]);
    const [ciudades, setCiudades] = useState<any[]>([]);
    useEffect(() => {

        const loadPaises = async () => {

            try {

                const data = await getPaises();

                setPaises(
                    Array.isArray(data) ? data : []
                );

            } catch (error) {

                console.error(error);

                setPaises([]);

            }

        };

        loadPaises();

    }, []);
    useEffect(() => {

        const loadCiudades = async () => {

            if (!form.paisNacimiento) {
                setCiudades([]);
                return;
            }

            try {

                const data = await getCiudadesByPais(form.paisNacimiento);

                setCiudades(
                    Array.isArray(data) ? data : []
                );

            } catch (error) {

                console.error(error);

                setCiudades([]);

            }

        };

        loadCiudades();

    }, [form.paisNacimiento]);


    const [foto, setFoto] = useState<File | null>(null);
    const handleChange = (key: string, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
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
            categoria: "",
            especialidad: "",
            fechaDebut: "",
            fechaRetiro: "",
            anosExperiencia: "",
            nivel: "",
            reputacion: "",
        });

        setFoto(null);
    }

    const arbitroToFormData = (form: any, foto: File | null) => {
        const formData = new FormData();
        Object.entries(form).forEach(
            ([key, value]) => {
                formData.append(
                    key,
                    String(value)
                );
            }
        );

        if (foto) formData.append("Foto", foto);

        return formData;
    };

    const registrarArbitro = async () => {
        try {
            const fd = arbitroToFormData(form, foto);

            await addArbitro(fd);

            SwalService.success("Árbitro registrado exitosamente");
            router.push("/admin/arbitros");
        }
        catch (error: any) {
            SwalService.error(error.message);
        }

    };

    return {
        piesDominantes,
        ciudades,
        paises,

        limpiarFormulario,
        registrarArbitro,
        form,
        handleChange,
        setForm,
        foto,
        setFoto,
    }

}