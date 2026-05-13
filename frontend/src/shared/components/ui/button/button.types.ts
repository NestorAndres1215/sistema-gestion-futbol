export type Button = {
  mode?:
    | "create"
    | "update"
    | "detail"
    | "delete"
    | "clear"
    | "cancelar"
    | "volver"
    | "dashboard";
  onClick?: () => void;
  type?: "button" | "submit";
};