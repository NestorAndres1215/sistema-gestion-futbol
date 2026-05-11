import { Field } from "./entity-detail.type";
import styles from "./entity-detail.module.css";

export default function EntityDetail({ fields }: { fields: Field[] }) {
  return (
    <div className={styles.card}>

      <div className={styles.cardHead}>
        <p className={styles.headTitle}>Detalle</p>
      </div>

      <div className={styles.list}>
        {fields.map((f, i) => (
          <div key={i} className={styles.row}>
            <span className={styles.label}>{f.label}</span>
            <span className={styles.value}>{f.value ?? "—"}</span>
          </div>
        ))}
      </div>

    </div>
  );
}