"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getArbitroById } from "../services/arbitro.service";

export default function useArbitroEdit() {
  const params = useParams();
  const router = useRouter();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [foto, setFoto] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string>("");

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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchArbitro = async () => {
      try {
        if (!id) return;

        const res = await getArbitroById(Number(id));

        setForm({
          nombre: res.nombre ?? "",
          apellidoPaterno: res.apellidoPaterno ?? "",
          apellidoMaterno: res.apellidoMaterno ?? "",
          fechaNacimiento: res.fechaNacimiento ?? "",
          paisNacimiento: res.paisNacimiento ?? "",
          ciudadNacimiento: res.ciudadNacimiento ?? "",
          alturaCm: res.alturaCm ?? "",
          pesoKg: res.pesoKg ?? "",
          pieDominante: res.pieDominante ?? "",
          categoria: res.categoria ?? "",
          especialidad: res.especialidad ?? "",
          fechaDebut: res.fechaDebut ?? "",
          fechaRetiro: res.fechaRetiro ?? "",
          anosExperiencia: res.anosExperiencia ?? "",
          nivel: res.nivel ?? "",
          reputacion: res.reputacion ?? "",
        });

        setFotoPreview(res.foto ?? "");
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
    setFoto(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    form,
    foto,
    fotoPreview,
    handleFotoChange,
    handleChange,
    loading,
    saving,
    router,
    id,
  };
}