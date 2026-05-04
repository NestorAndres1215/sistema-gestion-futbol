import { SwalService } from "@/services/swal/swal.service";
import { API_URL } from "./api.service";


export const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json().catch(() => null);


    if (!res.ok) {
        const message = data?.message || data?.Message || "Error";

        SwalService.error(message);

        return;
    }

    return data;
};