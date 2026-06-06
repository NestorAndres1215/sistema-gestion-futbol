"use client";

import TableActions from "./table-actions";
import styles from "./table.module.css";
import { TableProps } from "./table.types";

export default function Table<T extends { id: string | number }>({
  data,
  columns,
  actions,
  showActions = false,
  emptyMessage = "Sin resultados",
}: TableProps<T>) {

  const finalColumns = [...columns];

  // 🔥 ACTIONS COLUMN
  if (showActions && actions) {
    finalColumns.push({
      header: "Acciones",
      accessor: (row: T) => (
        <TableActions
          row={row}
          actions={actions}
        />
      ),
    });
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>

        <thead>
          <tr>
            {finalColumns.map((col, i) => (
              <th key={i} className={styles.th}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={finalColumns.length} className={styles.empty}>
                <i className="fa-regular fa-folder-open" />
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id} className={styles.tr}>
                {finalColumns.map((col, i) => (
                  <td key={i} className={styles.td}>
                    {typeof col.accessor === "function"
                      ? col.accessor(row)
                      : (row[col.accessor] as any)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  );
}