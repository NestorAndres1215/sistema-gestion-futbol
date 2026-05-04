import { SwalTheme } from "./swal.theme";

export const SwalService = {

  success: (message: string, title = "Éxito") => {
    return SwalTheme.fire({
      icon: "success",
      title,
      text: message,
      iconColor: "#22c55e"
    });
  },

  error: (message: string, title = "Error") => {
    return SwalTheme.fire({
      icon: "error",
      title,
      text: message,
      iconColor: "#ef4444"
    });
  },

  warning: (message: string, title = "Advertencia") => {
    return SwalTheme.fire({
      icon: "warning",
      title,
      text: message,
      iconColor: "#f59e0b"
    });
  },

  info: (message: string, title = "Información") => {
    return SwalTheme.fire({
      icon: "info",
      title,
      text: message,
      iconColor: "#3b82f6"
    });
  },

  confirm: async (message: string, title = "¿Estás seguro?") => {
    const result = await SwalTheme.fire({
      icon: "warning",
      title,
      text: message,
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
      iconColor: "#f59e0b"
    });

    return result.isConfirmed;
  }
};