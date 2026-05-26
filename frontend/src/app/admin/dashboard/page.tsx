"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authGuard } from "@/features/auth/guards/token.guard";
import AdminLayout from "@/shared/components/layout/admin/layout";
import StatsTable from "@/shared/components/ui/stats-table/stats-table";
import styles from "@/shared/components/ui/stats-table/stats-table.module.css";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (!authGuard()) router.push("/auth/login");
  }, []);
  const players = [
          {
              id: 1,
              name: "Messi",
              team: "Inter Miami",
              goals: 10,
              assists: 5,
              pos: "DEL",
              motmCount: 3,
              total: 15,
          },
          {
              id: 2,
              name: "Busquets",
              team: "Inter Miami",
              goals: 2,
              assists: 7,
              pos: "MED",
              motmCount: 0,
              total: 9,
          },
          {
              id: 3,
              name: "Suárez",
              team: "Inter Miami",
              goals: 8,
              assists: 3,
              pos: "DEL",
              motmCount: 1,
              total: 11,
          },
          {
              id: 4,
              name: "De Bruyne",
              team: "Manchester City",
              goals: 6,
              assists: 12,
              pos: "MED",
              motmCount: 2,
              total: 18,
          },
          {
              id: 5,
              name: "Haaland",
              team: "Manchester City",
              goals: 15,
              assists: 2,
              pos: "DEL",
              motmCount: 4,
              total: 17,
          },
          {
              id: 6,
              name: "Van Dijk",
              team: "Liverpool",
              goals: 1,
              assists: 1,
              pos: "DEF",
              motmCount: 1,
              total: 2,
          },
          {
              id: 7,
              name: "Ramos",
              team: "PSG",
              goals: 3,
              assists: 0,
              pos: "DEF",
              motmCount: 0,
              total: 3,
          },
          {
              id: 8,
              name: "Courtois",
              team: "Real Madrid",
              goals: 0,
              assists: 0,
              pos: "GK",
              motmCount: 2,
              total: 0,
          },
          {
              id: 9,
              name: "Neymar",
              team: "Al Hilal",
              goals: 7,
              assists: 6,
              pos: "DEL",
              motmCount: 1,
              total: 13,
          },
          {
              id: 10,
              name: "Modric",
              team: "Real Madrid",
              goals: 2,
              assists: 8,
              pos: "MED",
              motmCount: 1,
              total: 10,
          },
          {
              id: 11,
              name: "Cristiano Ronaldo",
              team: "Al Nassr",
              goals: 15,
              assists: 4,
              pos: "DEL",
              motmCount: 5,
              total: 19,
          },
          {
              id: 12,
              name: "Alex Valera",
              team: "Universitario",
              goals: 19,
              assists: 2,
              pos: "DEL",
              motmCount: 2,
              total: 21,
          },
      ];
  return (
    <AdminLayout pageTitle="Dashboard" pageSubtitle="Temporada 2025 / 2026">

     <StatsTable
                title="Goleadores"
                data={players}
                sortBy="goals"
                columns={[
                    { key: "name", label: "Jugador" },
                    { key: "team", label: "Equipo" },
                    {
                        key: "pos",
                        label: "Pos",
                        render: (val) => (
                            <span className={styles[`pos${val}`]}>
                                {val}
                            </span>
                        ),
                    },
                    { key: "goals", label: "Goles", accent: true },
                ]}
            />
    </AdminLayout>
  );
}