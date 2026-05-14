"use client";
import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import styles from "@/shared/styles/form.module.css";
import ActionButton from "@/shared/components/ui/button/button";
import useRegisterUser from "@/features/auth/hooks/useRegisterUser";



export default function RegistroUsuarioPage() {

    const {
        form,
        handleChange,
        registrar, limpiarForm,
        showPassword,
        setShowPassword
    } = useRegisterUser();

    return (
        <AdminLayout>
            <Breadcrumb
                items={[
                    { label: "Configuracion", href: "/admin/configuracion" },
                    { label: "Registro Usuario" },
                ]}
            />
            <div className={styles.card}>
                <div className={styles.cardHead}>
                    <p className={styles.cardName}>
                        Formulario de Registro Admin
                    </p>
                </div>
                <form noValidate className={styles.form}>

                    <div className="d-flex flex-column gap-2 w-100">
                        <label className={styles.label}>Usuario</label>
                        <div className={styles.inputWrap}>
                            <input
                                type="text"
                                value={form.username}
                                onChange={(e) =>
                                    handleChange("username", e.target.value)
                                }
                                placeholder="Ingrese usuario"
                                className={styles.input}
                            />
                        </div>
                    </div>

                    <div className="d-flex flex-column gap-2 w-100">
                        <label className={styles.label}>Correo Electronico</label>
                        <div className={styles.inputWrap}>
                            <input
                                value={form.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                placeholder="Ingrese correo"
                                className={styles.input}
                            />
                        </div>
                    </div>
                    <div className="d-flex flex-column gap-2 w-100">
                        <label className={styles.label}>Contraseña</label>
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

                    <div className="row g-2 mt-3">
                        <div className="col-12 col-sm-6">
                            <ActionButton mode="clear" onClick={limpiarForm} />
                        </div>
                        <div className="col-12 col-sm-6">
                            <ActionButton mode="create" onClick={registrar} />
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}