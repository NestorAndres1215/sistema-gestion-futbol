"use client";

import useRegisterUser from "@/features/auth/hooks/useRegisterUser";
import styles from "@/features/auth/styles/login.module.css";
import ActionButton from "@/shared/components/ui/button/button";

export default function RegisterPage() {
    const {
        form,
        handleChange,
        registrar,
        showPassword,
        setShowPassword
    } = useRegisterUser();

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

                    <div className={styles.cardTitle}>
                        Crear Cuenta
                    </div>

                    <div className={styles.cardSub}>
                        Completa tus datos para registrarte
                    </div>

                </div>

                <form noValidate>

                    <div className="mb-3">
                        <label className={styles.label}>
                            Nombre de usuario
                        </label>
                        <div className={styles.inputWrap}>
                            <input
                                value={form.username}
                                onChange={(e) =>
                                    handleChange("username", e.target.value)
                                }
                                placeholder="Ingrese usuario"
                                className={styles.input}
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className={styles.label}>
                            Correo electrónico
                        </label>
                        <div className={styles.inputWrap}>
                            <input
                                value={form.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                placeholder="Ingrese correo"
                                className={styles.input}
                            />
                        </div>
                    </div>

                    <div className="mb-4">

                        <label className={styles.label}>
                            Contraseña
                        </label>

                        <div className={styles.inputWrap}>

                            <input
                                value={form.password}
                                onChange={(e) => handleChange("password", e.target.value)}
                                placeholder="Ingrese contraseña"
                                type={showPassword ? "text" : "password"}
                                className={styles.input}
                            />

                            <button
                                type="button"
                                className={styles.toggleBtn}
                                onClick={() => setShowPassword((p) => !p)}
                            >
                                <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"} />
                            </button>

                        </div>
                    </div>

                    <div className="d-flex flex-column gap-3">

                        <ActionButton mode="create" onClick={registrar} />

                        <ActionButton mode="volver" type="button"
                            onClick={() => window.history.back()} />

                    </div>
                </form>
            </div>
        </div>
    );
}