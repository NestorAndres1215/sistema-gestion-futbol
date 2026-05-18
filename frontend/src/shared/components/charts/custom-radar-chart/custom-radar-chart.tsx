"use client";

import styles from "./custom-radar-chart.module.css";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
} from "recharts";

interface Props<T> {
  data: T[];
  title?: string;
  nameKey: keyof T;
  dataKey: keyof T;
  height?: number;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipLabel}>{payload[0].name}</p>
        <p className={styles.tooltipValue}>{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function CustomRadarChart<T>({
  data,
  title,
  nameKey,
  dataKey,
  height = 400,
}: Props<T>) {
  return (
    <div className={styles.card}>

      {title && (
        <div className={styles.cardHead}>
          <div className={styles.headIcon}>
            <i className="ti ti-chart-radar" />
          </div>
          <p className={styles.headTitle}>{title}</p>
        </div>
      )}

      <div className={styles.chartWrap} style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>

            <defs>
              <linearGradient id="radarFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6ee7b7" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <PolarGrid
              stroke="rgba(255,255,255,0.06)"
              gridType="polygon"
            />

            <PolarAngleAxis
              dataKey={nameKey as string}
              tick={{ fill: "#4a5568", fontSize: 11, fontFamily: "DM Mono" }}
              tickLine={false}
              axisLine={false}
            />

            <PolarRadiusAxis
              tick={{ fill: "#374151", fontSize: 10, fontFamily: "DM Mono" }}
              axisLine={false}
              tickLine={false}
            />

            <Radar
              dataKey={dataKey as string}
              stroke="#6ee7b7"
              strokeWidth={2}
              fill="url(#radarFill)"
              dot={{ fill: "#6ee7b7", r: 3, strokeWidth: 0 }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              wrapperStyle={{
                fontFamily: "DM Mono",
                fontSize: 11,
                color: "#4a5568",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                paddingTop: 8,
              }}
            />

          </RadarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}