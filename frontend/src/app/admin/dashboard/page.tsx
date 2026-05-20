"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authGuard } from "@/features/auth/guards/token.guard";
import AdminLayout from "@/shared/components/layout/admin/layout";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (!authGuard()) router.push("/auth/login");
  }, []);

  return (
    <AdminLayout pageTitle="Dashboard" pageSubtitle="Temporada 2025 / 2026">
      <div className="d-flex flex-column gap-3">


      </div>
    </AdminLayout>
  );
}