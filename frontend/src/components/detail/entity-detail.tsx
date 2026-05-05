

import { Field } from "./detail.type";
import styles from "./entity-detail.module.css";

export default function EntityDetail({ fields }: { fields: Field[]; }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.fieldsList}>
        {fields.map((f, i) => (
          <div key={i} className={styles.fieldRow}>
            <span className={styles.fieldLabel}>{f.label}</span>
            <span className={styles.fieldValue}>{f.value}</span>
          </div>
        ))}
      </div>

    </div>
  );
}