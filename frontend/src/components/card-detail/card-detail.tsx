import styles from "./card-detail.module.css";

type DetailItem = {
  label: string;
  value: any;
};

type Props = {
  title: string;
  image?: string | null;
  items: DetailItem[];
};

export default function DetailCard({ title, image, items }: Props) {
  return (
    <div className={styles.card}>

      <div className={styles.imageWrap}>
        {image ? (
          <img src={image} alt={title} className={styles.image} />
        ) : (
          <div className={styles.imageFallback}>
            <i className="fas fa-user" />
          </div>
        )}
      </div>

      <div className={styles.content}>

        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.divider} />
        </div>

        <div className={styles.grid}>
          {items.map((item, index) => (
            <div key={index} className={styles.item}>
              <span className={styles.label}>{item.label}</span>
              <p className={styles.value}>{item.value ?? "—"}</p>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}