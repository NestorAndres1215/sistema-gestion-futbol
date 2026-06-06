import React from "react";

export type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
};

export type TableProps<T> = {
  data: T[];
  columns: Column<T>[];

  actions?: {
    onView?: (row: T) => void;
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
    onFire?: (row: T) => void;
  };

  showActions?: boolean;
  emptyMessage?: string;

  // 🔥 SELECCIÓN
  selectable?: boolean;
  selectedRow?: string | number | null;
  onSelectRow?: (row: T) => void;
};