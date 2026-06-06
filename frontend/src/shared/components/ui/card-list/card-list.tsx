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
}: CardListProps<T>) {

  if (!data || data.length === 0) {
    return <p className={styles.empty}>No hay datos</p>;
  }

  return (
    <div className="row g-3">
      {data.map((item, i) => {

        const title = getTitle(item);
        const subtitle = getSubtitle?.(item);
        const img = getImage?.(item);

        return (
          <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div key={i} className={styles.card}>

              {/* IMAGEN */}
             <div className={imageClassName}>
  {img ? (
    <CardImage
      src={img}
      alt={title}
    />
  ) : (
    <div className={styles.imageFallback}>
      <i className="fas fa-photo-alt" />
    </div>
  )}
</div>

              {/* BODY */}
              <div className="d-flex flex-column justify-content-between gap-3 p-3 flex-grow-1">
                <div>
                  <h5 className={styles.title}>{title}</h5>

                  {subtitle && (
                    <p className={styles.subtitle}>{subtitle}</p>
                  )}
                </div>

                {onDetail && (
                  <ActionButton mode="detail"
                    onClick={() => onDetail(item)}
                  />
                )}
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}