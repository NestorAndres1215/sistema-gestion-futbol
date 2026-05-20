import { useEffect, useState } from "react";
import {
  getTotalArbitros,
  getArbitrosActivos,
  getPrecisionPromedio,
  getArbitrosPorPais,
  getArbitrosMasPartidos,
  getRolArbitral,
  getEstadoFisico,
  getDebutsPorAnio,
  getMejorNivel,
  getActivosVsRetirados,
  getEdadPromedio,
  getPromedioTarjetas,
  getTopExperiencia,
  getTopReputacion
} from "../services/arbitro.service";
type StatusColor =
  | "green"
  | "blue"
  | "purple"
  | "amber"
  | "red";
export default function useArbitroEstadisticas() {
  const [totalArbitros, setTotalArbitros] = useState<number>(0);
  const [arbitrosActivos, setArbitrosActivos] = useState<number>(0);
  const [precisionPromedio, setPrecisionPromedio] = useState<number>(0);
  const [arbitrosPorPais, setArbitrosPorPais] = useState<any[]>([]);
  const [arbitrosMasPartidos, setArbitrosMasPartidos] = useState<any[]>([]);
  const [rolArbitral, setRolArbitral] = useState<any[]>([]);
  const [estadoFisico, setEstadoFisico] = useState<any[]>([]);
  const [debutsPorAnio, setDebutsPorAnio] = useState<any[]>([]);
  const [mejorNivel, setMejorNivel] = useState<any[]>([]);
  const [activosVsRetirados, setActivosVsRetirados] = useState<any[]>([]);
  const [edadPromedio, setEdadPromedio] = useState<any>(0);
  const [promedioTarjetas, setPromedioTarjetas] = useState<any>(0);
  const [topExperiencia, setTopExperiencia] = useState<any[]>([]);
  const [topReputacion, setTopReputacion] = useState<any[]>([]);

  const fetchEstadisticas = async () => {
    try {
      const [
        totalArbitrosRes,
        arbitrosActivosRes,
        precisionPromedioRes,
        arbitrosPorPaisRes,
        arbitrosMasPartidosRes,
        rolArbitralRes,
        estadoFisicoRes,
        debutsPorAnioRes,
        mejorNivelRes,
        activosVsRetiradosRes,
        edadPromedioRes,
        promedioTarjetasRes,
        topExperienciaRes,
        topReputacionRes
      ] = await Promise.all([
        getTotalArbitros(),
        getArbitrosActivos(),
        getPrecisionPromedio(),
        getArbitrosPorPais(),
        getArbitrosMasPartidos(),
        getRolArbitral(),
        getEstadoFisico(),
        getDebutsPorAnio(),
        getMejorNivel(),
        getActivosVsRetirados(),
        getEdadPromedio(),
        getPromedioTarjetas(),
        getTopExperiencia(),
        getTopReputacion()
      ]);

      setTotalArbitros(totalArbitrosRes.total);
      setArbitrosActivos(arbitrosActivosRes.total);
      setPrecisionPromedio(precisionPromedioRes.promedio);
      setArbitrosPorPais(arbitrosPorPaisRes ?? []);
      setArbitrosMasPartidos(arbitrosMasPartidosRes ?? []);
      setRolArbitral( rolArbitralRes ?? []);
      setEstadoFisico( estadoFisicoRes ?? []);
      setDebutsPorAnio( debutsPorAnioRes ?? []);
      setMejorNivel(mejorNivelRes?.data ?? mejorNivelRes ?? []);
      console.log(estadoFisicoRes)
      setActivosVsRetirados( activosVsRetiradosRes ?? []);
      setEdadPromedio(edadPromedioRes?.data ?? edadPromedioRes);
      setPromedioTarjetas(promedioTarjetasRes?.data ?? promedioTarjetasRes);
      setTopExperiencia(topExperienciaRes?.data ?? topExperienciaRes ?? []);
      setTopReputacion(topReputacionRes?.data ?? topReputacionRes ?? []);

    } catch (error) {
      setTotalArbitros(0);
      setArbitrosActivos(0);
      setPrecisionPromedio(0);
      setArbitrosPorPais([]);
      setArbitrosMasPartidos([]);
      setRolArbitral([]);
      setEstadoFisico([]);
      setDebutsPorAnio([]);
      setMejorNivel([]);
      setActivosVsRetirados([]);
      setEdadPromedio(0);
      setPromedioTarjetas(0);
      setTopExperiencia([]);
      setTopReputacion([]);
    }
  };

  useEffect(() => {
    fetchEstadisticas();
  }, []);

  const estadoItems = estadoFisico.map((item: any) => {
  let color: StatusColor = "green";

  if (item.nombre === "Fatigado") {
    color = "amber";
  } else if (item.nombre === "Lesionado") {
    color = "red";
  } else if (item.nombre === "Retiro") {
    color = "purple";
  }

  return {
    label: item.nombre,
    value: item.valor,

    icon:
      item.nombre === "Activo"
        ? "fas fa-check-circle"
        : item.nombre === "Fatigado"
          ? "fas fa-bed"
          : item.nombre === "Lesionado"
            ? "fas fa-user-injured"
            : item.nombre === "Retiro"
              ? "fas fa-user-slash"
              : "fas fa-circle",

    color
  };
});

  return {
    totalArbitros,
    arbitrosActivos,
    precisionPromedio,
    arbitrosPorPais,
    arbitrosMasPartidos,
    rolArbitral,
    estadoFisico,
    debutsPorAnio,
    mejorNivel,
    activosVsRetirados,
    edadPromedio,
    promedioTarjetas,
    topExperiencia,
    topReputacion,estadoItems
  };
}