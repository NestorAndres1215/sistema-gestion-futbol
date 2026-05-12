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
        style: styles.delete,
    },
    cancelar: {
        text: "Cancelar",
        icon: "fa-solid fa-xmark",
        style: styles.delete,
    },
};