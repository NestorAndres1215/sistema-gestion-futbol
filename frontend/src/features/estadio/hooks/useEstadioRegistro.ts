"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addEstadio } from "../services/estadio.service";
import { SwalService } from "@/shared/lib/swal/swal.service";

export default function useEstadioRegistro() {
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

  const [foto, setFoto] = useState<File | null>(null);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const limpiarFormulario = () => {
    setForm({
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
    setFoto(null);
  };

  const estadioToFormData = (form: any, foto: File | null) => {
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

  const registrarEstadio = async () => {
    try {
      const fd = estadioToFormData(form, foto);

      await addEstadio(fd);

      SwalService.success("Estadio registrado exitosamente");
      router.push("/admin/estadios");
    }
    catch (error: any) {
      SwalService.error(error.message);
    }

  };

  return {
    form,
    foto,
    setFoto,
    handleChange,
    limpiarFormulario,
    registrarEstadio,
  };
}