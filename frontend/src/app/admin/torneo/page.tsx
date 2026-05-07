"use client";

import { useState } from "react";
import Breadcrumb from "@/components/bread-crumb/bread-cumb";
import AdminLayout from "../layout/AdminLayout";
import ActionButton from "@/components/button/button";
import SelectionCard from "@/components/selection-card/selection-card";
import CheckboxCard from "@/components/checkbox-card/checkbox-card";
import GroupTable from "@/components/group-table/group-table";
import MatchCard from "@/components/match-card/match-card";
import StatsTable from "@/components/stats-table/stats-table";
import styles from "../../../components/stats-table/stats-table.module.css"
import EntityDetail from "@/components/detail/entity-detail";
// ─── Tipos ────────────────────────────────────────────────────────────────────

type Team = {
    id: number;
    position: number;
    name: string;
    image: string;
    pj: number; pg: number; pe: number; pp: number;
    gf: number; gc: number; dg: number; pts: number;
};

type Match = {
    id: string;
    homeTeam: string; homeImage: string;
    awayTeam: string; awayImage: string;
    homeScore?: number; awayScore?: number;
    referee: string; time: string; status: string;
};

// ─── Datos ────────────────────────────────────────────────────────────────────

const TEAMS: Team[] = [
    {
        id: 1, position: 1, name: "AC Milan",
        image: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/103.png&h=200&w=200",
        pj: 3, pg: 2, pe: 1, pp: 0, gf: 7, gc: 2, dg: 5, pts: 7,
    },
    {
        id: 2, position: 2, name: "Universitario",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0DVK5VZ8tB16_aHL0j9ifLwhdTIC8-Y7iSg&s",
        pj: 3, pg: 2, pe: 0, pp: 1, gf: 5, gc: 3, dg: 2, pts: 6,
    },
    {
        id: 3, position: 3, name: "Manchester United",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGq3jl5mEy8POTmjFPEtvcyrpKEdm661HQiQ&s",
        pj: 3, pg: 1, pe: 1, pp: 1, gf: 4, gc: 4, dg: 0, pts: 4,
    },
];

const generateMatches = (teams: Team[]): Match[] => {
    const matches: Match[] = [];
    for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
            matches.push({
                id: `${teams[i].id}-${teams[j].id}`,
                homeTeam: teams[i].name, homeImage: teams[i].image,
                awayTeam: teams[j].name, awayImage: teams[j].image,
                referee: "Julio García",
                time: "8:00 PM",
                status: "En juego",
            });
        }
    }
    return matches;
};

const EQUIPOS_CHECKBOX = [
    { key: "Barcelona", image: "/images/barcelona.png", description: "Liga Española" },
    { key: "Real Madrid", image: "/images/realmadrid.png", description: "Liga Española" },
];

// ─── Página ───────────────────────────────────────────────────────────────────

