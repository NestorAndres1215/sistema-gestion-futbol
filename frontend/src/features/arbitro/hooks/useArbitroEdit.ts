"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getArbitroById, updateArbitro } from "../services/arbitro.service";
import { formatDateInput } from "@/shared/utils/date.utils";
import { SwalService } from "@/shared/lib/swal/swal.service";
import { getCiudadesByPais } from "@/shared/services/ciudad.service";
import { getPaises } from "@/shared/services/paises.service";

export default function useArbitroEdit() {
  const params = useParams();
  const router = useRouter();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;


  const [form, setForm] = useState({
    nombre: "",
    apellido: "",

    fechaNacimiento: "",
    paisNacimiento: "",
    ciudadNacimiento: "",
    partidosDirigidos: "",
    precisionDecisiones: "",
    tarjetasAmarillas: "",
    tarjetasRojas: "",
    categoria: "",
    rolArbitral: "",
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
        console.log(res)
        setForm({
          nombre: persona.nombre ?? "",
          apellido: persona.apellido ?? "",
          fechaNacimiento: formatDateInput(persona.fechaNacimiento),
          paisNacimiento: persona.paisNacimiento.nombre ?? "",
          ciudadNacimiento: persona.ciudadNacimiento?.nombre ?? "",
          partidosDirigidos:res.partidosDirigidos ?? "",
          precisionDecisiones: res.precisionDecisiones ?? "",
          tarjetasAmarillas:res.tarjetasAmarrillas ?? "", 
          tarjetasRojas: res.tarjetasRojas??"",
          categoria: res.categoria ?? "",
          rolArbitral: res.rolArbitral ?? "",
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
    fotoPreview, paises, ciudades,
    handleFotoChange,
    handleChange,
    loading,
    actualizarArbitro,
    router,
    id,
  };
}