// match-card.tsx — sin estado, solo recibe props
"use client";

import Link from "next/link";
import styles from "./match-card.module.css";
import { MatchCardProps } from "./match-card.types";

export default function MatchCard({
  homeTeam,
  homeImage,
  awayTeam,
  awayImage,
  homeScore,
  awayScore,
  referee,
  time,
  status,
  detailHref,
  onHomeScoreChange,
  onAwayScoreChange,
}: MatchCardProps) {
  const statusKey = status.toLowerCase().replace(/\s+/g, "_");

  return (
    <div className={styles.card}>
      <div className={styles.scoreboard}>

        <div className={styles.team}>
          <div className={styles.avatar}>
            {homeImage
              ? <img src={homeImage} alt={homeTeam} />
              : <i className="fa-solid fa-shield-halved" />
            }
          </div>
          <span className={styles.teamName}>{homeTeam}</span>
        </div>

        <div className={styles.scoreWrap}>
          <input
            type="number"
            min={0}
            value={homeScore === undefined ? "" : homeScore}
            placeholder="0"
            className={styles.scoreInput}
            readOnly={!onHomeScoreChange}
            onChange={(e) => {
              const val = e.target.value;
              onHomeScoreChange?.(val === "" ? undefined : Number(val));
            }}
          />
          <span className={styles.sep}>—</span>
          <input
            type="number"
            min={0}
            value={awayScore === undefined ? "" : awayScore}  // ← awayScore
            placeholder="0"
            className={styles.scoreInput}
            readOnly={!onAwayScoreChange}
            onChange={(e) => {
              const val = e.target.value;
              onAwayScoreChange?.(val === "" ? undefined : Number(val));  // ← onAwayScoreChange
            }}
          />
        </div>

        <div className={styles.team}>
          <div className={styles.avatar}>
            {awayImage
              ? <img src={awayImage} alt={awayTeam} />
              : <i className="fa-solid fa-shield-halved" />
            }
          </div>
          <span className={styles.teamName}>{awayTeam}</span>
        </div>

      </div>

      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          <div className={styles.info}>
            <i className="fa-solid fa-clock" />
            <span>{time}</span>
          </div>
          <div className={styles.info}>
            <i className="fa-solid fa-whistle" />
            <span>{referee}</span>
          </div>
        </div>
        <div className={styles.footerRight}>
          <span className={`${styles.status} ${styles[statusKey] ?? ""}`}>
            {status}
          </span>
          {detailHref && (
            <Link href={detailHref} className={styles.btnDetail}>
              <i className="fa-solid fa-arrow-right" />
              Ver detalle
            </Link>
          )}
        </div>
      </div>

    </div>
  );
}