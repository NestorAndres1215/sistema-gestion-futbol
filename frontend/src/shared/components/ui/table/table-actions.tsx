import styles from "./table.module.css";

type Props<T> = {
  row: T;
  actions: {
    onView?: (row: T) => void;
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
    onFire?: (row: T) => void;
  };
};

export default function TableActions<T>({ row, actions }: Props<T>) {
  return (
    <div className={styles.actionGroup}>

      {actions.onView && (
        <button
          className={`${styles.actionBtn} ${styles.actionView}`}
          onClick={(e) => {
            e.stopPropagation();
            actions.onView?.(row);
          }}
        >
          <i className="fa-regular fa-eye" />
        </button>
      )}

      {actions.onEdit && (
        <button
          className={`${styles.actionBtn} ${styles.actionEdit}`}
          onClick={(e) => {
            e.stopPropagation();
            actions.onEdit?.(row);
          }}
        >
          <i className="fa-regular fa-pen-to-square" />
        </button>
      )}

      {actions.onDelete && (
        <button
          className={`${styles.actionBtn} ${styles.actionDelete}`}
          onClick={(e) => {
            e.stopPropagation();
            actions.onDelete?.(row);
          }}
        >
          <i className="fa-regular fa-trash-can" />
        </button>
      )}

      {actions.onFire && (row as any).estado === "Activo" && (
        <button
          className={`${styles.actionBtn} ${styles.actionDelete}`}
          onClick={(e) => {
            e.stopPropagation();
            actions.onFire?.(row);
          }}
        >
          <i className="fa-solid fa-gavel" />
        </button>
      )}

    </div>
  );
}