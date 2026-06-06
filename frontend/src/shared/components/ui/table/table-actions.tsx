import styles from "./table.module.css";
export default function TableActions<T>(props: any) {
  const { row, actions } = props;

  return (
    <div className={styles.actionGroup}>
      {actions.onView && (
        <button
          className={`${styles.actionBtn} ${styles.actionView}`}
          onClick={() => actions.onView(row)}
        >
          <i className="fa-regular fa-eye" />
        </button>
      )}

      {actions.onEdit && (
        <button
          className={`${styles.actionBtn} ${styles.actionEdit}`}
          onClick={() => actions.onEdit(row)}
        >
          <i className="fa-regular fa-pen-to-square" />
        </button>
      )}

      {actions.onDelete && (
        <button
          className={`${styles.actionBtn} ${styles.actionDelete}`}
          onClick={() => actions.onDelete(row)}
        >
          <i className="fa-regular fa-trash-can" />
        </button>
      )}
      {actions.onFire && row.estado === "Activo" && (
        <button
          className={`${styles.actionBtn} ${styles.actionDelete}`}
          onClick={() => actions.onFire(row)}
        >
          <i className="fa-solid fa-gavel" />
        </button>
      )}
    </div>
  );
}
