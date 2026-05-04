"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/styles/layout-admin.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { NavSection, Props } from "@/interfaces/layout.interface";

const Icon = {
  grid: (
    <i className="fa-solid fa-gauge-high"></i>
  ),
  users: (
    <i className="fa-solid fa-users"></i>
  ),
  clubs: (
    <i className="fa-solid fa-shield"></i>
  ),
  selections: (
    <i className="fa-solid fa-flag"></i>
  ),
  settings: (
    <i className="fa-solid fa-gear"></i>
  ),
  tournament: (
    <i className="fa-solid fa-trophy"></i>
  ),

  user: (
    <i className="fa-regular fa-user"></i>
  ),
  referees: (
    <i className="fa-solid fa-gavel"></i>
  ),
  coaches: (
    <i className="fa-solid fa-chalkboard-user"></i>
  ),
  players: (
    <i className="fa-solid fa-people-group"></i>
  ),
  stadiums: (
    <i className="fa-solid fa-location-dot"></i>
  ),
};


const handleLogout = () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  window.location.href = "/auth/login";
};

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Principal",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/admin/dashboard", icon: Icon.grid },
    ],
  },

  {
    title: "Personas",
    items: [
      { id: "users", label: "Usuarios", href: "/admin/usuario", icon: Icon.users },
      { id: "players", label: "Jugadores", href: "/admin/jugadores", icon: Icon.players },
      { id: "coaches", label: "Entrenadores", href: "/admin/entrenadores", icon: Icon.coaches },
      { id: "referees", label: "Árbitros", href: "/admin/arbitros", icon: Icon.referees },
    ],
  },

  {
    title: "Competición",
    items: [
      { id: "tournament", label: "Torneos", href: "/admin/torneos", icon: Icon.tournament },
      { id: "clubs", label: "Clubes", href: "/admin/clubes", icon: Icon.clubs },
      { id: "selections", label: "Selecciones", href: "/admin/selecciones", icon: Icon.selections },
    ],
  },

  {
    title: "Infraestructura",
    items: [
      { id: "stadiums", label: "Estadios", href: "/admin/estadios", icon: Icon.stadiums },
    ],
  },

  {
    title: "Sistema",
    items: [
      { id: "settings", label: "Configuración", href: "/settings", icon: Icon.settings },
    ],
  },
];


function Sidebar({ pathname }: { pathname: string }) {
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


function Topbar({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className={styles.topbar}>
      <div>
        <div className={styles.pageTitle}>{title}</div>
        <div className={styles.pageSub}>{subtitle}</div>
      </div>
      <div className={styles.topbarRight}>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            placeholder="Buscar..."
            className={styles.searchInput}
          />
        </div>
        <button
          className={styles.iconBtn}
          onClick={handleLogout}
          aria-label="Cerrar sesión"
        >
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    </header>
  );
}


export default function AdminLayout({
  children,
  pageTitle = "Dashboard",
  pageSubtitle = "Bienvenido de nuevo",
}: Props) {
  const pathname = usePathname();

  return (
    <div className={styles.shell}>
      <Sidebar pathname={pathname} />
      <div className={styles.main}>
        <Topbar title={pageTitle} subtitle={pageSubtitle} />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}