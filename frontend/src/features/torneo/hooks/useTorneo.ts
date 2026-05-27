
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useTorneo() {
    const router = useRouter();
    const [tipo, setTipo] = useState<string>("");

    const handleSelectTipo = (value: string) => {
        setTipo(value);
        router.push(`/admin/torneo/tipo-torneo?tipo=${value}`);
    };

    return {
        tipo, handleSelectTipo
    }
}