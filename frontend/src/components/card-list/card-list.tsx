"use client";
import styles from "./card-list.module.css";

type CardListProps<T> = {
  data: T[];
  getTitle: (item: T) => string;
  getSubtitle?: (item: T) => string;
  getImage?: (item: T) => string | null;
  onDetail?: (item: T) => void;
};

export default function CardList<T>({
  data,
  getTitle,
  getSubtitle,
  getImage,
  onDetail,
}: CardListProps<T>) {
  if (!data?.length) {
    return <p className={styles.empty}>No hay datos</p>;
  }

  return (
    <div className={styles.grid}>
      {data.map((item, i) => (
        <div key={i} className={styles.card}>

          {getImage?.(item) && (
            <div className={styles.imageWrap}>
              <img
                src={getImage(item)!}
                alt={getTitle(item)}
                className={styles.image}
              />
            </div>
          )}

          <div className={styles.body}>
            <div>
              <h5 className={styles.title}>{getTitle(item)}</h5>
              {getSubtitle && (
                <p className={styles.subtitle}>{getSubtitle(item)}</p>
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
      ))}
    </div>
  );
}