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

// 🔥 debounce hook simple
function useDebounce(value: string, delay = 300) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debounced;
}

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

    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 300);

    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState<string | number | null>(null);

    const itemsPerPage = 4;

    // 🔥 reset al abrir
    useEffect(() => {
        if (open) {
            setSearch("");
            setPage(1);
            setSelected(null);
        }
    }, [open]);

    // 🔥 FILTRO (con debounce)
    const filtered = useMemo(() => {
        return data.filter((item) =>
            getLabel(item)
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase())
        );
    }, [data, debouncedSearch]);

    // 🔥 PAGINACIÓN CORRECTA
    const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

    const paginatedData = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        return filtered.slice(start, start + itemsPerPage);
    }, [filtered, page]);

    // 🔥 highlight search
    const highlightText = (text: string) => {
        if (!debouncedSearch) return text;

        const regex = new RegExp(`(${debouncedSearch})`, "gi");
        return text.split(regex).map((part, i) =>
            part.toLowerCase() === debouncedSearch.toLowerCase()
                ? <mark key={i}>{part}</mark>
                : part
        );
    };

    if (!open) return null;

    const columns = [
        {
            header: "Datos",
            accessor: (row: T) => (
                <div>
                    {highlightText(getLabel(row))}
                </div>
            ),
        },
    ];

    const selectedItem = data.find((d) => d.id === selected);
    const selectedLabel = selectedItem ? getLabel(selectedItem) : "Ninguno";

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

                        {/* SEARCH */}
                        <SearchBar
                            value={search}
                            onSearch={(val) => {
                                setSearch(val);
                                setPage(1);
                            }}
                        />

                        {/* TABLE */}
                        <div className={styles.tableWrap}>
                            <Table
                                data={paginatedData}
                                columns={columns}
                                showActions
                                actions={{
                                    onSelect: (row: any) => setSelected(row.id),
                                    selectedRow: selected,
                                }}
                            />
                        </div>

                        {/* PAGINATION */}
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />

                        {/* SELECTED INFO */}
                        <div className="mb-1">
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

                        {/* ACTIONS */}
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