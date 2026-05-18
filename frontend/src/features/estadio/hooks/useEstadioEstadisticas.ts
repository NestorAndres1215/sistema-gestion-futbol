import { useEffect, useState } from "react";
type StatusColor =
  | "green"
  | "blue"
  | "purple"
  | "amber"
  | "red";
import {
  getCiudadesMasEstadios,
  getCiudadesMenosEstadios,
  getDistribucionEstado,
  getEstadiosMasAntiguos,
  getEstadiosMasNuevos,
  getMayorCapacidad,
  getMenorCapacidad,
  getPaisesMasEstadios,
  getPaisesMenosEstadios,
  getPromedioCapacidad,
  getTiposCesped,
  getTotalEstadios,
  getTotalPaises
} from "../services/estadio.service";

export default function useEstadioEstadisticas() {
  const [totalEstadios, setTotalEstadios] = useState<number>(0);
  const [promedioCapacidad, setPromedioCapacidad] = useState<number>(0);
  const [totalPaises, setTotalPaises] = useState<number>(0);

  const [paisesMasEstadios, setPaisesMasEstadios] = useState<any[]>([]);
  const [paisesMenosEstadios, setPaisesMenosEstadios] = useState<any[]>([]);

  const [ciudadesMasEstadios, setCiudadesMasEstadios] = useState<any[]>([]);
  const [ciudadesMenosEstadios, setCiudadesMenosEstadios] = useState<any[]>([]);

  const [estadiosMayorCapacidad, setEstadiosMayorCapacidad] = useState<any[]>([]);
  const [estadiosMenorCapacidad, setEstadiosMenorCapacidad] = useState<any[]>([]);

  const [estadiosMasAntiguos, setEstadiosMasAntiguos] = useState<any[]>([]);
  const [estadiosMasNuevos, setEstadiosMasNuevos] = useState<any[]>([]);

  const [distribucionEstado, setDistribucionEstado] = useState<any[]>([]);
  const [tiposCesped, setTiposCesped] = useState<any[]>([]);

  const fetchEstadisticas = async () => {
    try {
      const [
        totalEstadiosRes,
        promedioCapacidadRes,
        totalPaisesRes,

        paisesMasRes,
        paisesMenosRes,

        ciudadesMasRes,
        ciudadesMenosRes,

        mayorCapacidadRes,
        menorCapacidadRes,

        estadiosAntiguosRes,
        estadiosNuevosRes,

        distribucionEstadoRes,
        tiposCespedRes
      ] = await Promise.all([
        getTotalEstadios(),
        getPromedioCapacidad(),
        getTotalPaises(),

        getPaisesMasEstadios(5),
        getPaisesMenosEstadios(5),

        getCiudadesMasEstadios(5),
        getCiudadesMenosEstadios(5),

        getMayorCapacidad(5),
        getMenorCapacidad(5),

        getEstadiosMasAntiguos(5),
        getEstadiosMasNuevos(5),

        getDistribucionEstado(),
        getTiposCesped()
      ]);

      const totalEstadiosData =
        totalEstadiosRes?.data ?? totalEstadiosRes;

      const promedioCapacidadData =
        promedioCapacidadRes?.data ?? promedioCapacidadRes;

      const totalPaisesData =
        totalPaisesRes?.data ?? totalPaisesRes;

      setTotalEstadios(totalEstadiosData.total || 0);

      setPromedioCapacidad(
        promedioCapacidadData.promedio || 0
      );

      setTotalPaises(totalPaisesData.total || 0);

      setPaisesMasEstadios(
        paisesMasRes?.data ?? paisesMasRes ?? []
      );

      setPaisesMenosEstadios(
        paisesMenosRes?.data ?? paisesMenosRes ?? []
      );

      setCiudadesMasEstadios(
        ciudadesMasRes?.data ?? ciudadesMasRes ?? []
      );

      setCiudadesMenosEstadios(
        ciudadesMenosRes?.data ?? ciudadesMenosRes ?? []
      );

      setEstadiosMayorCapacidad(
        mayorCapacidadRes?.data ?? mayorCapacidadRes ?? []
      );

      setEstadiosMenorCapacidad(
        menorCapacidadRes?.data ?? menorCapacidadRes ?? []
      );

      setEstadiosMasAntiguos(
        estadiosAntiguosRes?.data ?? estadiosAntiguosRes ?? []
      );

      setEstadiosMasNuevos(
        estadiosNuevosRes?.data ?? estadiosNuevosRes ?? []
      );

      setDistribucionEstado(
        distribucionEstadoRes?.data ??
        distribucionEstadoRes ??
        []
      );

      setTiposCesped(
        tiposCespedRes?.data ??
        tiposCespedRes ??
        []
      );
    } catch (error) {
      setTotalEstadios(0);
      setPromedioCapacidad(0);
      setTotalPaises(0);

      setPaisesMasEstadios([]);
      setPaisesMenosEstadios([]);

      setCiudadesMasEstadios([]);
      setCiudadesMenosEstadios([]);

      setEstadiosMayorCapacidad([]);
      setEstadiosMenorCapacidad([]);

      setEstadiosMasAntiguos([]);
      setEstadiosMasNuevos([]);

      setDistribucionEstado([]);
      setTiposCesped([]);
    }
  };

  useEffect(() => {
    fetchEstadisticas();
  }, []);

const estadoItems = distribucionEstado.map((item: any) => {
  let color: StatusColor = "green";

  if (item.nombre === "Mantenimiento") {
    color = "amber";
  } else if (item.nombre === "Suspendido") {
    color = "purple";
  } else if (item.nombre === "Remodelación") {
    color = "blue";
  } else if (item.nombre === "Cerrado") {
    color = "red";
  }

  return {
    label: item.nombre,
    value: item.valor,

    icon:
      item.nombre === "Disponible"
        ? "fas fa-check-circle"
        : item.nombre === "Mantenimiento"
          ? "fas fa-tools"
          : item.nombre === "Suspendido"
            ? "fas fa-ban"
            : item.nombre === "Remodelación"
              ? "fas fa-hammer"
              : "fas fa-times-circle",

    color
  };
});

  return {
    totalEstadios,
    promedioCapacidad,
    totalPaises,

    paisesMasEstadios,
    paisesMenosEstadios,

    ciudadesMasEstadios,
    ciudadesMenosEstadios,

    estadiosMayorCapacidad,
    estadiosMenorCapacidad,

    estadiosMasAntiguos,
    estadiosMasNuevos,

    distribucionEstado,
    tiposCesped,

    estadoItems
  };
}