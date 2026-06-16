import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { addEntrenador } from "../services/entrenador.service";
import { SwalService } from "@/shared/lib/swal/swal.service";
import { getCiudadesByPais } from "@/shared/services/ciudad.service";
import { getPaises } from "@/shared/services/paises.service";
import { getEstiloJuego, getLicenciasEntrenador } from "@/shared/services/catalogs.service";

export default function useEntrenadorRegistro() {

    const router = useRouter();
 const [estiloJuego, setEstiloJuego] = useState<any[]>([]);
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        paisNacimiento: "",
        ciudadNacimiento: "",
        estiloJuego: "",
        licencia: "",
        fechaDebut: "",
        nivel: "",
        reputacion: "",
        manejoEquipo: "",
    });

    const [foto, setFoto] = useState<File | null>(null);

    const handleChange = (key: string, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value, }));
    };

    const [paises, setPaises] = useState<any[]>([]);
    const [ciudades, setCiudades] = useState<any[]>([]);
 const [licenciaEntrenador, setLicenciaEntrenador] = useState<any[]>([]);
    useEffect(() => {

        const loadLicenciaEntrenador = async () => {

            try {
                const data = await getLicenciasEntrenador();
                setLicenciaEntrenador(Array.isArray(data) ? data : []);

            } catch (error) {
                setLicenciaEntrenador([]);
            }
        };

        loadLicenciaEntrenador();
    }, []);
    useEffect(() => {

        const loadPaises = async () => {

            try {

                const data = await getPaises();
                setPaises(Array.isArray(data) ? data : []);

            } catch (error) {
                setPaises([]);
            }

        };
        const loadEstiloJuego = async () => {
        
                    try {
                        const data = await getEstiloJuego();
                        setEstiloJuego(Array.isArray(data) ? data : []);
        
                    } catch (error) {
                        setEstiloJuego([]);
                    }
                };
loadEstiloJuego();
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
                setCiudades(Array.isArray(data) ? data : []);

            } catch (error) {
                setCiudades([]);
            }
        };

        loadCiudades();

    }, [form.paisNacimiento]);
    
    const limpiarFormulario = () => {

        setForm({
            nombre: "",
            apellido: "",
            fechaNacimiento: "",
            paisNacimiento: "",
            ciudadNacimiento: "",
            estiloJuego: "",
            licencia: "",
            fechaDebut: "",
            nivel: "",
            reputacion: "",
            manejoEquipo: "",
        });

        setFoto(null);
    };

    const estadioToFormData = (form: any, foto: File | null) => {
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, String(value));
        });

        if (foto) formData.append("Foto", foto);

        return formData;
    };

    const registrarEntrenador = async () => {

        try {

            const formData = estadioToFormData(form, foto);
            await addEntrenador(formData);
            SwalService.success("Estadio registrado exitosamente");
            limpiarFormulario();

            router.push("/admin/entrenadores");

        } catch (error: any) {

            SwalService.error(error.message);
        }
    };

    return {
        form, foto, paises, ciudades,estiloJuego,licenciaEntrenador,
        setFoto, handleChange, limpiarFormulario, registrarEntrenador,
    };
}