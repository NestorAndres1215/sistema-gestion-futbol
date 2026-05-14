"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getArbitroById, updateArbitro } from "../services/arbitro.service";
import { formatDateInput } from "@/shared/utils/date.utils";
import { SwalService } from "@/shared/lib/swal/swal.service";

export default function useArbitroEdit() {
  const params = useParams();
  const router = useRouter();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;


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
    personaId: "",
  });

  const [loading, setLoading] = useState(true);
  const [foto, setFoto] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);


  useEffect(() => {
    const fetchArbitro = async () => {
      try {
        if (!id) return;

        const res = await getArbitroById(Number(id));
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
          categoria: res.categoria ?? "",
          especialidad: res.especialidad ?? "",
          fechaDebut: formatDateInput(res.fechaDebut),
          fechaRetiro: res.fechaRetiro ?? "",
          anosExperiencia: res.anosExperiencia ?? "",
          nivel: res.nivel ?? "",
          reputacion: res.reputacion ?? "",
          personaId: res.persona.id,
        });

        setFotoPreview(persona.fotoUrl ?? null);
      } finally {
        setLoading(false);
      }
    };

    fetchArbitro();
  }, [id]);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
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

  const actualizarArbitro = async () => {
    try {

      const fd = formToFormData(form, foto);

      await updateArbitro(Number(params.id), fd);

      SwalService.success("Arbitro actualizado exitosamente");

      router.push("/admin/arbitros");

    } catch (error: any) {

      SwalService.error(error.message);
    }
  }
  return {
    form,
    foto,
    fotoPreview,
    handleFotoChange,
    handleChange,
    loading,
    actualizarArbitro,
    router,
    id,
  };
}