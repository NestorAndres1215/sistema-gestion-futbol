import styles from "./table.module.css";

type Props<T> = {
  row: T;
  actions: {
    onView?: (row: T) => void;
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
    onFire?: (row: T) => void;

    // 🔥 SELECT
    onSelect?: (row: T) => void;
    selectedRow?: string | number | null;
  };
};

export default function TableActions<T>({
  row,
  actions,
}: Props<T>) {

  const isSelected = actions.selectedRow === (row as any).id;
  const isActive = (row as any).estado === "Activo";

  return (
    <div className={styles.actionGroup}>


      {actions.onSelect && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            actions.onSelect?.(row);
          }}
          className={styles.radio}
        >
          {isSelected && <span className={styles.radioDot} />}
        </button>
      )}

      {/* VIEW */}
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

      {/* EDIT */}
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

      {/* DELETE */}
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

      {/* FIRE */}
      {actions.onFire && isActive && (
        <button
          className={`${styles.actionBtn} ${styles.actionDelete}`}
          onClick={(e) => { 
            e.stopPropagation(); 
            actions.onFire?.(row); }}
        >
          <i className="fa-solid fa-gavel" />
        </button>
      )}

    </div>
  );
}