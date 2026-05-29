export type Button = {
  mode?: | "create" | "update" | "detail" | "delete" | "clear"
  | "cancelar" | "volver" | "dashboard" | "login";

  onClick?: () => void;

  type?: "button" | "submit";
};