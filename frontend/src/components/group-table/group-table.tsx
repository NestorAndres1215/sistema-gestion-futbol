"use client";

import styles from "./group-table.module.css";

type Team = {
  id: number;
  position: number;
  name: string;
  image: string;
  pj: number;
  pg: number;
  pe: number;
  pp: number;
  gf: number;
  gc: number;
  dg: number;
  pts: number;
};

type GroupTableProps = {
  title: string;
  teams: Team[];
  qualifiedTeams?: number;
  playoffTeams?: number;
};

export default function GroupTable({
  title,
  teams,
  qualifiedTeams = 0,
  playoffTeams = 0,
}: GroupTableProps) {
  return (
    <div className={styles.container}>

      {/* HEADER */}
      <div className={styles.head}>
        <i className={`fa-solid fa-list-ol ${styles.headIcon}`} />
        <h2 className={styles.headTitle}>{title}</h2>
      </div>

      {/* TABLE */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Equipo</th>
              <th>PJ</th>
              <th>PG</th>
              <th>PE</th>
              <th>PP</th>
              <th>GF</th>
              <th>GC</th>
              <th>DG</th>
              <th>PTS</th>
            </tr>
          </thead>

          <tbody>
            {teams.map((team) => {
              const isQualified = team.position <= qualifiedTeams;
              const isPlayoff =
                team.position > qualifiedTeams &&
                team.position <= qualifiedTeams + playoffTeams;

              const rowClass = isQualified
                ? styles.qualified
                : isPlayoff
                ? styles.playoff
                : "";

              return (
                <tr key={team.id} className={rowClass}>
                  <td className={styles.posCell}>{team.position}</td>

                  <td>
                    <div className={styles.teamCell}>
                      <div className={styles.teamAvatar}>
                        {team.image ? (
                          <img src={team.image} alt={team.name} />
                        ) : (
                          <i className="fa-solid fa-shield-halved" />
                        )}
                      </div>
                      <span className={styles.teamName}>{team.name}</span>
                    </div>
                  </td>

                  <td>{team.pj}</td>
                  <td>{team.pg}</td>
                  <td>{team.pe}</td>
                  <td>{team.pp}</td>
                  <td>{team.gf}</td>
                  <td>{team.gc}</td>
                  <td>{team.dg > 0 ? `+${team.dg}` : team.dg}</td>
                  <td className={styles.ptsCell}>{team.pts}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* LEGENDS */}
      {(qualifiedTeams > 0 || playoffTeams > 0) && (
        <div className={styles.legends}>
          {qualifiedTeams > 0 && (
            <div className={styles.legendItem}>
              <span className={`${styles.dot} ${styles.dotQualified}`} />
              Clasificación
            </div>
          )}
          {playoffTeams > 0 && (
            <div className={styles.legendItem}>
              <span className={`${styles.dot} ${styles.dotPlayoff}`} />
              Repechaje
            </div>
          )}
        </div>
      )}
    </div>
  );
}