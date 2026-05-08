"use client";

import styles from "./selection-card.module.css";

type SelectionCardProps = {
  title: string;
  description?: string;
  icon?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export default function SelectionCard({
  title,

  icon,
  selected = false,
  disabled = false,
  onClick,
}: SelectionCardProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${styles.card} ${selected ? styles.active : ""} ${disabled ? styles.disabled : ""}`}
      aria-pressed={selected}
    >
      {icon && (
        <div className={styles.iconWrap}>
          <i className={icon} />
        </div>
      )}

      <h1 className={styles.title}>{title}</h1>


    </button>
  );
}