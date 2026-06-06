export type Button = {
  mode?: | "create" | "update" | "detail" | "delete" | "clear"| "cerrar"
  | "cancelar" | "volver" | "dashboard" | "login";

  onClick?: () => void;

  type?: "button" | "submit";
};