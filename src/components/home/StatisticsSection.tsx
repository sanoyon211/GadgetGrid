"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, ShoppingBag, Award, TrendingUp } from 'lucide-react';

const data = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 7500 },
];

const stats = [
  { id: 1, name: 'Active Users', value: '100K+', icon: Users },
  { id: 2, name: 'Products Sold', value: '250K+', icon: ShoppingBag },
  { id: 3, name: 'Awards Won', value: '15+', icon: Award },
  { id: 4, name: 'Growth', value: '200%', icon: TrendingUp },
];

export default function StatisticsSection() {
  return (
    <section className="py-24 bg-[var(--accent)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat) => {
            return (
              <div key={stat.id} className="flex flex-col items-center">
                <div className="text-5xl font-heading font-medium text-foreground mb-4">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-gray-500">{stat.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
