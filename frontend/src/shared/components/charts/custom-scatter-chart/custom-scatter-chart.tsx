"use client";

//import styles from "./custom-line-chart.module.css";
import styles from "@/shared/styles/chart.module.css";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ZAxis,
} from "recharts";

interface Props<T> {
  data: T[];
  title?: string;
  xKey: keyof T;
  yKey: keyof T;
  height?: number;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    return (
      <div className={styles.tooltip}>
        {payload.map((p: any, i: number) => (
          <div key={i} className={styles.tooltipRow}>
            <span className={styles.tooltipLabel}>{p.name}</span>
            <span className={styles.tooltipValue}>{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function CustomScatterChart<T>({
  data,
  title,
  xKey,
  yKey,
  height = 400,
}: Props<T>) {
  return (
    <div className={styles.card}>

      {title && (
        <div className={styles.cardHead}>
          <div className={styles.headIcon}>
            <i className="ti ti-chart-dots" />
          </div>
          <p className={styles.headTitle}>{title}</p>
        </div>
      )}

      <div className={styles.chartWrap} style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>

            <defs>
              <radialGradient id="dotGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#6ee7b7" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.6} />
              </radialGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
            />

            <XAxis
              dataKey={xKey as string}
              type="number"
              tick={{ fill: "#4a5568", fontSize: 11, fontFamily: "DM Mono" }}
              axisLine={{ stroke: "rgba(255,255,255,0.05)" }}
              tickLine={false}
              name={xKey as string}
            />

            <YAxis
              dataKey={yKey as string}
              type="number"
              tick={{ fill: "#4a5568", fontSize: 11, fontFamily: "DM Mono" }}
              axisLine={false}
              tickLine={false}
              name={yKey as string}
            />

            <ZAxis range={[40, 40]} />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "rgba(110,231,183,0.1)", strokeDasharray: "4 4" }}
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

            <Scatter
              data={data as any[]}
              fill="url(#dotGradient)"
              opacity={0.85}
            />

          </ScatterChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}