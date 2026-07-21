"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Heart, Settings, LogOut, UserCircle, Home, Package, Users, MessageSquare, Ticket, Mail, PieChart, Menu, X } from "lucide-react";
import { toast } from "sonner";
import { useSession, signOut } from "next-auth/react";

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const menuItems = isAdmin ? [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Manage Products", icon: Package, href: "/dashboard/products" },
    { name: "Manage Orders", icon: ShoppingBag, href: "/dashboard/admin/orders" },
    { name: "Manage Users", icon: Users, href: "/dashboard/admin/users" },
    { name: "Manage Reviews", icon: MessageSquare, href: "/dashboard/admin/reviews" },
    { name: "Coupons", icon: Ticket, href: "/dashboard/admin/coupons" },
    { name: "Support Messages", icon: Mail, href: "/dashboard/admin/messages" },
    { name: "Analytics", icon: PieChart, href: "/dashboard/admin/analytics" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
  ] : [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "My Orders", icon: ShoppingBag, href: "/dashboard/orders" },
    { name: "Wishlist", icon: Heart, href: "/dashboard/wishlist" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
    toast.success("Logged out successfully");
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden sticky top-0 z-40 w-full bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsOpen(true)} className="p-2 -ml-2 text-gray-500 hover:text-foreground hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="font-semibold text-foreground tracking-tight">Dashboard</h2>
        </div>
        <Link href="/" className="p-2 -mr-2 text-gray-500 hover:text-foreground hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors">
          <Home className="w-5 h-5" />
        </Link>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Sidebar Drawer */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 lg:w-64 bg-white dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:h-screen lg:sticky lg:top-0 overflow-y-auto p-6 flex flex-col shadow-2xl lg:shadow-none`}>
        
        {/* Mobile Close Button */}
        <div className="lg:hidden absolute top-4 right-4">
          <button onClick={() => setIsOpen(false)} className="p-2 text-gray-500 hover:text-foreground hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

      {/* User Profile Summary */}
      <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100 dark:border-zinc-900 mt-4 lg:mt-0">
        <div className="w-12 h-12 rounded-none bg-gray-100 dark:bg-zinc-900 text-foreground flex items-center justify-center shrink-0 overflow-hidden">
          {session?.user?.image ? (
            <img src={session.user.image} alt={session.user.name || "User"} className="w-full h-full object-cover" />
          ) : (
            <UserCircle className="w-7 h-7" />
          )}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{session?.user?.name || "Loading..."}</h3>
          <p className="text-sm text-gray-500 line-clamp-1">{session?.user?.email}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-4 px-4 py-3 transition-all font-medium text-sm border-l-2 ${
                isActive
                  ? "border-foreground text-foreground bg-gray-50 dark:bg-zinc-900/50"
                  : "border-transparent text-gray-500 hover:text-foreground hover:bg-gray-50 dark:hover:bg-zinc-900/50"
              }`}
            >
              <item.icon className={`w-4 h-4 ${isActive ? "text-foreground" : "text-gray-400"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="flex-1"></div>

      {/* Back to Home & Logout */}
      <div className="mt-8 pt-8 border-t border-gray-100 dark:border-zinc-900 space-y-2">
        <Link
          href="/"
          className="w-full flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-foreground hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors font-medium text-sm border-l-2 border-transparent"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-foreground hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors font-medium text-sm border-l-2 border-transparent"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      </div>
    </>
  );
}
