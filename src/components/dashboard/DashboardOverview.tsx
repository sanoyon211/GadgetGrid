"use client";

import { Package, Clock, ShieldCheck, CreditCard, UserCircle } from "lucide-react";
import SalesChart from "./SalesChart";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DashboardOverview() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch("/api/dashboard");
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (session?.user) {
      fetchDashboardData();
    }
  }, [session]);

  const adminStats = [
    { title: "Total Users", value: data?.totalUsers || "0", icon: UserCircle },
    { title: "Total Products", value: data?.totalProducts || "0", icon: Package },
    { title: "Total Sales", value: `$${data?.totalSales?.toLocaleString() || "0"}`, icon: CreditCard },
    { title: "Pending Orders", value: data?.pendingOrders || "0", icon: Clock },
  ];

  const userStats = [
    { title: "Total Orders", value: data?.totalOrders || "0", icon: Package },
    { title: "Pending Delivery", value: data?.pendingDelivery || "0", icon: Clock },
    { title: "Total Spent", value: `$${data?.totalSpent?.toLocaleString() || "0"}`, icon: ShieldCheck },
    { title: "Reward Points", value: data?.rewardPoints?.toLocaleString() || "0", icon: CreditCard },
  ];

  const stats = isAdmin ? adminStats : userStats;

  const getProgress = (status: string) => {
    switch (status) {
      case 'pending': return '10%';
      case 'processing': return '33%';
      case 'shipped': return '66%';
      case 'delivered': return '100%';
      case 'cancelled': return '100%';
      default: return '0%';
    }
  };

  if (loading) {
    return <div className="animate-pulse space-y-8 mt-4">
      <div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded-none w-1/3"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => <div key={i} className="h-32 bg-gray-200 dark:bg-zinc-800 rounded-none"></div>)}
      </div>
      <div className="h-64 bg-gray-200 dark:bg-zinc-800 rounded-none w-full"></div>
    </div>;
  }

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
            {data?.latestOrder ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-20 h-20 bg-gray-100 dark:bg-zinc-900 flex items-center justify-center shrink-0">
                {data.latestOrder.items?.[0]?.image ? (
                  <img src={data.latestOrder.items[0].image} alt="Product" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl opacity-50 text-foreground">📦</span>
                )}
              </div>
              <div className="flex-1 w-full">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading text-xl text-foreground line-clamp-1">{data.latestOrder.items?.[0]?.name || "Your Order"}</h3>
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground border border-gray-200 dark:border-zinc-800 shrink-0">
                    {data.latestOrder.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-4 tracking-wider">ORDER #{data.latestOrder._id.slice(-6).toUpperCase()}</p>
                <div className="w-full bg-gray-100 dark:bg-zinc-900 h-1">
                  <div className={`bg-${data.latestOrder.status === 'cancelled' ? 'red-500' : 'foreground'} h-1`} style={{ width: getProgress(data.latestOrder.status) }}></div>
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-3">Date: {new Date(data.latestOrder.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            ) : (
              <p className="text-sm text-gray-500">No recent orders found.</p>
            )}
          </div>
        ) : (
          <div className="bg-transparent border border-gray-200 dark:border-zinc-800 p-8">
            <h2 className="text-xs uppercase tracking-widest font-bold text-foreground mb-8">Recent Activities</h2>
            <div className="space-y-4">
              {data?.recentActivities?.length > 0 ? (
                data.recentActivities.map((activity: any) => (
                  <div key={activity.id} className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{activity.title}</span>
                    <span className="text-xs text-gray-400">{new Date(activity.time).toLocaleDateString()}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No recent activities.</p>
              )}
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

        {/* Overview Chart (Sales for Admin, Spending for User) */}
        <div className="bg-transparent border border-gray-200 dark:border-zinc-800 p-8 lg:col-span-2">
          <h2 className="text-xs uppercase tracking-widest font-bold text-foreground mb-2">
            {isAdmin ? "Sales Overview" : "Spending Overview"}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {isAdmin ? "Your revenue stream over the last 6 months." : "Your spending over the last 6 months."}
          </p>
          <SalesChart data={isAdmin ? (data?.salesData || []) : (data?.spendingData || [])} />
        </div>

      </div>
    </div>
  );
}
