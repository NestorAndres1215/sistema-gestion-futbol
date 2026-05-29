"use client";
import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import styles from "./detalle.module.css";
import { useEffect, useState } from "react";
import { getEstadioByPais } from "@/features/estadio/services/estadio.service";
import { useParams, useRouter } from "next/navigation";
import ActionButton from "@/shared/components/ui/button/button";
import { addSeleccionEstadio, getSeleccionEstadioByEstadio, getSeleccionEstadiosBySeleccion } from "@/features/selecciones/services/seleccionEstadio.service";
import { SwalService } from "@/shared/lib/swal/swal.service";
import Pagination from "@/shared/components/ui/pagination/pagination";

export default function DetalleSeleccionPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        seleccion: "",
        tipo: ""
    });
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
    const [seleccion, setSeleccion] = useState<any[]>([]);

    const params = useParams();
    const [page, setPage] = useState(1);

    const [pageSize] = useState(10);

    const [totalPages, setTotalPages] = useState(1);
    const seleccionId = params.id as string;
const [tipoSeleccionEstadio, setTipoSeleccionEstadio] = useState([
    { value: "PRINCIPAL", label: "PRINCIPAL" },
    { value: "SUPLENTE", label: "SUPLENTE" },
]);
useEffect(() => {

    const loadEstadios = async () => {

        try {

            const estadiosSeleccion =
                await getSeleccionEstadioByEstadio(seleccionId);

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

    useEffect(() => {

        const loadSeleccionEstadios = async () => {

            try {

                const response = await getSeleccionEstadiosBySeleccion({
                    page,
                    pageSize,
                    seleccion: seleccionId
                });


                setSeleccionEstadios(response.items);

            } catch (error) {

                console.log(error);

                setSeleccionEstadios([]);
            }
        };

        if (seleccionId) {

            loadSeleccionEstadios();
        }

    }, [seleccionId]);
    const registrar = async () => {

        try {

            const payload = {

                Seleccion: seleccionId,

                Estadio: form.seleccion,
                Tipo: form.tipo
            };
            console.log(payload)
            const response = await addSeleccionEstadio(payload);

            console.log(response);

            SwalService.success("Registrado correctamente");
            router.push("/admin/selecciones");
        } catch (error) {

            SwalService.error("Error al registrar");
        }
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
                                        value={form.seleccion}
                                        onChange={(e) =>
                                            handleChange("seleccion", e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Seleccione un país
                                        </option>

                                        {seleccion.map((pais) => (
                                            <option
                                                key={pais.id}
                                                value={pais.nombre}
                                            >
                                                {pais.nombre}
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
                                <ActionButton mode="create" onClick={registrar} />
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {seleccionEstadios.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>{item.estadio}</td>
                                                <td>{item.ciudad}</td>
                                                <td>{item.capacidad.toLocaleString()}</td>
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