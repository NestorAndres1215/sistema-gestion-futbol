"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authGuard } from "@/utils/guard";
import MainLayout from "../../layout/MainLayout";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!authGuard()) {
      router.push("/auth/login");
    }
  }, []);

return (
    <MainLayout>
      <h1>Dashboard</h1>
    </MainLayout>
  );
}