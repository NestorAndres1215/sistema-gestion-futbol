import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";


type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <main style={{ padding: "20px", flex: 1, background: "#f5f5f5" }}>
          {children}
        </main>

      </div>
    </div>
  );
}