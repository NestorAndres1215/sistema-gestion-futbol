
import { NavSection } from "../types/nav-section";
import { Icon } from "./icons";

export const NAV_SECTIONS: NavSection[] = [
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
      { id: "tournament", label: "Torneos", href: "/admin/torneo", icon: Icon.tournament },
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
