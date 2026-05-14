import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getEstadioById,
  updateEstadio
} from "../services/estadio.service";

import { formatDateInput } from "@/shared/utils/date.utils";
import { SwalService } from "@/shared/lib/swal/swal.service";

export default function useEstadioEdit() {

  const params = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    fechaApertura: "",
    anio: "",
    ciudad: "",
    pais: "",
    latitud: "",
    longitud: "",
    capacidad: "",
    tipoCesped: "",
  });

  const [loading, setLoading] = useState(true);
  const [foto, setFoto] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);

  useEffect(() => {

    const fetchEstadio = async () => {

      if (!params?.id) return;

      try {

        setLoading(true);

        const res = await getEstadioById(Number(params.id));

        if (!res) return;

        setForm({
          nombre: res.nombre ?? "",
          descripcion: res.descripcion ?? "",
          fechaApertura: formatDateInput(res.fechaApertura),
          anio: res.anio ?? "",
          ciudad: res.ciudad ?? "",
          pais: res.pais ?? "",
          latitud: res.latitud ?? "",
          longitud: res.longitud ?? "",
          capacidad: res.capacidad ?? "",
          tipoCesped: res.tipoCesped ?? "",
        });

        setFotoPreview(res.fotoUrl ?? null);

      } catch (error) {

        console.error("Error cargando estadio:", error);

      } 

    };

    fetchEstadio();

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

  const estadioToFormData = (
    form: any,
    foto: File | null
  ) => {

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {

      formData.append(key, String(value));

    });

    if (foto) {

      formData.append("Foto", foto);

    }

    return formData;

  };

  const actualizarEstadio = async () => {

    try {

      const fd = estadioToFormData(form, foto);

      await updateEstadio(  Number(params.id),  fd);

      SwalService.success(
        "Estadio actualizado exitosamente"
      );

      router.push("/admin/estadios");

    } catch (error: any) {

      SwalService.error(error.message);

    }

  };

  return {
    form,
    loading,
    actualizarEstadio,
    foto,
    fotoPreview,
    handleChange,
    handleFotoChange,
  };

}