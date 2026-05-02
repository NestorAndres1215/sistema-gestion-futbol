"use client";

import { getUser, logout } from "@/utils/token";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const user = getUser(); // ahora sí funciona

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">Sistema</span>

      <div className="d-flex align-items-center gap-3 text-white">
        {user ? (
          <>
            <span>{user.username}</span>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                logout();
                router.push("/login");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <span>No logueado</span>
        )}
      </div>
    </nav>
  );
}