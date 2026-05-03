"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authGuard } from "@/utils/guard";

import AdminLayout from "../layout/AdminLayout";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!authGuard()) {
      router.push("/auth/login");
    }
  }, []);

return (
    <AdminLayout>
      <h1>Dashboard</h1>
    </AdminLayout>
  );
}