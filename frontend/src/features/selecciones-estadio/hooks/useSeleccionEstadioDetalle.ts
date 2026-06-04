import { useEffect, useState } from "react";
import { getEstadioByPais } from "@/features/estadio/services/estadio.service";
import { SwalService } from "@/shared/lib/swal/swal.service";
import { addSeleccionEstadio, getSeleccionEstadioByEstadio, getSeleccionEstadiosBySeleccion, updateSeleccionEstadio } from "../services/seleccionEstadio.service";

export default function useSeleccionEstadioDetalle(seleccionId: string) {

    const [formEstadio, setFormEstadio] = useState({
        estadio: "",
        tipo: ""
    });

    const [formEntrenador, setFormEntrenador] = useState({
        entrenador: "",
        fechaInicio: "",
        fechaFin: ""
    });
    
    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState<number | null>(null);
    const [seleccionEstadios, setSeleccionEstadios] = useState<any[]>([]);
    const [estadio, setEstadio] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    const [tipoSeleccionEstadio, setTipoSeleccionEstadio] = useState([
        { value: "PRINCIPAL", label: "PRINCIPAL" },
        { value: "SUPLENTE", label: "SUPLENTE" }
    ]);

    const handleChange = (name: string, value: string) => {
        setFormEstadio(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const cargarTiposDisponibles = async () => {
        const response = await getSeleccionEstadiosBySeleccion({ page: 1, pageSize: 100, seleccion: seleccionId });

        const existePrincipal = response.items.some((item: any) => item.tipo === "PRINCIPAL");

        setTipoSeleccionEstadio(
            existePrincipal
                ? [{ value: "SUPLENTE", label: "SUPLENTE" }]
                : [
                    { value: "PRINCIPAL", label: "PRINCIPAL" },
                    { value: "SUPLENTE", label: "SUPLENTE" }
                ]
        );
    };

    const recargarSeleccionEstadios = async () => {
        const response = await getSeleccionEstadiosBySeleccion({
            page,
            pageSize,
            seleccion: seleccionId
        });

        setSeleccionEstadios(response.items);
        setTotalPages(response.totalPages);
    };

    const limpiarFormulario = async () => {
        setFormEstadio({ estadio: "", tipo: "" });

        setEditando(false);
        setIdEditar(null);

        const todosEstadios = await getEstadioByPais(seleccionId);
        const registrados = await getSeleccionEstadioByEstadio(seleccionId);

        setEstadio(todosEstadios.filter((e: any) => !registrados.includes(e.nombre)));

        await cargarTiposDisponibles();
    };

    const registrar = async () => {
        try {

            const payload = { Seleccion: seleccionId, Estadio: formEstadio.estadio, Tipo: formEstadio.tipo };
            await addSeleccionEstadio(payload);
            await limpiarFormulario();
            await recargarSeleccionEstadios();

            SwalService.success("Registrado correctamente");

        } catch {
            SwalService.error("Error al registrar");
        }
    };

    const actualizar = async () => {

        if (!idEditar) return;

        try {
            const payload = { Seleccion: seleccionId, Estadio: formEstadio.estadio, Tipo: formEstadio.tipo };
            await updateSeleccionEstadio(idEditar, payload);

            await recargarSeleccionEstadios();
            await limpiarFormulario();

            SwalService.success("Actualizado correctamente");

        } catch {
            SwalService.error("Error al actualizar");
        }
    };

    const handleEditar = async (item: any) => {

        const todosEstadios = await getEstadioByPais(seleccionId);
        const registrados = await getSeleccionEstadioByEstadio(seleccionId);

        setEstadio(
            todosEstadios.filter(
                (e: any) =>
                    e.nombre === item.estadio ||
                    !registrados.includes(e.nombre)
            )
        );

        const existeOtroPrincipal = seleccionEstadios.some(
            (x: any) =>
                x.id !== item.id &&
                x.tipo === "PRINCIPAL"
        );

        setTipoSeleccionEstadio(
            item.tipo === "PRINCIPAL" || !existeOtroPrincipal
                ? [
                    { value: "PRINCIPAL", label: "PRINCIPAL" },
                    { value: "SUPLENTE", label: "SUPLENTE" }
                ]
                : [{ value: "SUPLENTE", label: "SUPLENTE" }]
        );

        setFormEstadio({ estadio: item.estadio, tipo: item.tipo });

        setIdEditar(item.id);
        setEditando(true);
    };

    useEffect(() => {
        if (!seleccionId) return;

        const cargar = async () => {

            const estadios = await getEstadioByPais(seleccionId);
            const registrados = await getSeleccionEstadioByEstadio(seleccionId);

            setEstadio(estadios.filter((e: any) => !registrados.includes(e.nombre)));

            await cargarTiposDisponibles();
        };

        cargar();
    }, [seleccionId]);

    useEffect(() => {
        if (seleccionId) {
            recargarSeleccionEstadios();
        }
    }, [seleccionId, page]);


    const seleccionActions = {
        onEdit: (u: any) => handleEditar(u)
    };

    const seleccionColumns = [
        { header: "ID", accessor: (row: any) => row.id, },
        { header: "Estadio", accessor: (row: any) => row.estadio, },
        { header: "Ciudad", accessor: (row: any) => row.ciudad, },
        { header: "Capacidad", accessor: (row: any) => row.capacidad.toLocaleString() },
    ];

    return {
        formEstadio, estadio, editando, page, totalPages, seleccionEstadios, tipoSeleccionEstadio, seleccionColumns,
        handleChange, registrar, actualizar, limpiarFormulario, setPage, seleccionActions
    };
}