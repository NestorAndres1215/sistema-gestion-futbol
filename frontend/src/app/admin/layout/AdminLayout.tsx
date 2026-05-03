"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../../../styles/AdminLayout.module.css";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: { text: string; variant: "red" | "green" | "blue" };
};

type NavSection = {
  title: string;
  items: NavItem[];
};

type User = {
  name: string;
  initials: string;
  role: string;
};

type Props = {
  children: React.ReactNode;
  user?: User;
  pageTitle?: string;
  pageSubtitle?: string;
};

// ─── Iconos SVG inline ────────────────────────────────────────────────────────

const Icon = {
  grid: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="2" width="5" height="5" rx="1" />
      <rect x="9" y="2" width="5" height="5" rx="1" />
      <rect x="2" y="9" width="5" height="5" rx="1" />
      <rect x="9" y="9" width="5" height="5" rx="1" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M2 8h12M2 4h12M2 12h8" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="8" r="6" /><path d="M8 5v3l2 2" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="6" cy="5" r="2.5" />
      <path d="M1 14c0-2.8 2.2-5 5-5" />
      <circle cx="11" cy="9" r="2.5" />
      <path d="M8.5 14c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5" />
    </svg>
  ),
  folder: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M13 4H8l-2-2H3a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2z" />
    </svg>
  ),
  invoice: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="3" width="12" height="10" rx="1" />
      <path d="M5 7h6M5 10h4" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="8" r="2.5" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.1 3.1l1.4 1.4M11.5 11.5l1.4 1.4M3.1 12.9l1.4-1.4M11.5 4.5l1.4-1.4" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M8 1a7 7 0 100 14A7 7 0 008 1zM8 7v4" />
      <circle cx="8" cy="5" r=".5" fill="currentColor" />
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M8 1a5 5 0 00-5 5v3l-1.5 2.5h13L13 9V6a5 5 0 00-5-5zM6.5 13a1.5 1.5 0 003 0" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="5" r="2.5" />
      <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="7" cy="7" r="5" /><path d="M12 12l2 2" />
    </svg>
  ),
  logo: (
    <svg viewBox="0 0 16 16" fill="none" stroke="#0d0f14" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="2,12 6,7 9,10 14,4" />
    </svg>
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
      { id: "users", label: "Usuarios", href: "/users", icon: Icon.users, badge: { text: "12", variant: "red" } },
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

// ─── Sidebar ──────────────────────────────────────────────────────────────────

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

// ─── Topbar ───────────────────────────────────────────────────────────────────

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

// ─── Layout principal ─────────────────────────────────────────────────────────

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