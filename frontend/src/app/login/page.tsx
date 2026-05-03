"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth.service";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checking, setChecking] = useState(true);

    // 🔐 evitar entrar si ya está logueado (middleware también lo refuerza)
    useEffect(() => {
        const hasCookie = document.cookie.includes("token=");

        if (hasCookie) {
            router.replace("/dashboard");
        } else {
            setChecking(false);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data = await login(email, password);
            document.cookie = `token=${data.token}; path=/`;

            router.replace("/dashboard");

        } catch (error) {
            alert("Credenciales incorrectas ❌");
        }
    };


    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                    className="form-control mb-2"
                />

                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    type="password"
                    className="form-control mb-3"
                />

                <button className="btn btn-primary w-100">
                    Login
                </button>
            </form>
        </div>
    );
}