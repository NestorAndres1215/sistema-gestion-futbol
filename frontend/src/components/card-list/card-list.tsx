"use client";

import styles from "./card-list.module.css";
import { useState } from "react";

type CardListProps<T> = {
  data: T[];
  getTitle: (item: T) => string;
  getSubtitle?: (item: T) => string;
  getImage?: (item: T) => string | null;
  onDetail?: (item: T) => void;

  // 👇 solo para personalizar imagen
  imageClassName?: string;
};

function CardImage({
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
        <i className="ti ti-photo-off" />
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

export default function CardList<T>({
  data,
  getTitle,
  getSubtitle,
  getImage,
  onDetail,
  imageClassName,
}: CardListProps<T>) {

  if (!data || data.length === 0) {
    return <p className={styles.empty}>No hay datos</p>;
  }

  return (
    <div className={styles.grid}>
      {data.map((item, i) => {
        const title = getTitle(item);
        const subtitle = getSubtitle?.(item);
        const img = getImage?.(item);

        return (
          <div key={i} className={styles.card}>

            {/* IMAGEN */}
            <div className={imageClassName}>
              {img ? (
                <CardImage
                  src={img}
                  alt={title}
                  imageClassName={imageClassName}
                />
              ) : (
                <div className={styles.imageFallback}>
                  <i className="ti ti-photo-off" />
                </div>
              )}
            </div>

            {/* BODY */}
            <div className={styles.body}>
              <div>
                <h5 className={styles.title}>{title}</h5>

                {subtitle && (
                  <p className={styles.subtitle}>{subtitle}</p>
                )}
              </div>

              {onDetail && (
                <button
                  className={styles.btn}
                  onClick={() => onDetail(item)}
                >
                  <i className="ti ti-eye" />
                  Detalle
                </button>
              )}
            </div>

          </div>
        );
      })}
    </div>
  );
}