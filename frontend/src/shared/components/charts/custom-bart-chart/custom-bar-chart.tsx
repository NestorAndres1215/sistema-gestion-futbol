"use client";

import styles from "./custom-bar-chart.module.css";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

interface Props<T> {
  data: T[];
  title?: string;
  xKey: keyof T;
  dataKey: keyof T;
  height?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipLabel}>{label}</p>
        <p className={styles.tooltipValue}>{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function CustomBarChart<T>({
  data,
  title,
  xKey,
  dataKey,
  height = 350,
}: Props<T>) {
  return (
    <div className={styles.card}>

      {title && (
        <div className={styles.cardHead}>
          <div className={styles.headIcon}>
            <i className="fas fa-chart-bar" />
          </div>
          <p className={styles.headTitle}>{title}</p>
        </div>
      )}

      <div className={styles.chartWrap} style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />

            <XAxis
              dataKey={xKey as string}
              tick={{ fill: "#4a5568", fontSize: 11, fontFamily: "DM Mono" }}
              axisLine={{ stroke: "rgba(255,255,255,0.05)" }}
              tickLine={false}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fill: "#4a5568", fontSize: 11, fontFamily: "DM Mono" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(110,231,183,0.05)" }}
            />

            <Legend
              wrapperStyle={{
                fontFamily: "DM Mono",
                fontSize: 11,
                color: "#4a5568",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                paddingTop: 16,
              }}
            />

            <Bar
              dataKey={dataKey as string}
              fill="url(#barGradient)"
              radius={[6, 6, 0, 0]}
            />

            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6ee7b7" stopOpacity={0.9} />

              </linearGradient>
            </defs>

          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}