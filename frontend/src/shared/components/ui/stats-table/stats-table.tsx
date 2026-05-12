"use client";

import styles from "./stats-table.module.css";
import { StatsTableProps } from "./stats-table.type";

export default function StatsTable<T>({
  title,
  icon = "fa-solid fa-chart-bar",
  data,
  columns,
  sortBy,
}: StatsTableProps<T>) {

  const sortedData = [...data].sort((a: any, b: any) => {
    if (!sortBy) return 0;
    return (b[sortBy] ?? 0) - (a[sortBy] ?? 0);
  });

  return (
    <div className={styles.container}>

      {/* HEADER */}
      <div className={styles.head}>
        <i className={`${icon} ${styles.headIcon}`} />
        <h2 className={styles.headTitle}>{title}</h2>
      </div>

      {/* TABLE */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>

          {/* HEADER TABLE */}
          <thead>
            <tr>
              <th>Pos</th>

              {columns.map((col) => (
                <th key={String(col.key)}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {sortedData.map((row: any, index) => (
              <tr key={index}>

                {/* 🥇 POSICIÓN */}
                <td className={styles.position}>
                  {index + 1}
                </td>

                {/* COLUMNAS */}
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={col.accent ? styles.accentCell : undefined}
                  >
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key] ?? "—")}
                  </td>
                ))}

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}