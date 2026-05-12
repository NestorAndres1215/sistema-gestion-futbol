"use client";

import { usePathname } from "next/navigation";
import styles from "./layout.module.css";
import Topbar from "./topbar/topbar";
import Sidebar from "./sidebar/sidebar";
import { Props } from "./types/layout-props";

export default function AdminLayout({
  children,
  pageTitle = "Dashboard",
  pageSubtitle = "Bienvenido de nuevo",
}: Props) {
  const pathname = usePathname();

  return (
    <div className={styles.shell}>
      <Sidebar pathname={pathname} />
      <div className={styles.main}>
        <Topbar title={pageTitle} subtitle={pageSubtitle} />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}