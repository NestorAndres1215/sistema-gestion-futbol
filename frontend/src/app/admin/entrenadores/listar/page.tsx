"use client";
import { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import { getEntrenadores } from "@/services/entrenador.service";
import Breadcrumb from "@/components/bread-crumb/bread-cumb";
import Pagination from "@/components/pagination/pagination";
import CardList from "@/components/card-list/card-list";
import FilterBar from "@/components/filter-bar/filter-bar";
import SearchBar from "@/components/search-bar/search-bar";
import styles from "@/components/card-list/card-list.module.css";
import { useRouter } from "next/navigation";
type QueryState = {
    search: string;
    estiloJuego: string;
    pais: string;
    estado: string;
};

export default function EntrenadorLista() {
const router = useRouter();
    const [query, setQuery] = useState<QueryState>({
        search: "",
        estiloJuego: "",
        pais: "",
        estado: "",
    });

    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const pageSize = 15;

    const fetchData = async (q: QueryState, currentPage: number) => {
        try {
            const res = await getEntrenadores({
                ...q,
                page: currentPage,
                pageSize,
            });

            const lista = res?.items ?? res?.data ?? [];

            setData(Array.isArray(lista) ? lista : []);
            setTotalPages(res?.totalPages ?? 1);

        } catch (error) {
            setData([]);
            setTotalPages(1);
        }
    };

    useEffect(() => {
        fetchData(query, page);
    }, [query, page]);

    const handleSearch = (value: string) => {
        setQuery((prev) => ({
            ...prev,
            search: value,
        }));

        setPage(1);
    };

    const handleFilter = (filters: Partial<QueryState>) => {
        setQuery((prev) => ({
            ...prev,
            ...filters,
        }));

        setPage(1);
    };

    const userFilters = [
        {
            key: "estiloJuego",
            placeholder: "Estilo de Juego|",
            options: [
                { value: "Ofensivo", label: "Ofensivo" },
                { value: "Defensivo", label: "Defensivo" },
                { value: "Posesión", label: "Posesión" },
                { value: "Contraataque", label: "Contraataque" },
                { value: "Presión Alta", label: "Presión Alta" },
                { value: "Equilibrado", label: "Equilibrado" },
            ],
        },
        {
            key: "pais",
            placeholder: "País",
            options: [
                { value: "Perú", label: "Perú" },
                { value: "Brasil", label: "Brasil" },
                { value: "Argentina", label: "Argentina" },
                { value: "Italia", label: "Italia" },
                { value: "España", label: "España" },
            ],
        },
        {
            key: "estado",
            placeholder: "Estado",
            options: [
                { value: "Activo", label: "Activo" },
                { value: "Retirado", label: "Retirado" },
            ],
        },
    ];
    return (
        <AdminLayout>
            <Breadcrumb
                items={[
                    { label: "Entrenadores", href: "/admin/entrenadores" },
                    { label: "Listado de Entrenadores" },
                ]}
            />
            <div className="container mt-3">

                <SearchBar
                    value={query.search}
                    onSearch={handleSearch}
                />

                <FilterBar
                    onChange={handleFilter}
                    selectFilters={userFilters}
                />

                <CardList
                    data={data}
                    getTitle={(e) =>
                        `${e.persona.nombre} ${e.persona.apellidoPaterno}`
                    }
                    getSubtitle={(e) =>
                        `${e.persona.ciudadNacimiento?.nombre ?? "Sin ciudad"} - ${e.persona.paisNacimiento?.nombre ?? "Sin país"}`
                    }
                    getImage={(e) =>
                        e.persona.fotoUrl
                            ? `https://localhost:7269${e.persona.fotoUrl}`
                            : null
                    }
                    imageClassName={styles.imagePerfil}
                    onDetail={(e) => router.push(`/admin/entrenadores/listar/${e.id}`)}
                />

                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={(p) => setPage(p)}
                />

            </div>
        </AdminLayout>
    )
}