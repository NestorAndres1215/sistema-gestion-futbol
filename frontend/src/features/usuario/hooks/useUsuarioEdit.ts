import { useParams, useRouter } from "next/navigation";
import { UsuarioModel } from "../types/usuario.types";
import { useEffect, useState } from "react";
import { getUserById, updateUser } from "../services/usuario.service";
import { SwalService } from "@/shared/lib/swal/swal.service";


export default function useUsuarioEdit() {

  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<UsuarioModel>({
    username: "",
    email: "",
    estado: "",
    rol: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserById(Number(id));
      setForm({
        username: res.username,
        email: res.email,
        estado: res.estado,
        rol: res.rol.nombre,
      });
      setLoading(false);
    };
    if (id) fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateUser(Number(id), form);
      router.push("/admin/usuario");
    } catch (error: any) {
      SwalService.error(error.message);
    }
  };

  const breadcrumbUsuarioEdit = [
    { label: "Usuario", href: "/admin/usuario" },
    { label: "Editar" },
  ];

  const initials = form.username
    ? form.username.slice(0, 2).toUpperCase()
    : "??";

  return {
    initials, id, form, breadcrumbUsuarioEdit,
    handleSubmit, handleChange,
  }

}