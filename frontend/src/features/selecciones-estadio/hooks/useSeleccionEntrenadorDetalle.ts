import { useEffect, useState } from "react";
import { getEntrenadorByCombo } from "@/features/entrenador/services/entrenador.service";
import {
    addSeleccionEntrenador,
    getEntrenadores,
    getSeleccionEntrenadorBySeleccion,
    updateDespido
} from "../services/seleccionEntrenador.service";
import { SwalService } from "@/shared/lib/swal/swal.service";
import { formatDate } from "@/shared/utils/date.utils";

interface Entrenador {
    id: string;
    nombreCompleto: string;
}

type FormEntrenador = {
    entrenador: number | "";
    fechaInicio: string;
    fechaFin: string;
};

export default function useSeleccionEntrenadorDetalle(seleccionId: string) {
    const [entrenadores, setEntrenadores] = useState<Entrenador[]>([]);
    const [pageEntrenador, setPageEntrenador] = useState(1);
    const [pageSizeEntrenador] = useState(5);

    const [seleccionEntrenadores, setSeleccionEntrenadores] = useState<any[]>([]);
    const [totalPagesEntrenador, setTotalPagesEntrenador] = useState(1);
    const [existeEntrenadorActivo, setExisteEntrenadorActivo] = useState(false);

    const [formEntrenador, setFormEntrenador] = useState<FormEntrenador>({
        entrenador: "",
        fechaInicio: "",
        fechaFin: ""
    });

    const fetchData = async () => {
        try {
            const res = await getEntrenadorByCombo();
            setEntrenadores(res);
        } catch (error) {
            console.error("Error al obtener entrenadores:", error);
        }
    };

    const recargarSeleccionEntrenador = async () => {
        try {
            const response = await getSeleccionEntrenadorBySeleccion({
                page: pageEntrenador,
                pageSize: pageSizeEntrenador,
                seleccion: seleccionId
            });

            setSeleccionEntrenadores(response.items);

            setExisteEntrenadorActivo(
                response.items.some((x: any) => x.estado === "Activo")
            );

            setTotalPagesEntrenador(response.totalPages);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!seleccionId) return;

        fetchData();
    }, [seleccionId]);

    useEffect(() => {
        if (!seleccionId) return;

        recargarSeleccionEntrenador();
    }, [seleccionId, pageEntrenador]);

    useEffect(() => {
        if (!seleccionId) return;

        const cargar = async () => {
            await getEntrenadores();
        };

        cargar();
    }, [seleccionId]);

    const handleChangeEntrenador = (name: string, value: string) => {
        setFormEntrenador(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const limpiarFormulario = () => {
        setFormEntrenador({
            entrenador: "",
            fechaInicio: "",
            fechaFin: ""
        });
    };

    const handleDespido = async (item: any) => {
        try {
            await SwalService.confirm(
                "¿Confirma que desea despedir a este entrenador?"
            );

            await updateDespido(item.id);

            await recargarSeleccionEntrenador();
            await fetchData();

            SwalService.success("Entrenador despedido correctamente");
        } catch (error: any) {
            SwalService.error(error.message);
        }
    };

    const registrarEntrenador = async () => {
        try {
            const payload = {
                Seleccion: seleccionId,
                Entrenador: formEntrenador.entrenador,
                FechaInicio: formEntrenador.fechaInicio,
                FechaFin: formEntrenador.fechaFin
            };

            await addSeleccionEntrenador(payload);

            limpiarFormulario();

            await recargarSeleccionEntrenador();
            await fetchData();

            SwalService.success("Registrado correctamente");
        } catch (error: any) {
            SwalService.error(error.message);
        }
    };

    const entrenadorActions = {
        onFire: (u: any) => handleDespido(u)
    };

    const entrenadorColumns = [
        {
            header: "ID",
            accessor: (row: any) => row.id
        },
        {
            header: "Entrenador",
            accessor: (row: any) =>
                `${row.entrenadorNombre} ${row.entrenadorApellido}`
        },
        {
            header: "Fecha de Inicio",
            accessor: (row: any) => formatDate(row.fechaInicio)
        },
        {
            header: "Fecha de Fin",
            accessor: (row: any) => formatDate(row.fechaFin)
        }
    ];

    return {
        entrenadores,
        existeEntrenadorActivo,
        formEntrenador,
        handleChangeEntrenador,
        seleccionEntrenadores,
        totalPagesEntrenador,
        pageEntrenador,
        setPageEntrenador,
        setFormEntrenador,
        registrarEntrenador,
        entrenadorColumns,
        entrenadorActions
    };
}