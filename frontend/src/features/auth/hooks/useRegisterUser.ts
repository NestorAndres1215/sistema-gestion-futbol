import { SwalService } from "@/shared/lib/swal/swal.service";
import { addUser } from "../services/auth.service";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useRegisterUser() {
    const router = useRouter();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (key: string, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };
    const registrar = async () => {

        try {

            await addUser(form);

            SwalService.success("Usuario registrado exitosamente");

            router.back();

        }
        catch (error: any) {

            SwalService.error(error.message);

        }
    };
    const limpiarForm = () => {
        setForm({
            username: "",
            email: "",
            password: "",
        }

        );
    };
    return {
        form,
        handleChange,
        registrar, limpiarForm,
        showPassword,
        setShowPassword
    }
}