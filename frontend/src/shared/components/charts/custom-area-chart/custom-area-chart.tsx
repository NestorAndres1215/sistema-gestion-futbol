"use client";

import styles from "./custom-area-chart.module.css";
import {
  ResponsiveContainer,
  AreaChart,
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

export default function CustomAreaChart<T>({
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
            <i className="ti ti-chart-area" />
          </div>
          <p className={styles.headTitle}>{title}</p>
        </div>
      )}

      <div className={styles.chartWrap} style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>

            <defs>
              <linearGradient id="areaStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6ee7b7" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6ee7b7" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#6ee7b7" stopOpacity={0} />
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
              cursor={{ stroke: "rgba(110,231,183,0.15)", strokeWidth: 1 }}
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
              dataKey={dataKey as string}
              stroke="url(#areaStroke)"
              strokeWidth={2.5}
              fill="url(#areaFill)"
              dot={{ fill: "#6ee7b7", r: 3, strokeWidth: 0 }}
              activeDot={{ fill: "#6ee7b7", r: 5, strokeWidth: 0 }}
            />

          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}