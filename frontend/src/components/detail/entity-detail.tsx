import { Field } from "./entity-detail.type";
import styles from "./entity-detail.module.css";

export default function EntityDetail({ fields }: { fields: Field[] }) {
  return (
    <div className={styles.card}>

      <div className={styles.cardHead}>
        <p className={styles.headTitle}>Detalle</p>
      </div>

      <div className="d-flex flex-column position-relative">
        {fields.map((f, i) => (
         <div
  key={i}
  className={`d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 gap-md-4 px-4 py-3 position-relative ${styles.row}`}
>
  <span className={styles.label}>{f.label}</span>
  <span className={styles.value}>{f.value ?? "—"}</span>
</div>
        ))}
      </div>

    </div>
  );
}