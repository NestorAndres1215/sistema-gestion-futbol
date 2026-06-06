"use client";

import { useState, useMemo, useEffect } from "react";
import styles from "./select-modal.module.css";
import SearchBar from "@/shared/components/ui/search-bar/search-bar";
import Pagination from "@/shared/components/ui/pagination/pagination";
import ActionButton from "../button/button";
import Table from "@/shared/components/ui/table/table";

type SelectModalProps<T> = {
    open: boolean;
    title?: string;
    icon?: string;
    data: T[];
    getLabel: (item: T) => string;
    getValue: (item: T) => string | number;
    onSelect: (value: string | number) => void;
    onClose: () => void;
};

export default function SelectModal<T extends { id: string | number }>({
    open,
    title = "Seleccionar",
    icon = "fa-solid fa-list-check",
    data,
    getLabel,
    getValue,
    onSelect,
    onClose,
}: SelectModalProps<T>) {

    const [query, setQuery] = useState({ search: "" });
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState<string | number | null>(null);

    const itemsPerPage = 4;

    // 🔥 RESET CUANDO ABRE
    useEffect(() => {
        if (open) {
            setSelected(null);
            setQuery({ search: "" });
            setPage(1);
        }
    }, [open]);

    // 🔥 FILTRO
    const filtered = useMemo(() => {
        return data.filter((item) =>
            getLabel(item).toLowerCase().includes(query.search.toLowerCase())
        );
    }, [data, query.search]);

    // 🔥 PAGINACIÓN
    const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

    const paginatedData = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        return filtered.slice(start, start + itemsPerPage);
    }, [filtered, page]);

    if (!open) return null;

    const handleSearch = (value: string) => {
        setQuery({ search: value });
        setPage(1);
    };

    // 🔥 ITEM SELECCIONADO (SAFE)
    const selectedItem = data.find((d) => d.id === selected);

    const selectedLabel = selectedItem
        ? getLabel(selectedItem)
        : "Ninguno";

    const columns = [
        {
            header: "Datos",
            accessor: (row: T) => getLabel(row),
        },
    ];

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.card}>

                    <div className={styles.cardHead}>
                        <h3 className={styles.cardName}>
                            <i className={icon}></i> {title}
                        </h3>
                    </div>

                    <div className="p-3 d-flex flex-column" style={{ height: "100%" }}>

                        <SearchBar value={query.search} onSearch={handleSearch} />

                   
                        <div className={styles.tableWrap}>
                            <Table
                                data={paginatedData}
                                columns={columns}
                                showActions={false}
                                selectable
                                selectedRow={selected}
                                onSelectRow={(row) => setSelected(row.id)}
                            />
                        </div>

                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />

                        <div className="mb-3">
                            <div className={styles.selInfo}>
                                <i className="fa-solid fa-circle-check" />
                                <span>
                                    Seleccionado:{" "}
                                    <span className={styles.selName}>
                                        {selectedLabel}
                                    </span>
                                </span>
                            </div>
                        </div>

                        <div className="row g-2 mt-3">

                            <div className="col-12 col-md-4">
                                <ActionButton
                                    mode="clear"
                                    onClick={() => setSelected(null)}
                                />
                            </div>

                            <div className="col-12 col-md-4">
                                <ActionButton
                                    mode="cerrar"
                                    onClick={onClose}
                                />
                            </div>

                            <div className="col-12 col-md-4">
                                <ActionButton
                                    mode="create"
                                    onClick={() => {
                                        if (selected !== null) {
                                            onSelect(selected);
                                            onClose();
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}