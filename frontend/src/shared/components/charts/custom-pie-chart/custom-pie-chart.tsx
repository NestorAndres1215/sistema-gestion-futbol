"use client";

//import styles from "./custom-line-chart.module.css";
import styles from "@/shared/styles/chart.module.css";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#6ee7b7",
  "#3b82f6",
  "#a78bfa",
  "#f59e0b",
  "#f87171",
  "#34d399",
  "#60a5fa",
  "#c084fc",
];

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
        <p className={styles.tooltipValue} style={{ color: payload[0].payload.fill }}>
          {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => (
  <div className={styles.legend}>
    {payload.map((entry: any, i: number) => (
      <div key={i} className={styles.legendItem}>
        <span className={styles.legendDot} style={{ background: entry.color }} />
        <span className={styles.legendLabel}>{entry.value}</span>
      </div>
    ))}
  </div>
);

export default function CustomPieChart<T>({
  data,
  title,
  nameKey,
  dataKey,
  height = 350,
}: Props<T>) {
  return (
    <div className={styles.card}>

      {title && (
        <div className={styles.cardHead}>
          <div className={styles.headIcon}>
            <i className="fas fa-chart-pie"></i>
          </div>
          <p className={styles.headTitle}>{title}</p>
        </div>
      )}

      <div className={styles.chartWrap} style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={data}
              dataKey={dataKey as string}
              nameKey={nameKey as string}
              outerRadius={110}
              innerRadius={55}
              paddingAngle={3}
              strokeWidth={0}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />

            <Legend content={<CustomLegend />} />

          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}