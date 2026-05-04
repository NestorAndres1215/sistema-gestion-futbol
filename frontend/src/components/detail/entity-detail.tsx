

import { Field } from "./detail.type";
import styles from "./entity-detail.module.css";

export default function EntityDetail({
  title,
  subtitle,
  fields
}: {
  title: string;
  subtitle?: string;
  fields: Field[];
  loading?: boolean;
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && (
          <p className={styles.subtitle}>{subtitle}</p>
        )}
      </div>

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