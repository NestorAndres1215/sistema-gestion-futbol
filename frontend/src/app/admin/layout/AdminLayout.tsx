"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../../../styles/AdminLayout.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { NavSection, Props, User } from "@/interfaces/layout.interface";

const Icon = {
  grid: (
    <i className="fa-solid fa-gauge-high"></i>
  ),
  chart: (
    <i className="fa-solid fa-bars"></i>
  ),
  clock: (
    <i className="fa-regular fa-clock"></i>
  ),
  users: (
    <i className="fa-solid fa-users"></i>
  ),
  folder: (
    <i className="fa-solid fa-folder"></i>
  ),
  invoice: (
    <i className="fa-solid fa-file-invoice"></i>
  ),
  settings: (
    <i className="fa-solid fa-gear"></i>
  ),
  info: (
    <i className="fa-solid fa-circle-info"></i>
  ),
  bell: (
    <i className="fa-regular fa-bell"></i>
  ),
  user: (
    <i className="fa-regular fa-user"></i>
  ),
  search: (
    <i className="fas fa-search"></i>
  ),
  logo: (
    <i className="fa-solid fa-futbol"></i>
  ),
};

// ─── Navegación ───────────────────────────────────────────────────────────────

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Principal",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/admin/dashboard", icon: Icon.grid },
      { id: "analytics", label: "Analítica", href: "/admin/usuario", icon: Icon.chart },
      { id: "reports", label: "Reportes", href: "/reports", icon: Icon.clock },
    ],
  },
  {
    title: "Gestión",
    items: [
      { id: "users", label: "Usuarios", href: "/users", icon: Icon.users},
      { id: "projects", label: "Proyectos", href: "/projects", icon: Icon.folder },
      { id: "invoices", label: "Facturas", href: "/invoices", icon: Icon.invoice },
    ],
  },
  {
    title: "Sistema",
    items: [
      { id: "settings", label: "Configuración", href: "/settings", icon: Icon.settings },
      { id: "support", label: "Soporte", href: "/support", icon: Icon.info },
    ],
  },
];

const DEFAULT_USER: User = {
  name: "Ana Ríos",
  initials: "AR",
  role: "Super Admin",
};


function Sidebar({ user, pathname }: { user: User; pathname: string }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.logoMark}>{Icon.logo}</div>
        <div>
          <div className={styles.logoText}>Nexus</div>
          <div className={styles.logoSub}>Admin v2.0</div>
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
                    <span className={`${styles.navBadge} ${styles[`badge${item.badge.variant.charAt(0).toUpperCase() + item.badge.variant.slice(1)}`]}`}>
                      {item.badge.text}
                    </span>
                  )}
                </Link>
              );
            })}
          </React.Fragment>
        ))}
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.avatar}>{user.initials}</div>
        <div>
          <div className={styles.userName}>{user.name}</div>
          <div className={styles.userRole}>{user.role}</div>
        </div>
      </div>
    </aside>
  );
}


function Topbar({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className={styles.topbar}>
      <div>
        <div className={styles.pageTitle}>{title}</div>
        <div className={styles.pageSub}>{subtitle}</div>
      </div>
      <div className={styles.topbarRight}>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>{Icon.search}</span>
          <input type="text" placeholder="Buscar..." className={styles.searchInput} />
        </div>
        <button className={`${styles.iconBtn} ${styles.notifBtn}`} aria-label="Notificaciones">
          {Icon.bell}
          <span className={styles.notifDot} />
        </button>
        <button className={styles.iconBtn} aria-label="Perfil">
          {Icon.user}
        </button>
      </div>
    </header>
  );
}


export default function AdminLayout({
  children,
  user = DEFAULT_USER,
  pageTitle = "Dashboard",
  pageSubtitle = "Bienvenido de nuevo",
}: Props) {
  const pathname = usePathname();

  return (
    <div className={styles.shell}>
      <Sidebar user={user} pathname={pathname} />
      <div className={styles.main}>
        <Topbar title={pageTitle} subtitle={pageSubtitle} />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}