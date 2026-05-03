"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userString = localStorage.getItem("user");

    if (userString) {
      try {
        setUser(JSON.parse(userString));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
  };

  return (
    <div
      style={{
        height: "60px",
        background: "white",
        borderBottom: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
      }}
    >
      <h3>Sistema Fútbol ⚽</h3>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {user ? (
          <>
            <span>👤 {user.username}</span>
            <button onClick={logout}>Cerrar sesión</button>
          </>
        ) : (
          <span>No logueado</span>
        )}
      </div>
    </div>
  );
}