export default function Torneo() {
    const [tipo, setTipo] = useState<string>("");
    const [equipos, setEquipos] = useState<string[]>([]);
    const [matches, setMatches] = useState<Match[]>(generateMatches(TEAMS));

    const toggleEquipo = (equipo: string) => {
        setEquipos((prev) =>
            prev.includes(equipo)
                ? prev.filter((x) => x !== equipo)
                : [...prev, equipo]
        );
    };

    const updateScore = (
        id: string,
        side: "home" | "away",
        value: number | undefined
    ) => {
        setMatches((prev) =>
            prev.map((m) =>
                m.id === id
                    ? { ...m, [side === "home" ? "homeScore" : "awayScore"]: value }
                    : m
            )
        );
    };
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
    const stats = {
        matchesPlayed: 12,
        totalGoals: 38,
        avgGoalsPerMatch: 3.1,

        biggestWin: {
            match: "Barcelona 5-0 PSG",
            team: "Barcelona",
        },

        mostGoalsInMatch: {
            match: "City 6-1 Inter",
            team: "Manchester City",
            goals: 6,
        },

        topScoringTeam: {
            team: "Manchester City",
            goals: 18,
        },

        lowestScoringTeam: {
            team: "Inter Miami",
            goals: 4,
        },

        mostGoalsConceded: {
            team: "PSG",
            goalsAgainst: 10,
        },

        mostGoalsConcededTeams: [
            { team: "PSG", goalsAgainst: 10 },
            { team: "Liverpool", goalsAgainst: 9 },
        ],

        mostCleanSheetsTeam: {
            team: "Real Madrid",
            cleanSheets: 6,
        },
    };
    return (
        <AdminLayout pageTitle="Torneos" pageSubtitle="Mantenimiento">

            <Breadcrumb items={[{ label: "Selecciona Tipo de Torneo" }]} />
            <div className="row g-3">
                <div className="col-12 col-sm-6">
                    <SelectionCard
                        icon="fas fa-trophy"
                        title="Clubes"
                        description="Torneos entre clubes deportivos"
                        selected={tipo === "clubes"}
                        onClick={() => setTipo("clubes")}
                    />
                </div>
                <div className="col-12 col-sm-6">
                    <SelectionCard
                        icon="fas fa-earth-americas"
                        title="Selecciones"
                        description="Torneos entre selecciones"
                        selected={tipo === "selecciones"}
                        onClick={() => setTipo("selecciones")}
                    />
                </div>
            </div>
            {/*  <ActionButton
                mode="create"
                onClick={() => console.log("Registrar")}
            />

             Tipo de torneo 
           
*/}
            {/* Equipos 
            <div className="checkbox-card-grid">
                {EQUIPOS_CHECKBOX.map((e) => (
                    <CheckboxCard
                        key={e.key}
                        image={e.image}
                        title={e.key}
                        description={e.description}
                        checked={equipos.includes(e.key)}
                        onClick={() => toggleEquipo(e.key)}
                    />
                ))}
            </div>*/}

            {/* Tabla del grupo 
            <GroupTable
                title="Grupo A"
                teams={TEAMS}
                qualifiedTeams={1}
                playoffTeams={1}
            />*/}

            {/* Partidos 
            {matches.map((match) => (
                <MatchCard
                    key={match.id}
                    homeTeam={match.homeTeam}
                    homeImage={match.homeImage}
                    awayTeam={match.awayTeam}
                    awayImage={match.awayImage}
                    homeScore={match.homeScore}
                    awayScore={match.awayScore}
                    referee={match.referee}
                    time={match.time}
                    status={match.status}
                    detailHref={`/partidos/${match.id}`}
                    onHomeScoreChange={(val) => updateScore(match.id, "home", val)}
                    onAwayScoreChange={(val) => updateScore(match.id, "away", val)}
                />
            ))}
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
            <StatsTable
                title="Asistencias"
                data={players}
                sortBy="assists"
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
                    { key: "assists", label: "Asistencias" },
                ]}
            />
            <StatsTable
                title="Asistencias"
                data={players}
                sortBy="total"
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

                    { key: "goals", label: "Goles" },
                    { key: "assists", label: "Asistencias" },

                    {
                        key: "total",
                        label: "Total",
                        accent: true,
                    },
                ]}
            />
            <StatsTable
                title="Mejor JUgadores"
                data={players}
                sortBy="motmCount"
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
                    {
                        key: "motmCount",
                        label: "MVP",
                        accent: true,
                    },
                ]}
            />
            <EntityDetail
                fields={[
                    { label: "Partidos jugados", value: stats.matchesPlayed },

                    { label: "Goles anotados", value: stats.totalGoals },

                    { label: "Promedio de goles por partido", value: stats.avgGoalsPerMatch },

                    {
                        label: "Mayor victoria",
                        value: `${stats.biggestWin.team} (${stats.biggestWin.match})`,
                    },

                    {
                        label: "Más goles en un partido",
                        value: `${stats.mostGoalsInMatch.team} (${stats.mostGoalsInMatch.goals} goles)`,
                    },

                    {
                        label: "Equipo con más goles marcados",
                        value: `${stats.topScoringTeam.team} (${stats.topScoringTeam.goals})`,
                    },

                    {
                        label: "Equipo con menos goles marcados",
                        value: `${stats.lowestScoringTeam.team} (${stats.lowestScoringTeam.goals})`,
                    },

                    {
                        label: "Equipo con más goles recibidos",
                        value: `${stats.mostGoalsConceded.team} (${stats.mostGoalsConceded.goalsAgainst})`,
                    },

                    {
                        label: "Equipos más goleados",
                        value: stats.mostGoalsConcededTeams
                            .map(t => `${t.team} (${t.goalsAgainst})`)
                            .join(" / "),
                    },

                    {
                        label: "Equipo con más vallas invictas",
                        value: `${stats.mostCleanSheetsTeam.team} (${stats.mostCleanSheetsTeam.cleanSheets})`,
                    },
                ]}
            />*/}
        </AdminLayout>
    );
}