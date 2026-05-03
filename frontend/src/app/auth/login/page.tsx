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
    const [showPassword, setShowPassword] = useState(false);
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
        <>
            <div className="lp-bg-blobs" aria-hidden="true">
                <div className="lp-blob lp-blob-1" />
                <div className="lp-blob lp-blob-2" />
            </div>
            <div className="lp-page">
                <div className="d-flex align-items-center gap-3 mb-4 ">
                    <div className="lp-logo-mark">
                        <i className="fa-solid fa-futbol"></i>
                    </div>
                    <div>
                        <div className="lp-logo-name">Football <br />Manager</div>
                    </div>
                </div>
                <div className="lp-card">
                    <div className="mb-4">
                        <div className="lp-card-title">Bienvenidos</div>
                        <div className="lp-card-sub">Ingresa tus credenciales para continuar</div>
                    </div>
                    <form onSubmit={handleSubmit}>


                        <div className="mb-3">

                            <label htmlFor="lp-email" className="lp-label">
                                Correo electrónico
                            </label>

                            <div className="lp-input-wrap">
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Ingrese correo"
                                    className="lp-input"
                                />
                            </div>

                        </div>
                        <div className="mb-3">
                            <label htmlFor="lp-password" className="lp-label">
                                Contraseña
                            </label>

                            <div className="lp-input-wrap">

                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Ingrese contraseña"
                                    type={showPassword ? "text" : "password"}
                                    className="lp-input"
                                />

                                <button
                                    type="button"
                                    className="lp-toggle-btn"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"} />
                                </button>
                            </div>
                            <div className="lp-forgot-row">
                                <a href="/forgot-password" className="lp-forgot">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="lp-btn-submit">
                            {loading
                                ? <i className="fa-solid fa-circle-notch lp-spin" />
                                : <i className="fa-solid fa-right-to-bracket" />
                            }
                            {loading ? "Verificando..." : "Iniciar sesión"}
                        </button>

                    </form>
                </div >
            </div >
        </>
    );
}