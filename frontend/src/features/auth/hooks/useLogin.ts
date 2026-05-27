
import { useRouter } from "next/navigation";
import { login } from "../services/auth.service";

export const useLogin = () => {
    const router = useRouter();
    const submitLogin = async (email: string, password: string) => {
        const data = await login(email, password);
        document.cookie = `token=${data.token}; path=/`;
        return data;
    };

    const registrar = () => {
        router.push("/auth/register");
    }
    return { submitLogin, registrar};
};




