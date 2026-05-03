import Link from "next/link";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        background: "#111",
        color: "white",
        padding: "20px",
        height: "100vh",
      }}
    >
      <h2>Menu</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/admin/dashboard" style={{ color: "white", textDecoration: "none" }}>
            Dashboard
          </Link>
        </li>

        <li style={{ marginBottom: "10px" }}>
          <Link href="/admin/usuario" style={{ color: "white", textDecoration: "none" }}>
            Usuarios
          </Link>
        </li>

        <li>
          <Link href="/roles" style={{ color: "white", textDecoration: "none" }}>
            Roles
          </Link>
        </li>
      </ul>
    </div>
  );
}