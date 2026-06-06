"use client";

import { useState } from "react";
import styles from "./card-list.module.css";

interface CardImageProps {
  src: string;
  alt: string;
  variant?: "logo" | "perfil";
}

export default function CardImage({
  src,
  alt,
  variant = "perfil",
}: CardImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={styles.imageFallback}>
        <i className="fas fa-image" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={variant === "logo" ? styles.imageLogo : styles.imagePhoto}
      loading="lazy"
      draggable={false}
      onError={() => setError(true)}
    />
  );
}