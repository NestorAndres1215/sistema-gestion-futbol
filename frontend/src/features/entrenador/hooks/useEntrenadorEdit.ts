import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getEntrenadorById, updateEntrenador } from "../services/entrenador.service";
import { SwalService } from "@/shared/lib/swal/swal.service";
import { formatDateInput } from "@/shared/utils/date.utils";
import { getCiudadesByPais } from "@/shared/services/ciudad.service";
import { getPaises } from "@/shared/services/paises.service";

export default function useEntrenadorEdit() {

  const params = useParams();
  const router = useRouter();

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
    motivacion: "",
    disciplina: "",
    adaptabilidad: "",
    personaId: "",
  });

  const [foto, setFoto] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [paises, setPaises] = useState<any[]>([]);
  const [ciudades, setCiudades] = useState<any[]>([]);

  useEffect(() => {

    const loadPaises = async () => {

      try {

        const data = await getPaises();
        setPaises(Array.isArray(data) ? data : []);

      } catch (error) {
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
        setCiudades(Array.isArray(data) ? data : []);

      } catch (error) {
        setCiudades([]);
      }
    };

    loadCiudades();

  }, [form.paisNacimiento]);
  useEffect(() => {

    const fetchEntrenador = async () => {

      if (!params?.id) return;

      try {
        const res = await getEntrenadorById(Number(params.id));
        if (!res) return;
        const persona = res.persona;

        setForm({
          nombre: persona.nombre ?? "",
          apellido: persona.apellido ?? "",
          fechaNacimiento: formatDateInput(persona.fechaNacimiento),
          paisNacimiento: persona.paisNacimiento?.nombre ?? "",
          ciudadNacimiento: persona.ciudadNacimiento?.nombre ?? "",
          estiloJuego: res.estiloJuego ?? "",
          licencia: res.licencia ?? "",
          fechaDebut: formatDateInput(res.fechaDebut),
          nivel: res.nivel?.toString() ?? "",
          reputacion: res.reputacion?.toString() ?? "",
          manejoEquipo: res.manejoEquipo?.toString() ?? "",
          motivacion: res.motivacion?.toString() ?? "",
          disciplina: res.disciplina?.toString() ?? "",
          adaptabilidad: res.adaptabilidad?.toString() ?? "",
          personaId: res.persona?.id?.toString() ?? "",
        });

        setFotoPreview(persona.fotoUrl ?? null);

      } catch (error) {
        console.error("Error cargando entrenador:", error);
      }
    };

    fetchEntrenador();

  }, [params?.id]);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFotoChange = (file: File | null) => {

    if (!file) return;

    setFoto(file);

    const url = URL.createObjectURL(file);
    setFotoPreview(url);
  };

  const formToFormData = (form: any, foto: File | null) => {

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    if (foto) {
      formData.append("Foto", foto);
    }

    return formData;
  };

  const actualizarEntrenador = async () => {

    try {

      const fd = formToFormData(form, foto);

      await updateEntrenador(Number(params.id), fd);

      SwalService.success("Entrenador actualizado exitosamente");

      router.push("/admin/entrenadores");

    } catch (error: any) {

      SwalService.error(error.message);
    }
  };

  return {
    form,
   
    foto,
    fotoPreview, paises, ciudades,
    handleChange,
    handleFotoChange,
    actualizarEntrenador
  };
}