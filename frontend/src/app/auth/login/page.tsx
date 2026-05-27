"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { useAuthRedirect } from "@/features/auth/hooks/useAuthRedirect";
import styles from "@/features/auth/styles/login.module.css";
import ActionButton from "@/shared/components/ui/button/button";
import { SwalService } from "@/shared/lib/swal/swal.service";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { submitLogin, registrar } = useLogin();

    useAuthRedirect();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            SwalService.loading("Iniciando sesión...");

            const data = await submitLogin(email, password);

            const role = data.rol;
            const user = data.username;

            document.cookie = `token=${data.token}; path=/`;
            document.cookie = `role=${role}; path=/`;
            document.cookie = `user=${user}; path=/`;

            SwalService.close();

            if (role === "admin") {
                router.replace("/admin/dashboard");
            } else {
                router.replace("/user/dashboard");
            }

        } catch (error) {
            SwalService.error("Correo o contraseña incorrectos");
        } finally {
            setLoading(false);
        }
    };


    return (

        <div className={styles.page}>

            <div className="d-flex align-items-center gap-3 mb-4">
                <div className={styles.logoMark}>
                    <i className="fa-solid fa-futbol" />
                </div>

                <div className={styles.logoName}>
                    Football <br />Manager
                </div>
            </div>

            <div className={styles.card}>

                <div className="mb-4">
                    <div className={styles.cardTitle}>Bienvenidos</div>
                    <div className={styles.cardSub}>
                        Ingresa tus credenciales para continuar
                    </div>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className={styles.label}>
                            Correo electrónico
                        </label>

                        <div className={styles.inputWrap}>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Ingrese correo"
                                className={styles.input}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className={styles.label}>
                            Contraseña
                        </label>

                        <div className={styles.inputWrap}>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Ingrese contraseña"
                                type={showPassword ? "text" : "password"}
                                className={styles.input}
                            />

                            <button
                                type="button"
                                className={styles.toggleBtn}
                                onClick={() => setShowPassword((p) => !p)} >
                                <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"} />
                            </button>
                        </div>

                        <div className="d-flex justify-content-end mt-3">
                            <a href="/forgot-password"
                                className={styles.forgot}>
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </div>


                    <div className="d-flex flex-column gap-3">
                        <ActionButton mode="login" type="submit" />

                        <ActionButton
                            mode="create"
                            type="button"
                            onClick={registrar}
                        />
                    </div>
                </form>
            </div>
        </div>

    );
}