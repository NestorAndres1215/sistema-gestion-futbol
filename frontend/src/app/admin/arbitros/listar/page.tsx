"use client";

import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import AdminLayout from "../../../../shared/components/layout/admin/layout";
import SearchBar from "@/shared/components/ui/search-bar/search-bar";
import FilterBar from "@/shared/components/ui/filter-bar/filter-bar";
import CardList from "@/shared/components/ui/card-list/card-list";
import Pagination from "@/shared/components/ui/pagination/pagination";
import styles from "@/shared/components/ui/card-list/card-list.module.css";
import { useRouter } from "next/navigation";
import useArbitro from "@/features/arbitro/hooks/useArbitro";

export default function ArbitrosListarPage() {
    const router = useRouter();
    const { query, data, page, totalPages, 
        handleSearch, handleFilter, arbitroFilters, setPage } = useArbitro();

    return (
        <AdminLayout>
            <Breadcrumb
                items={[
                    { label: "Árbitros", href: "/admin/arbitros" },
                    { label: "Listado" },
                ]}
            />

            <div className="container mt-3">

                <SearchBar
                    value={query.search}
                    onSearch={handleSearch}
                />

                <FilterBar
                    onChange={handleFilter}
                    selectFilters={arbitroFilters}
                />

                <CardList
                    data={data}
                    getTitle={(e) =>
                        `${e.nombre} ${e.apellido}`
                    }
                    getSubtitle={(e) =>
                        `${e.ciudad ?? "Sin ciudad"} - ${e.pais ?? "Sin país"}`
                    }
                    getImage={(e) =>
                        e.foto
                            ? `https://localhost:7269${e.foto}`
                            : null
                    }
                     imageVariant="perfil"
                    imageClassName={styles.imagePerfil}
                    onDetail={(e) => router.push(`/admin/arbitros/listar/${e.id}`)}
                />

                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={(p) => setPage(p)}
                />

            </div>
        </AdminLayout>
    );
}