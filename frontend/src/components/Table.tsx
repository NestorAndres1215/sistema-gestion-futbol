type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];

  // 👇 acciones opcionales
  actions?: {
    onView?: (row: T) => void;
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
  };

  showActions?: boolean;
};

export default function Table<T extends { id: number | string }>({
  data,
  columns,
  actions,
  showActions = false,
}: TableProps<T>) {
  const finalColumns: Column<T>[] = [...columns];

  // 👇 se agrega columna automáticamente si está activo
  if (showActions && actions) {
    finalColumns.push({
      header: "Acciones",
      accessor: (row: T) => (
        <div style={{ display: "flex", gap: "8px" }}>
          {actions.onView && (
            <button onClick={() => actions.onView!(row)}>👁 Ver</button>
          )}
          {actions.onEdit && (
            <button onClick={() => actions.onEdit!(row)}>✏️ Editar</button>
          )}
          {actions.onDelete && (
            <button onClick={() => actions.onDelete!(row)}>🗑 Eliminar</button>
          )}
        </div>
      ),
    });
  }

  return (
    <table border={1} cellPadding={8} style={{ width: "100%" }}>
      <thead>
        <tr>
          {finalColumns.map((col, i) => (
            <th key={i}>{col.header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {finalColumns.map((col, i) => (
              <td key={i}>
                {typeof col.accessor === "function"
                  ? col.accessor(row)
                  : (row[col.accessor] as React.ReactNode)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}