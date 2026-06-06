import { useState } from "react";
import styles from "./card-list.module.css";

interface CardImageProps {
  src: string;
  alt: string;
}

export default function CardImage({
  src,
  alt,
}: CardImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={styles.imageFallback}>
        <i className="fas fa-photo-alt" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={styles.image}
      loading="lazy"
      draggable={false}
      onError={() => setError(true)}
    />
  );
}