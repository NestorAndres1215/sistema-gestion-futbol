"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth.service";
import { setToken, setUser } from "@/utils/token";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            // guardar token JWT
            const data = await login(email, password);

            setToken(data.token);
            setUser(data.user); // 🔥 guardamos usuario

            router.push("/dashboard");

            // redirigir al dashboard
            router.push("/dashboard");
        } catch (error) {
            alert("Credenciales incorrectas ❌");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            <h2 className="mb-3">Iniciar sesión</h2>

            <form onSubmit={handleSubmit}>
                <input
                    className="form-control mb-2"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn btn-primary w-100">
                    Login
                </button>
            </form>
        </div>
    );
}