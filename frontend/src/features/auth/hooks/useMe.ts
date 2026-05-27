import { useEffect, useState } from "react";
import { getMe } from "@/features/auth/services/auth.service";

export const useMe = () => {
    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getMe();
                setUser(data);
            } catch (err) {
                setError(err);
            }
        };
        fetchUser();
    }, []);

    return { user, error };
};