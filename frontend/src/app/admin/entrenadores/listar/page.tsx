"use client";

import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import Pagination from "@/shared/components/ui/pagination/pagination";
import CardList from "@/shared/components/ui/card-list/card-list";
import FilterBar from "@/shared/components/ui/filter-bar/filter-bar";
import SearchBar from "@/shared/components/ui/search-bar/search-bar";
import styles from "@/shared/components/ui/card-list/card-list.module.css";
import { useRouter } from "next/navigation";
import useEntrenador from "@/features/entrenador/hooks/useEntrenador";


export default function EntrenadorLista() {
    const router = useRouter();
    const { query, handleSearch, handleFilter, userFilters, data, page, totalPages, setPage } = useEntrenador();
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