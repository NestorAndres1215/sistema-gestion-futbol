"use client";

import { login } from "../services/auth.service";

export const useLogin = () => {
    const submitLogin = async (email: string, password: string) => {
        const data = await login(email, password);
        document.cookie = `token=${data.token}; path=/`;
        return data;
    };



    return { submitLogin, };
};