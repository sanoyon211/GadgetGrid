"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Check if current route is an admin/dashboard route
  const isAdmin = pathname?.startsWith("/dashboard") || pathname?.startsWith("/items");

  return (
    <>
      {!isAdmin && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdmin && <Footer />}
    </>
  );
}
