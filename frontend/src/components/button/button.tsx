"use client";

import styles from "./button.module.css";

type ActionButtonProps = {
  mode?: "create" | "update" | "detail" | "delete";
  onClick?: () => void;
};

export default function ActionButton({
  mode = "create",
  onClick,
}: ActionButtonProps) {
  const config = {
    create: { text: "Registrar",   icon: "fa-solid fa-plus",  style: styles.create },
    update: { text: "Actualizar",  icon: "fa-solid fa-pen",   style: styles.update },
    detail: { text: "Ver detalle", icon: "fa-solid fa-eye",   style: styles.detail },
    delete: { text: "Eliminar",    icon: "fa-solid fa-trash", style: styles.delete },
  };

  const { text, icon, style } = config[mode];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.btn} ${style}`}
    >
      <i className={icon} />
      {text}
    </button>
  );
}