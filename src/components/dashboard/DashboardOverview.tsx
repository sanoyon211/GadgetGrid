import { Package, Clock, ShieldCheck, CreditCard } from "lucide-react";
import SalesChart from "./SalesChart";

export default function DashboardOverview() {
  const stats = [
    { title: "Total Orders", value: "12", icon: Package, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Pending Delivery", value: "2", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
    { title: "Active Warranty", value: "5", icon: ShieldCheck, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "Reward Points", value: "1,250", icon: CreditCard, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, John!
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Here is what's happening with your account today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 transition-all hover:shadow-md hover:-translate-y-1">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Order Status */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Latest Order Status</h2>
          <div className="flex items-center gap-4 p-4 border border-blue-100 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/10 rounded-xl">
            <div className="w-16 h-16 bg-white dark:bg-black rounded-lg flex items-center justify-center shrink-0 shadow-sm">
              <span className="text-3xl">📱</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">iPhone 15 Pro Max</h3>
                <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 rounded-full shrink-0">
                  Shipped
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-2">Order #ORD-84920</p>
              <div className="w-full bg-gray-200 dark:bg-zinc-800 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full w-2/3"></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Expected delivery: Tomorrow</p>
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Account Information</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800">
              <span className="text-sm text-gray-500">Name</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">John Doe</span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800">
              <span className="text-sm text-gray-500">Email Address</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">john@example.com</span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800">
              <span className="text-sm text-gray-500">Phone Number</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">+1 (555) 123-4567</span>
            </div>
          </div>
        </div>

        {/* Sales Overview Chart */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Sales Overview</h2>
          <p className="text-sm text-gray-500">Your revenue stream over the last 7 months.</p>
          <SalesChart />
        </div>

      </div>
    </div>
  );
}
