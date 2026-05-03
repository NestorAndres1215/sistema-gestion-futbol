"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useLogin";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import "@/styles/login.css";


export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { submitLogin, loading } = useLogin();

    useAuthRedirect();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data = await submitLogin(email, password);

            const role = data.rol;
            const user = data.username;

            document.cookie = `token=${data.token}; path=/`;
            document.cookie = `role=${role}; path=/`;
            document.cookie = `user=${user}; path=/`;

            if (role === "admin") {
                console.log("ingreso")
                router.replace("/admin/dashboard");
            } else {
                router.replace("/user/dashboard");
            }
        } catch {
            alert("Credenciales incorrectas ❌");
        }
    };


    return (
        <div className="page">
            <div className="logoRow">
                <div className="logoMark">
                    <i className="fa-solid fa-check"></i>
                </div>
                <div>
                    <div className="logoName">Football <br />Manager</div>
                </div>
            </div>
            <div className="card">
                <div className="cardTittle">Bienvenidos</div>
                <div className="cardSub">Ingresa tus credenciales para continuar</div>

                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email"
                            className="form-control mb-2"
                        />
                    </div>
                    <div className="field">

                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                            type="password"
                            className="form-control mb-3"
                        />
                    </div>



                    <button disabled={loading} className="btn btn-primary w-100">
                        {loading ? "Cargando..." : "Login"}
                    </button>
                </form>
            </div>
        </div>

    );
}