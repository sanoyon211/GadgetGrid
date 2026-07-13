"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { toast } from "sonner";

const COLORS = ['#000000', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/admin/analytics"); 
      if (res.ok) {
        const result = await res.json();
        setData(result);
      }
    } catch (error) {
      toast.error("Failed to fetch analytics");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 animate-pulse text-gray-500">Loading analytics...</div>;
  }

  return (
    <div className="bg-transparent">
      <div className="mb-8 pb-4 border-b border-gray-200 dark:border-zinc-800">
        <h2 className="text-2xl font-heading font-bold text-foreground">Detailed Analytics</h2>
        <p className="text-sm text-gray-500 mt-2">In-depth view of your store's performance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-zinc-950 p-6 border border-gray-100 dark:border-zinc-900 rounded-lg shadow-sm">
          <h3 className="font-bold text-foreground mb-6">Revenue (Last 6 Months)</h3>
          <div className="h-72">
            {data?.revenueChart && data.revenueChart.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.revenueChart}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="revenue" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-foreground" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">Not enough data</div>
            )}
          </div>
        </div>

        {/* Category Chart */}
        <div className="bg-white dark:bg-zinc-950 p-6 border border-gray-100 dark:border-zinc-900 rounded-lg shadow-sm">
          <h3 className="font-bold text-foreground mb-6">Sales by Category</h3>
          <div className="h-72">
            {data?.categoryChart && data.categoryChart.some((d: any) => d.value > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.categoryChart.filter((d: any) => d.value > 0)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {data.categoryChart.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value}`} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">Not enough data</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
