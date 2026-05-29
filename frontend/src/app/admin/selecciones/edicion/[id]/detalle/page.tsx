"use client";
import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import styles from "./detalle.module.css";
import { useEffect, useState } from "react";
import { getEstadioByPais } from "@/features/estadio/services/estadio.service";
import { useParams, useRouter } from "next/navigation";
import ActionButton from "@/shared/components/ui/button/button";
import { addSeleccionEstadio, getSeleccionEstadioByEstadio, getSeleccionEstadiosBySeleccion } from "@/features/selecciones-estadio/services/seleccionEstadio.service";
import { SwalService } from "@/shared/lib/swal/swal.service";
import Pagination from "@/shared/components/ui/pagination/pagination";

export default function DetalleSeleccionPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        estadio: "",
        tipo: ""
    });

    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState<number | null>(null);
    const [seleccionEstadios, setSeleccionEstadios] = useState<any[]>([]);
    const handleChange = (
        name: string,
        value: string
    ) => {

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const params = useParams();
    const [page, setPage] = useState(1);

    const [pageSize] = useState(5);

    const [totalPages, setTotalPages] = useState(1);
    const seleccionId = params.id as string;
    const [tipoSeleccionEstadio, setTipoSeleccionEstadio] = useState([
        { value: "PRINCIPAL", label: "PRINCIPAL" },
        { value: "SUPLENTE", label: "SUPLENTE" },
    ]);

    const [estadio, setEstadio] = useState<any[]>([]);
    useEffect(() => {

        const loadEstadios = async () => {

            try {

                const estadiosSeleccion = await getEstadioByPais(seleccionId);

                const estadiosSeleccion1 =
                    await getSeleccionEstadioByEstadio(seleccionId);

                const estadiosFiltrados = estadiosSeleccion.filter(
                    (estadio: any) => !estadiosSeleccion1.includes(estadio.nombre)
                );

                setEstadio(estadiosFiltrados);
                if (estadiosSeleccion.length > 0) {

                    setTipoSeleccionEstadio([
                        { value: "SUPLENTE", label: "SUPLENTE" }
                    ]);

                } else {

                    setTipoSeleccionEstadio([
                        { value: "PRINCIPAL", label: "PRINCIPAL" },
                        { value: "SUPLENTE", label: "SUPLENTE" }
                    ]);
                }

            } catch (error) {

                console.log(error);
            }
        };

        if (seleccionId) {

            loadEstadios();
        }

    }, [seleccionId]);




    //lista los datos
useEffect(() => {

    const loadSeleccionEstadios = async () => {

        try {

            const response = await getSeleccionEstadiosBySeleccion({
                page,
                pageSize,
                seleccion: seleccionId
            });

            setSeleccionEstadios(response.items);
            setTotalPages(response.totalPages);

        } catch (error) {

            console.log(error);

            setSeleccionEstadios([]);
        }
    };

    if (seleccionId) {

        loadSeleccionEstadios();
    }

}, [seleccionId, page]);


    const limpiarFormulario = async () => {

        setForm({
            estadio: "",
            tipo: ""
        });

        setEditando(false);
        setIdEditar(null);

        try {

            const todosEstadios = await getEstadioByPais(seleccionId);

            const estadiosRegistrados =
                await getSeleccionEstadioByEstadio(seleccionId);

            const estadiosDisponibles = todosEstadios.filter(
                (e: any) => !estadiosRegistrados.includes(e.nombre)
            );

            setEstadio(estadiosDisponibles);

            if (estadiosRegistrados.length > 0) {

                setTipoSeleccionEstadio([
                    { value: "SUPLENTE", label: "SUPLENTE" }
                ]);

            } else {

                setTipoSeleccionEstadio([
                    { value: "PRINCIPAL", label: "PRINCIPAL" },
                    { value: "SUPLENTE", label: "SUPLENTE" }
                ]);
            }

        } catch (error) {

            console.log(error);
        }
    };

    const registrar = async () => {

        try {

            const payload = {
                Seleccion: seleccionId,
                Estadio: form.estadio,
                Tipo: form.tipo
            };

            await addSeleccionEstadio(payload);
            SwalService.success("Registrado correctamente");
            router.push("/admin/selecciones/edicion");
        } catch (error) {

            SwalService.error("Error al registrar");
        }
    };
    const actualizar = async () => {

        try {

            const payload = {
                id: idEditar,
                estadio: form.estadio,
                tipo: form.tipo
            };

            console.log(payload);

            // await updateSeleccionEstadio(payload);

            SwalService.success("Actualizado correctamente");

            limpiarFormulario();

        } catch (error) {

            SwalService.error("Error al actualizar");
        }
    };
    const handleEditar = async (item: any) => {

        const todosEstadios = await getEstadioByPais(seleccionId);

        const estadiosRegistrados =
            await getSeleccionEstadioByEstadio(seleccionId);

        const estadiosDisponibles = todosEstadios.filter(
            (e: any) =>
                e.nombre === item.estadio ||
                !estadiosRegistrados.includes(e.nombre)
        );

        setEstadio(estadiosDisponibles);
        console.log(item.tipo)
        if (item.tipo === "PRINCIPAL") {

            setTipoSeleccionEstadio([
                { value: "PRINCIPAL", label: "PRINCIPAL" },
                { value: "SUPLENTE", label: "SUPLENTE" }
            ]);

        } else {

            setTipoSeleccionEstadio([
                { value: "SUPLENTE", label: "SUPLENTE" }
            ]);
        }

        setForm({
            estadio: item.estadio,
            tipo: item.tipo
        });

        setIdEditar(item.id);
        setEditando(true);
    };
    return (
        <AdminLayout>
            <Breadcrumb
                items={[
                    { label: "Selecciones", href: "/admin/selecciones" },
                    { label: "Edicion", href: "/admin/selecciones/edicion" },
                    { label: "Detalle" },
                ]}
            />
            <div className="row g-3">

                <div className="col-12 col-md-6">
                    <div className={`${styles.card} mb-3 flex-fill`}>
                        <div className={styles.cardHead}>
                            <i className={`${styles.cardIcon} fa-solid fa-futbol `}></i>
                            <p className={styles.cardName}>
                                Estadios de Fútbol
                            </p>
                        </div>
                        <div className={styles.form}>
                            <div className="d-flex flex-column gap-2 w-100">
                                <label className={styles.label}>
                                    Estadios
                                </label>

                                <div className={styles.inputWrap}>
                                    <select
                                        className={styles.input}
                                        value={form.estadio}
                                        onChange={(e) =>
                                            handleChange("estadio", e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Seleccione un estadio
                                        </option>

                                        {estadio.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.nombre}
                                            >
                                                {item.nombre}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                                <label className={styles.label}>
                                    Confederacion
                                </label>

                                <div className={styles.inputWrap}>

                                    <select
                                        className={styles.input}
                                        value={form.tipo}
                                        onChange={(e) => handleChange("tipo", e.target.value)}
                                    >
                                        <option value="">
                                            Seleccione un país
                                        </option>
                                        {tipoSeleccionEstadio.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}

                                    </select>
                                </div>
                                {
                                    editando ? (
                                        <>
                                            <ActionButton
                                                mode="update"
                                                onClick={actualizar}
                                            />

                                            <ActionButton
                                                mode="clear"
                                                onClick={limpiarFormulario}
                                            />
                                        </>
                                    ) : (
                                        <ActionButton
                                            mode="create"
                                            onClick={registrar}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>



                <div className="col-12 col-md-6">
                    <div className={`${styles.card} mb-3 flex-fill`}>
                        <div className={styles.cardHead}>
                            <i className={`${styles.cardIcon} fa-solid fa-futbol `}></i>
                            <p className={styles.cardName}>
                                Estadios de Fútbol
                            </p>
                        </div>
                        <div className={styles.form}>
                            <div className={styles.tablaWrap}>
                                <table className={styles.tabla}>
                                    <thead>
                                        <tr>
                                            <th>N°</th>
                                            <th>Estadio</th>
                                            <th>Ciudad</th>
                                            <th>Capacidad</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {seleccionEstadios.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>{item.estadio}</td>
                                                <td>{item.ciudad}</td>
                                                <td>{item.capacidad.toLocaleString()}</td>

                                                <td>
                                                    <button
                                                        className="btn btn-warning btn-sm"
                                                        onClick={() => handleEditar(item)}
                                                    >
                                                        <i className="fa-solid fa-pen"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={(p) => setPage(p)}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className={`${styles.card} mb-3 flex-fill`}>
                        <div className={styles.cardHead}>
                            <i className={`${styles.cardIcon} fa-solid fa-user-tie `}></i>
                            <p className={styles.cardName}>
                                Entrenadores
                            </p>
                        </div>
                        <div className={styles.form}>
                            <div className={styles.tablaWrap}>
                                <table className={styles.tabla}>
                                    <thead>
                                        <tr>
                                            <th>N°</th>
                                            <th>Entrenador</th>
                                            <th>Fecha Inicio</th>
                                            <th>Fecha Final</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </AdminLayout >
    )
}