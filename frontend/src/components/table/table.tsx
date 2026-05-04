import { Column, TableProps } from "@/components/table/table.type";
import styles from "./table.module.css";


export default function Table<T extends { id: number | string }>({
  data,
  columns,
  actions,
  showActions = false,
  emptyMessage = "Sin resultados",
}: TableProps<T>) {
  const finalColumns: Column<T>[] = [...columns];

  if (showActions && actions) {
    finalColumns.push({
      header: "Acciones",
      accessor: (row: T) => (
        <div className={styles.actionGroup}>
          {actions.onView && (
            <button
              className={`${styles.actionBtn} ${styles.actionView}`}
              onClick={() => actions.onView!(row)}
              aria-label="Ver"
              title="Ver"
            >
              <i className="fa-regular fa-eye" />
            </button>
          )}
          {actions.onEdit && (
            <button
              className={`${styles.actionBtn} ${styles.actionEdit}`}
              onClick={() => actions.onEdit!(row)}
              aria-label="Editar"
              title="Editar"
            >
              <i className="fa-regular fa-pen-to-square" />
            </button>
          )}
          {actions.onDelete && (
            <button
              className={`${styles.actionBtn} ${styles.actionDelete}`}
              onClick={() => actions.onDelete!(row)}
              aria-label="Eliminar"
              title="Eliminar"
            >
              <i className="fa-regular fa-trash-can" />
            </button>
          )}
        </div>
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
                      : (row[col.accessor] as React.ReactNode)}
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