"use client";

import { Package, Clock, ShieldCheck, CreditCard, UserCircle } from "lucide-react";
import SalesChart from "./SalesChart";
import { useSession } from "next-auth/react";

export default function DashboardOverview() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const adminStats = [
    { title: "Total Users", value: "24", icon: UserCircle },
    { title: "Total Products", value: "156", icon: Package },
    { title: "Total Sales", value: "$42,500", icon: CreditCard },
    { title: "Pending Orders", value: "8", icon: Clock },
  ];

  const userStats = [
    { title: "Total Orders", value: "12", icon: Package },
    { title: "Pending Delivery", value: "2", icon: Clock },
    { title: "Active Warranty", value: "5", icon: ShieldCheck },
    { title: "Reward Points", value: "1,250", icon: CreditCard },
  ];

  const stats = isAdmin ? adminStats : userStats;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {session?.user?.name?.split(' ')[0] || "User"}!
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Here is what's happening with your account today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-transparent border-t border-gray-200 dark:border-zinc-800 pt-6">
            <div className="flex items-center justify-between mb-4 text-gray-500">
              <p className="text-xs uppercase tracking-widest font-bold">{stat.title}</p>
              <stat.icon className="w-4 h-4" />
            </div>
            <h3 className="text-4xl font-heading font-normal text-foreground">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Quick Actions & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Conditional rendering based on role */}
        {!isAdmin ? (
          <div className="bg-transparent border border-gray-200 dark:border-zinc-800 p-8">
            <h2 className="text-xs uppercase tracking-widest font-bold text-foreground mb-8">Latest Order Status</h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 bg-gray-100 dark:bg-zinc-900 flex items-center justify-center shrink-0">
              <span className="text-2xl opacity-50 text-foreground">📱</span>
            </div>
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading text-xl text-foreground line-clamp-1">iPhone 15 Pro Max</h3>
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground border border-gray-200 dark:border-zinc-800 shrink-0">
                  Shipped
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-4 tracking-wider">ORDER #ORD-84920</p>
              <div className="w-full bg-gray-100 dark:bg-zinc-900 h-1">
                <div className="bg-foreground h-1 w-2/3"></div>
              </div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-3">Expected delivery: Tomorrow</p>
            </div>
          </div>
        </div>
        ) : (
          <div className="bg-transparent border border-gray-200 dark:border-zinc-800 p-8">
            <h2 className="text-xs uppercase tracking-widest font-bold text-foreground mb-8">Recent Activities</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">New user registered</span>
                <span className="text-xs text-gray-400">2 mins ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Order #84920 placed</span>
                <span className="text-xs text-gray-400">1 hour ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Product stock updated</span>
                <span className="text-xs text-gray-400">3 hours ago</span>
              </div>
            </div>
          </div>
        )}

        {/* Account Info */}
        <div className="bg-transparent border border-gray-200 dark:border-zinc-800 p-8">
          <h2 className="text-xs uppercase tracking-widest font-bold text-foreground mb-8">Account Information</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-zinc-800">
              <span className="text-xs uppercase tracking-widest text-gray-500">Name</span>
              <span className="text-sm text-foreground">{session?.user?.name || "Loading..."}</span>
            </div>
            <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-zinc-800">
              <span className="text-xs uppercase tracking-widest text-gray-500">Email Address</span>
              <span className="text-sm text-foreground">{session?.user?.email || "Loading..."}</span>
            </div>
            <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-zinc-800">
              <span className="text-xs uppercase tracking-widest text-gray-500">Role</span>
              <span className="text-sm text-foreground capitalize">{session?.user?.role || "User"}</span>
            </div>
          </div>
        </div>

        {/* Sales Overview Chart (Only for Admins) */}
        {isAdmin && (
          <div className="bg-transparent border border-gray-200 dark:border-zinc-800 p-8 lg:col-span-2">
            <h2 className="text-xs uppercase tracking-widest font-bold text-foreground mb-2">Sales Overview</h2>
            <p className="text-sm text-gray-500 mb-6">Your revenue stream over the last 7 months.</p>
            <SalesChart />
          </div>
        )}

      </div>
    </div>
  );
}
