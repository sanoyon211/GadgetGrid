"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Heart, Settings, LogOut, UserCircle } from "lucide-react";
import { toast } from "sonner";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "My Orders", icon: ShoppingBag, href: "/dashboard/orders" },
    { name: "Wishlist", icon: Heart, href: "/dashboard/wishlist" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  const handleLogout = () => {
    toast.success("Logged out successfully");
  };

  return (
    <div className="w-full lg:w-64 shrink-0 bg-white dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-800 lg:min-h-[calc(100vh-80px)] p-6">
      
      {/* User Profile Summary */}
      <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100 dark:border-zinc-900">
        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <UserCircle className="w-7 h-7" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">John Doe</h3>
          <p className="text-sm text-gray-500 line-clamp-1">john@example.com</p>
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
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-8 pt-8 border-t border-gray-100 dark:border-zinc-900">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors font-medium text-sm"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

    </div>
  );
}
