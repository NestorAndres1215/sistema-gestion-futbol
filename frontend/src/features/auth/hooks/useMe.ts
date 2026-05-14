import { useEffect, useState } from "react";
import { getMe } from "@/features/auth/services/auth.service";

export const useMe = () => {
    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getMe();
                console.log("ME RESPONSE:", data); // 🔥 IMPORTANTE
                setUser(data);
            } catch (err) {
                console.log("ERROR ME:", err);
                setError(err);
            }
        };

        fetchUser();
    }, []);

    return { user, error };
};