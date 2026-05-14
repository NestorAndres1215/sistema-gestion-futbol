import styles from "./button.module.css";

export const config = {
    create: {
        text: "Registrar",
        icon: "fa-solid fa-plus",
        style: styles.create,
    },
    update: {
        text: "Actualizar",
        icon: "fa-solid fa-pen",
        style: styles.update,
    },
    detail: {
        text: "Detalle",
        icon: "fa-solid fa-eye",
        style: styles.detail,
    },
    delete: {
        text: "Eliminar",
        icon: "fa-solid fa-trash",
        style: styles.delete,
    },
    clear: {
        text: "Limpiar",
        icon: "fa-solid fa-broom",
        style: styles.clear,
    },
    cancelar: {
        text: "Cancelar",
        icon: "fa-solid fa-xmark",
        style: styles.cancelar,
    },

    volver: {
        text: "Volver",
        icon: "fa-solid fa-arrow-left",
        style: styles.volver,
    },
    dashboard: {
        text: "Dashboard",
        icon: "fa-solid fa-gauge",
        style: styles.dashboard,
    },
    login: {
        text: "Iniciar Sesión",
        icon: "fa-solid fa-right-to-bracket",
        style: styles.login,
    },
};