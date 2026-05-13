"use client";

import { config } from "./button.config";
import styles from "./button.module.css";
import { Button } from "./button.types";

export default function ActionButton({ mode = "create", onClick, type = "button", }: Button) {
  const { text, icon, style } = config[mode];

  return (
    <button type={type} onClick={onClick} className={`${styles.btn} ${style}`}>
      <i className={icon} />
      {text}
    </button>
  );
}