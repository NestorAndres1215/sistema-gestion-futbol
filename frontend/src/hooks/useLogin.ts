"use client";

import { useState } from "react";
import { login } from "@/services/auth.service";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);

    const submitLogin = async (email: string, password: string) => {
        setLoading(true);

        try {
            console.log(email , password)
            const data = await login(email, password);

            document.cookie = `token=${data.token}; path=/`;

            return data;
        } finally {
            setLoading(false);
        }
    };

    return {
        submitLogin,
        loading,
    };
};