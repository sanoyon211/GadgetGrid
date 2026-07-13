"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isNoNav = pathname?.startsWith("/dashboard") || pathname?.startsWith("/items") || pathname === "/login" || pathname === "/register";

  return (
    <>
      {!isNoNav && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isNoNav && <Footer />}
    </>
  );
}
