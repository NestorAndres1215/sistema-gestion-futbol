import { useState } from "react";
import styles from "./card-list.module.css";

export default function CardImage({
  src,
  alt,
  imageClassName,
}: {
  src: string;
  alt: string;
  imageClassName?: string;
}) {
  const [error, setError] = useState(false);

  if (error) {
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
      className={`${styles.image} ${imageClassName || ""}`}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}