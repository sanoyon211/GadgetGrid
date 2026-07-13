"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Heart, Settings, LogOut, UserCircle, Home, Package, Users, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const menuItems = isAdmin ? [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Manage Products", icon: Package, href: "/dashboard/products" },
    { name: "Manage Orders", icon: ShoppingBag, href: "/dashboard/admin/orders" },
    { name: "Manage Users", icon: Users, href: "/dashboard/admin/users" },
    { name: "Manage Reviews", icon: MessageSquare, href: "/dashboard/admin/reviews" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
  ] : [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Manage Products", icon: Package, href: "/dashboard/products" },
    { name: "My Orders", icon: ShoppingBag, href: "/dashboard/orders" },
    { name: "Wishlist", icon: Heart, href: "/dashboard/wishlist" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  const handleLogout = () => {
    toast.success("Logged out successfully");
  };

  return (
    <div className="w-full lg:w-64 shrink-0 bg-white dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-800 lg:h-screen lg:sticky lg:top-0 overflow-y-auto p-6 flex flex-col">
      
      {/* User Profile Summary */}
      <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100 dark:border-zinc-900">
        <div className="w-12 h-12 rounded-none bg-gray-100 dark:bg-zinc-900 text-foreground flex items-center justify-center shrink-0">
          <UserCircle className="w-7 h-7" />
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
  );
}
