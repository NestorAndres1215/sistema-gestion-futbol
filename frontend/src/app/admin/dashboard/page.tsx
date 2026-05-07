"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authGuard } from "@/utils/guard";
import AdminLayout from "@/app/admin/layout/AdminLayout";
import styles from "./dashboard-admin.module.css";

const METRICS = [
  { label: "Jugadores registrados", value: "247", delta: "+12 este mes", up: true, icon: "fa-solid fa-futbol", color: "green" },
  { label: "Partidos jugados", value: "38", delta: "Temporada 2025/26", up: true, icon: "fa-solid fa-whistle", color: "blue" },
  { label: "Goles anotados", value: "84", delta: "+6 vs temporada ant.", up: true, icon: "fa-solid fa-bullseye", color: "amber" },
  { label: "Lesionados", value: "3", delta: "2 en recuperación", up: false, icon: "fa-solid fa-kit-medical", color: "red" },
];

const PROXIMOS_PARTIDOS = [
  { id: 1, rival: "Sporting FC", fecha: "Sáb 10 May", hora: "15:00", local: true, liga: "Liga Pro" },
  { id: 2, rival: "Atlético Norte", fecha: "Mar 13 May", hora: "20:30", local: false, liga: "Copa" },
  { id: 3, rival: "Real Oeste", fecha: "Dom 18 May", hora: "17:00", local: true, liga: "Liga Pro" },
];

const ULTIMOS_RESULTADOS = [
  { id: 1, rival: "Dynamo Sur", gf: 3, gc: 1 },
  { id: 2, rival: "FC Montaña", gf: 0, gc: 0 },
  { id: 3, rival: "Unión Central", gf: 2, gc: 3 },
  { id: 4, rival: "Estrella Azul", gf: 1, gc: 0 },
  { id: 5, rival: "Rápido FC", gf: 4, gc: 2 },
];

const TOP_GOLEADORES = [
  { id: 1, nombre: "Marcos Delgado", pos: "DEL", goles: 18, asist: 6, pct: 90 },
  { id: 2, nombre: "Luis Herrera", pos: "MED", goles: 11, asist: 9, pct: 55 },
  { id: 3, nombre: "Jorge Castillo", pos: "DEL", goles: 9, asist: 4, pct: 45 },
  { id: 4, nombre: "Pablo Ríos", pos: "MED", goles: 7, asist: 12, pct: 35 },
  { id: 5, nombre: "Andrés Mora", pos: "DEF", goles: 4, asist: 2, pct: 20 },
];

const CLASIFICACION = [
  { pos: 1, equipo: "Sporting FC", pj: 30, pts: 68, dif: "+28", propio: false },
  { pos: 2, equipo: "FC Montaña", pj: 30, pts: 61, dif: "+19", propio: false },
  { pos: 3, equipo: "Mi Equipo", pj: 30, pts: 58, dif: "+14", propio: true },
  { pos: 4, equipo: "Dynamo Sur", pj: 30, pts: 52, dif: "+8", propio: false },
  { pos: 5, equipo: "Unión Central", pj: 30, pts: 47, dif: "+2", propio: false },
];

const ESTADO_EQUIPO = [
  { label: "Disponibles", value: "22", icon: "fa-solid fa-circle-check", color: "green" },
  { label: "Lesionados", value: "3", icon: "fa-solid fa-kit-medical", color: "red" },
  { label: "Suspendidos", value: "1", icon: "fa-solid fa-ban", color: "amber" },
  { label: "En duda", value: "2", icon: "fa-solid fa-circle-question", color: "blue" },
  { label: "Sub-23 en cantera", value: "14", icon: "fa-solid fa-seedling", color: "green" },
];

// ─── Helper resultado ─────────────────────────────────────────────────────────

function resultado(gf: number, gc: number): { label: string; key: string } {
  if (gf > gc) return { label: "V", key: "win" };
  if (gf < gc) return { label: "D", key: "loss" };
  return { label: "E", key: "draw" };
}



