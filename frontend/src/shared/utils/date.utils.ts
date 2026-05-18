export const formatDate = (date?: string) => {
    if (!date) return "-";

    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
};

export const formatDateInput = (date?: string) => {
  if (!date) return "";
  return date.split("T")[0];
};


const hoy = new Date();

export const maxFechaNacimiento = new Date(
    hoy.getFullYear() - 18,
    hoy.getMonth(),
    hoy.getDate()
).toISOString().split("T")[0];