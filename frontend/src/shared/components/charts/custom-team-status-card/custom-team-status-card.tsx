import styles from "./team-status-card.module.css";

interface StatusItem {
  label: string;
  value: number | string;
  icon: string;
  color?: "green" | "blue" | "purple" | "amber" | "red";
}

interface Props {
  items: StatusItem[];
}

export default function TeamStatusCard({ items }: Props) {
  return (
    <div className={`${styles.card} `}>

      <div className={styles.cardHead}>
        <div className={styles.cardTitle}>
          <i className="fa-solid fa-shield-halved" /> Estado del equipo
        </div>
      </div>

      <div className={styles.list}>
        {items.map((s) => (
          <div key={s.label} className={styles.row}>

            <div className={`${styles.icon} ${styles[s.color ?? "green"]}`}>
              <i className={s.icon} />
            </div>

            <span className={styles.label}>{s.label}</span>

            <span className={styles.value}>{s.value}</span>

          </div>
        ))}
      </div>

    </div>
  );
}