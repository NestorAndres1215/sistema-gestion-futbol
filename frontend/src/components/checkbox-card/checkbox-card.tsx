"use client";

import styles from "./checkbox-card.module.css";

type CheckboxCardProps = {
  title: string;
  description?: string;
  image?: string;
  checked?: boolean;
  onClick?: () => void;
};

export default function CheckboxCard({
  title,
  description,
  image,
  checked = false,
  onClick,
}: CheckboxCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.card} ${checked ? styles.active : ""}`}
      aria-pressed={checked}
    >
      {checked && (
        <div className={styles.check}>
          <svg className={styles.checkIcon} viewBox="0 0 12 12" fill="none">
            <polyline points="2,6 5,9 10,3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      <div className={styles.row}>
        {image && (
          <div className={styles.imageWrap}>
            <img src={image} alt={title} className={styles.image} />
          </div>
        )}
        <h3 className={styles.title}>{title}</h3>
      </div>

      {description && (
        <p className={styles.description}>{description}</p>
      )}
    </button>
  );
}