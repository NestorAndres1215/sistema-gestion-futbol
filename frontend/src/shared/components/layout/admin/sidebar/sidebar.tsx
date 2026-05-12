import styles from "./../layout.module.css";
import React from "react";
import Link from "next/link";
import { NAV_SECTIONS } from "../navigation/nav-sections";


export default function Sidebar({ pathname }: { pathname: string }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.logoMark}>
          <i className="fa-solid fa-futbol"></i>
        </div>
        <div>
          <div className={styles.logoText}>Football Manager</div>
        </div>
      </div>

      <nav className={styles.nav}>
        {NAV_SECTIONS.map((section) => (
          <React.Fragment key={section.title}>
            <div className={styles.navSection}>{section.title}</div>
            {section.items.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  {item.label}
                  {item.badge && (
                    <span className={`${styles.navBadge} ${[`badge${item.badge.variant.charAt(0).toUpperCase() + item.badge.variant.slice(1)}`]}`}>
                      {item.badge.text}
                    </span>
                  )}
                </Link>
              );
            })}
          </React.Fragment>
        ))}
      </nav>
    </aside>
  );
}

