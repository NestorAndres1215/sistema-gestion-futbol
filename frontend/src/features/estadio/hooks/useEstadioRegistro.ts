"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { addEstadio } from "../services/estadio.service";
import { SwalService } from "@/shared/lib/swal/swal.service";
import { getCiudadesByPais } from "@/shared/services/ciudad.service";
import { getPaises } from "@/shared/services/paises.service";
import { getEstadoEstadio, getTipoCesped } from "@/shared/services/catalogs.service";

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
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

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

  const [paises, setPaises] = useState<any[]>([]);
  const [ciudades, setCiudades] = useState<any[]>([]);
  const [tipoCesped, setTipoCesped] = useState<any[]>([]);


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

      if (!form.pais) {
        setCiudades([]);
        return;
      }

      try {
        const data = await getCiudadesByPais(form.pais);
        setCiudades(Array.isArray(data) ? data : []);
      } catch (error) {
        setCiudades([]);
      }
    };
    const fetchEstadoEstadio = async () => {
      try {
        const res = await getTipoCesped();
        const lista = res?.data ?? res;
        setTipoCesped(Array.isArray(lista) ? lista : []);
      } catch (error) {
        setTipoCesped([]);
      }
    };

    loadCiudades();
    fetchEstadoEstadio();
  }, [form.pais]);



  return {
    paises, ciudades, form, foto, tipoCesped,
    setFoto, handleChange, limpiarFormulario, registrarEstadio,
  };
}