"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authGuard } from "@/utils/guard";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!authGuard()) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="container mt-5">
      <h1>Dashboard 🔥</h1>
    </div>
  );
}