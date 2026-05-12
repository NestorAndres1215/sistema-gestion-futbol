export type Button = {
  mode?: "create" | "update" | "detail" | "delete" | "clear"| "cancelar";
  onClick?: () => void;
  type?: "button" | "submit";
};