export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!authGuard()) router.push("/auth/login");
  }, []);

  return (
    <AdminLayout pageTitle="Dashboard" pageSubtitle="Temporada 2025 / 2026">
      <div className={styles.dashboard}>

        <section className={styles.metrics}>
          {METRICS.map((m) => (
            <div key={m.label} className={`${styles.metricCard} ${styles[m.color]}`}>
              <div className={styles.metricTop}>
                <span className={styles.metricLabel}>{m.label}</span>
                <div className={styles.metricIconWrap}>
                  <i className={m.icon} />
                </div>
              </div>
              <div className={styles.metricValue}>{m.value}</div>
              <div className={`${styles.metricDelta} ${m.up ? styles.deltaUp : styles.deltaDown}`}>
                <i className={`fa-solid ${m.up ? "fa-arrow-up" : "fa-arrow-down"}`} />
                {m.delta}
              </div>
            </div>
          ))}
        </section>

        <section className={styles.mainRow}>


          <div className={styles.card}>
            <div className={styles.cardHead}>
              <div>
                <div className={styles.cardTitle}>
                  <i className="fa-solid fa-ranking-star" /> Top Goleadores
                </div>
                <div className={styles.cardSub}>Temporada actual · Liga Pro</div>
              </div>
            </div>
            <div className={styles.goleadoresList}>
              {TOP_GOLEADORES.map((j, idx) => (
                <div key={j.id} className={styles.goleadorRow}>
                  <span className={styles.rank}>#{idx + 1}</span>
                  <div className={styles.avatar}>
                    {j.nombre.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className={styles.jugadorInfo}>
                    <span className={styles.jugadorNombre}>{j.nombre}</span>
                    <div className={styles.barWrap}>
                      <div className={styles.bar} style={{ width: `${j.pct}%` }} />
                    </div>
                  </div>
                  <div className={styles.jugadorStats}>
                    <span><i className="fa-solid fa-futbol" /> {j.goles}</span>
                    <span><i className="fa-solid fa-shoe-prints" /> {j.asist}</span>
                  </div>
                  <span className={`${styles.posBadge} ${styles[`pos${j.pos}`]}`}>{j.pos}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHead}>
              <div>
                <div className={styles.cardTitle}>
                  <i className="fa-solid fa-trophy" /> Últimos resultados
                </div>
                <div className={styles.cardSub}>Forma reciente del equipo</div>
              </div>
              <div className={styles.forma}>
                {ULTIMOS_RESULTADOS.map((r) => {
                  const res = resultado(r.gf, r.gc);
                  return (
                    <span key={r.id} className={`${styles.formaDot} ${styles[res.key]}`}>
                      {res.label}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className={styles.resultsList}>
              {ULTIMOS_RESULTADOS.map((r) => {
                const res = resultado(r.gf, r.gc);
                return (
                  <div key={r.id} className={styles.resultRow}>
                    <span className={`${styles.resultBadge} ${styles[res.key]}`}>{res.label}</span>
                    <span className={styles.resultRival}>{r.rival}</span>
                    <span className={styles.resultScore}>
                      {r.gf} <span className={styles.scoreSep}>—</span> {r.gc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </section>


        <section className={styles.bottomRow}>


          <div className={styles.card}>
            <div className={styles.cardHead}>
              <div className={styles.cardTitle}>
                <i className="fa-regular fa-calendar-days" /> Próximos partidos
              </div>
            </div>
            <div className={styles.partidosList}>
              {PROXIMOS_PARTIDOS.map((p) => (
                <div key={p.id} className={styles.partidoRow}>
                  <div className={styles.partidoIcon}>
                    <i className="fa-solid fa-whistle" />
                  </div>
                  <div className={styles.partidoInfo}>
                    <span className={styles.partidoRival}>vs {p.rival}</span>
                    <span className={styles.partidoMeta}>
                      {p.fecha} · {p.hora} · {p.liga}
                    </span>
                  </div>
                  <span className={`${styles.localBadge} ${p.local ? styles.home : styles.away}`}>
                    {p.local ? "Local" : "Visitante"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHead}>
              <div className={styles.cardTitle}>
                <i className="fa-solid fa-list-ol" /> Clasificación
              </div>
            </div>
            <div className={styles.tablaWrap}>
              <table className={styles.tabla}>
                <thead>
                  <tr>
                    <th>#</th><th>Equipo</th><th>PJ</th><th>Pts</th><th>Dif</th>
                  </tr>
                </thead>
                <tbody>
                  {CLASIFICACION.map((e) => (
                    <tr key={e.pos} className={e.propio ? styles.propioEquipo : ""}>
                      <td className={styles.tablaPos}>{e.pos}</td>
                      <td className={styles.tablaEquipo}>
                        {e.propio && <i className="fa-solid fa-shield-halved" />}
                        {e.equipo}
                      </td>
                      <td>{e.pj}</td>
                      <td className={styles.tablaPts}>{e.pts}</td>
                      <td className={styles.tablaDif}>{e.dif}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHead}>
              <div className={styles.cardTitle}>
                <i className="fa-solid fa-shield-halved" /> Estado del equipo
              </div>
            </div>
            <div className={styles.estadoList}>
              {ESTADO_EQUIPO.map((s) => (
                <div key={s.label} className={styles.estadoRow}>
                  <div className={`${styles.estadoIcon} ${styles[`icon_${s.color}`]}`}>
                    <i className={s.icon} />
                  </div>
                  <span className={styles.estadoLabel}>{s.label}</span>
                  <span className={styles.estadoValue}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

        </section>
      </div>
    </AdminLayout>
  );
}