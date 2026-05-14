import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getEntrenadorById, updateEntrenador } from "../services/entrenador.service";
import { SwalService } from "@/shared/lib/swal/swal.service";
import { formatDateInput } from "@/shared/utils/date.utils";

export default function useEntrenadorEdit() {

  const params = useParams();
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
    personaId: "",
  });

  const [loading, setLoading] = useState(true);
  const [foto, setFoto] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);

  useEffect(() => {

    const fetchEntrenador = async () => {

      if (!params?.id) return;

      try {
        const res = await getEntrenadorById(Number(params.id));
        if (!res) return;
        const persona = res.persona;

        setForm({
          nombre: persona.nombre ?? "",
          apellidoPaterno: persona.apellidoPaterno ?? "",
          apellidoMaterno: persona.apellidoMaterno ?? "",
          fechaNacimiento: formatDateInput(persona.fechaNacimiento),
          paisNacimiento: persona.paisNacimiento.nombre ?? "",
          ciudadNacimiento: persona.ciudadNacimiento?.nombre ?? "",
          alturaCm: persona.alturaCm?.toString() ?? "",
          pesoKg: persona.pesoKg?.toString() ?? "",
          pieDominante: persona.pieDominante ?? "",
          estiloJuego: res.estiloJuego ?? "",
          licencia: res.licencia ?? "",
          fechaDebut: formatDateInput(res.fechaDebut),
          salario: res.salario?.toString() ?? "",
          anosExperiencia: res.anosExperiencia?.toString() ?? "",
          nivel: res.nivel?.toString() ?? "",
          reputacion: res.reputacion?.toString() ?? "",
          personaId: res.persona.id,
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
    loading,
    foto,
    fotoPreview,
    handleChange,
    handleFotoChange,
    actualizarEntrenador
  };
}