
import { SwalService } from "@/shared/lib/swal/swal.service";
import { api, API_URL } from "@/shared/services/api-client";

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

export const addUser= async (data: any) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};