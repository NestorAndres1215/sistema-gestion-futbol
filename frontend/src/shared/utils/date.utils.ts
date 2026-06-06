export const formatDate = (date?: string) => {
    if (!date) return "-";

    const d = new Date(date);

    return `${String(d.getDate()).padStart(2, "0")}-${String(
        d.getMonth() + 1
    ).padStart(2, "0")}-${d.getFullYear()}`;
};

export const formatDateInput = (date?: string) => {
    if (!date) return "";
    return date.split("T")[0];
};

const today = new Date();

export const fechaHoy = today.toISOString().split("T")[0];

export const fechaManana = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
)
    .toISOString()
    .split("T")[0];

export const maxFechaNacimiento = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
)
    .toISOString()
    .split("T")[0];