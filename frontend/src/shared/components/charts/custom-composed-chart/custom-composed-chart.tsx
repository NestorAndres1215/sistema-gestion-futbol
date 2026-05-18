"use client";

import styles from "./custom-composed-chart.module.css";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  Area,
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
  barKey: keyof T;
  lineKey: keyof T;
  areaKey: keyof T;
  height?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipTitle}>{label}</p>
        <div className={styles.tooltipRows}>
          {payload.map((p: any, i: number) => (
            <div key={i} className={styles.tooltipRow}>
              <span className={styles.tooltipDot} style={{ background: p.color }} />
              <span className={styles.tooltipLabel}>{p.name}</span>
              <span className={styles.tooltipValue}>{p.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function CustomComposedChart<T>({
  data,
  title,
  xKey,
  barKey,
  lineKey,
  areaKey,
  height = 400,
}: Props<T>) {
  return (
    <div className={styles.card}>

      {title && (
        <div className={styles.cardHead}>
          <div className={styles.headIcon}>
            <i className="ti ti-chart-composite" />
          </div>
          <p className={styles.headTitle}>{title}</p>
        </div>
      )}

      <div className={styles.chartWrap} style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>

            <defs>
              <linearGradient id="composedAreaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="composedBarFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6ee7b7" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.6} />
              </linearGradient>
            </defs>

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
              tick={{ fill: "#4a5568", fontSize: 11, fontFamily: "DM Mono" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(110,231,183,0.04)" }}
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

            <Area
              type="monotone"
              dataKey={areaKey as string}
              stroke="#a78bfa"
              strokeWidth={2}
              fill="url(#composedAreaFill)"
              dot={false}
            />

            <Bar
              dataKey={barKey as string}
              fill="url(#composedBarFill)"
              radius={[6, 6, 0, 0]}
            />

            <Line
              type="monotone"
              dataKey={lineKey as string}
              stroke="#f59e0b"
              strokeWidth={2.5}
              dot={{ fill: "#f59e0b", r: 3, strokeWidth: 0 }}
              activeDot={{ fill: "#f59e0b", r: 5, strokeWidth: 0 }}
            />

          </ComposedChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}