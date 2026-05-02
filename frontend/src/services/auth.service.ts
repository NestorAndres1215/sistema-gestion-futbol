import { API_URL } from "./api.service";

export const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    if (!res.ok) {
        throw new Error("Credenciales incorrectas");
    }

    return await res.json();
};