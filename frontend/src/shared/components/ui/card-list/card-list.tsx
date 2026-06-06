"use client";

import ActionButton from "../button/button";
import CardImage from "./card-image";
import styles from "./card-list.module.css";
import { CardListProps } from "./card-list.types";

export default function CardList<T>({
  data,
  getTitle,
  getSubtitle,
  getImage,
  onDetail,
  imageClassName,
  imageVariant = "perfil",
}: CardListProps<T>) {

  if (!data || data.length === 0) {
    return (
      <div className={styles.emptyWrap}>
        <div className={styles.emptyIcon}>
          <i className="fa-solid fa-box-open" />
        </div>
        <p className={styles.emptyText}>No hay datos</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {data.map((item, i) => {
        const title    = getTitle(item);
        const subtitle = getSubtitle?.(item);
        const img      = getImage?.(item);

        return (
          <div key={i} className={styles.card}>

            {/* IMAGEN */}
            <div className={`${styles.imgWrap} ${imageClassName ?? ""}`}>
              {img ? (
                <CardImage
                  src={img}
                  alt={title}
                  variant={imageVariant}
                />
              ) : (
                <div className={styles.imageFallback}>
                  <i className="fas fa-image" />
                </div>
              )}
            </div>

            {/* BODY */}
            <div className={styles.body}>
              <div className={styles.info}>
                <h5 className={styles.title}>{title}</h5>
                {subtitle && (
                  <p className={styles.subtitle}>{subtitle}</p>
                )}
              </div>

              {onDetail && (
                <ActionButton
                  mode="detail"
                  onClick={() => onDetail(item)}
                />
              )}
            </div>

          </div>
        );
      })}
    </div>
  );
}