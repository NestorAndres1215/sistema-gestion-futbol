
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuthRedirect = () => {
    const router = useRouter();

    useEffect(() => {
        const cookies = document.cookie;

        const hasToken = cookies.includes("token=");

        const role = cookies
            .split("; ")
            .find((row) => row.startsWith("role="))
            ?.split("=")[1];

        if (hasToken) {
            if (role === "admin") {
                router.replace("/admin/dashboard");
            } else {
                router.replace("/user/dashboard");
            }
        }
    }, [router]);
};