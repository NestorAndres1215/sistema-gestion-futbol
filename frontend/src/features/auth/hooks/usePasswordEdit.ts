import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMe } from "./useMe";
import { updatePassword } from "../services/auth.service";
import { SwalService } from "@/shared/lib/swal/swal.service";

export default function UsePasswordEdit() {

    const router = useRouter();
    const { user } = useMe();

    const [form, setForm] = useState({
        passwordActual: "",
        passwordNueva: "",
        passwordConfirmacion: "",
    });

    const [showPasswords, setShowPasswords] = useState({
        actual: false,
        nueva: false,
        confirmacion: false,
    });

    const handleChange = (key: string, value: string) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const limpiarForm = () => {
        setForm({
            passwordActual: "",
            passwordNueva: "",
            passwordConfirmacion: "",
        });
    };

    const cambiarPassword = async () => {

        try {
            await updatePassword(user.id, form);
            SwalService.success("Contraseña actualizar exitosamente");
            router.back();
        } catch (error: any) {
            SwalService.error(error.message);
        }
    };

    return {
        cambiarPassword, limpiarForm, handleChange, setShowPasswords,
        showPasswords, user, form

    }
}