import Link from "next/link";
import styles from "./bread-cumb.module.css";
import { Props } from "./bread-cumb.type";



export default function Breadcrumb({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="d-flex align-items-center mb-3 nav-custom">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={idx} className="d-flex align-items-center gap-2">
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