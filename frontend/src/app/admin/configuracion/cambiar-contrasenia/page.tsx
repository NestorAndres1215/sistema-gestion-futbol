"use client";

import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import ActionButton from "@/shared/components/ui/button/button";
import styles from "@/shared/styles/form.module.css";
import UsePasswordEdit from "@/features/auth/hooks/usePasswordEdit";

export default function CambiarContraseniaPage() {
    const {
        cambiarPassword, limpiarForm,
        handleChange, setShowPasswords,
        showPasswords, user, form
    } = UsePasswordEdit();

    return (
        <AdminLayout>

            <Breadcrumb
                items={[
                    { label: "Configuracion", href: "/admin/configuracion", },
                    { label: "Cambiar Contraseña", },
                ]}
            />

            <div className={styles.card}>

                <div className={styles.cardHead}>
                    <p className={styles.cardName}>
                        Cambiar Contraseña
                    </p>
                </div>

                <form noValidate className={styles.form}        >
                    <div className="row g-3">
                        <div className="col-12 col-md-6">
                            <div className="d-flex flex-column gap-2 w-100">

                                <label className={styles.label}>
                                    Usuario
                                </label>

                                <div className={styles.inputWrap}>

                                    <input
                                        value={user?.nombre ?? ""}
                                        disabled
                                        className={styles.input}
                                    />

                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="d-flex flex-column gap-2 w-100">

                                <label className={styles.label}>
                                    Contraseña Actual
                                </label>

                                <div className={styles.inputWrap}>

                                    <input
                                        value={form.passwordActual}
                                        onChange={(e) =>
                                            handleChange("passwordActual", e.target.value)}
                                        placeholder="Ingrese contraseña actual"
                                        type={showPasswords.actual ? "text" : "password"}
                                        className={styles.input}
                                    />

                                    <button
                                        type="button"
                                        className={styles.toggleBtn}
                                        onClick={() => setShowPasswords((prev) => ({ ...prev, actual: !prev.actual, }))}
                                    >
                                        <i className={showPasswords.actual ? "fa fa-eye-slash" : "fa fa-eye"} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="d-flex flex-column gap-2 w-100">

                                <label className={styles.label}>
                                    Nueva Contraseña
                                </label>

                                <div className={styles.inputWrap}>

                                    <input
                                        value={form.passwordNueva}
                                        onChange={(e) => handleChange("passwordNueva", e.target.value)}
                                        placeholder="Ingrese nueva contraseña"
                                        type={showPasswords.nueva ? "text" : "password"}
                                        className={styles.input}
                                    />

                                    <button
                                        type="button"
                                        className={styles.toggleBtn}
                                        onClick={() => setShowPasswords((prev) => ({ ...prev, nueva: !prev.nueva, }))}                >
                                        <i className={showPasswords.nueva ? "fa fa-eye-slash" : "fa fa-eye"} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="d-flex flex-column gap-2 w-100">

                                <label className={styles.label}>
                                    Confirmar Contraseña
                                </label>

                                <div className={styles.inputWrap}>

                                    <input
                                        value={form.passwordConfirmacion}
                                        onChange={(e) => handleChange("passwordConfirmacion", e.target.value)}
                                        placeholder="Confirme contraseña"
                                        type={showPasswords.confirmacion ? "text" : "password"}
                                        className={styles.input}
                                    />

                                    <button
                                        type="button"
                                        className={styles.toggleBtn}
                                        onClick={() => setShowPasswords((prev) => ({ ...prev, confirmacion: !prev.confirmacion, }))}
                                    >
                                        <i className={showPasswords.confirmacion ? "fa fa-eye-slash" : "fa fa-eye"} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-2 mt-3">
                        <div className="col-12 col-sm-6">
                            <ActionButton mode="clear" onClick={limpiarForm} />
                        </div>

                        <div className="col-12 col-sm-6">
                            <ActionButton mode="update" onClick={cambiarPassword} />
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}