"use client";

import styles from "./dashboard-card.module.css";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: string;
}

export default function DashboardCard({ title, value, icon, }: DashboardCardProps) {
  return (
    <div className={styles.card}>
      <div className="d-flex align-items-start justify-content-between mb-3">
        <p className={styles.title}>{title}</p>
        {icon && (
          <div className={styles.iconWrap}>
            <i className={icon} />
          </div>
        )}
      </div>
      <h2 className={styles.value}>{value}</h2>
      <div className={styles.bar} />
    </div>
  );
}