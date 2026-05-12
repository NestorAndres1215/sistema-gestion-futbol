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
    const fd = new FormData();
    console.log(form);
    fd.append("Nombre", form.nombre);
    fd.append("Descripcion", form.descripcion);
    fd.append("FechaApertura", form.fechaApertura);

    fd.append("Anio", String(Number(form.anio)));
    fd.append("Ciudad", form.ciudad);
    fd.append("Pais", form.pais);

    fd.append("Latitud", String(Number(form.latitud)));
    fd.append("Longitud", String(Number(form.longitud)));
    fd.append("Capacidad", String(Number(form.capacidad)));

    fd.append("TipoCesped", form.tipoCesped);

    if (foto) fd.append("Foto", foto);

    return fd;
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