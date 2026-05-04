import Link from "next/link";
import styles from "./bread-cumb.module.css";
import { Props } from "./bread-cumb.type";



export default function Breadcrumb({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={idx} className={styles.item}>
            {idx > 0 && (
              <i className={`fa-solid fa-chevron-right ${styles.sep}`} />
            )}
            {isLast || !item.href ? (
              <span
                className={`${styles.crumb} ${isLast ? styles.active : ""}`}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className={styles.crumb}>
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}