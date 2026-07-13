"use client";

import { Eye, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";

export default function OrderHistory() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'admin';

  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        if (res.ok) {
          const data = await res.json();
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        toast.success("Order status updated");
        setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return "text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400";
      case 'cancelled':
        return "text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400";
      default: // pending, processing, shipped
        return "text-amber-700 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400";
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 dark:text-white mb-2">
            My Orders
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            View and track all your past and current orders.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center p-12 text-gray-500">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center p-12 border border-gray-200 dark:border-zinc-800 rounded-none">
          <p className="text-gray-500">You haven't placed any orders yet.</p>
        </div>
      ) : (

      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-zinc-950/50 border-b border-gray-200 dark:border-zinc-800">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">Order ID</th>
                <th scope="col" className="px-6 py-4 font-semibold">Date</th>
                <th scope="col" className="px-6 py-4 font-semibold">Items</th>
                <th scope="col" className="px-6 py-4 font-semibold">Total</th>
                <th scope="col" className="px-6 py-4 font-semibold">Status</th>
                <th scope="col" className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {order._id.substring(order._id.length - 8).toUpperCase()}
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                    {order.items.reduce((acc: number, item: any) => acc + item.quantity, 0)}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    ${order.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4">
                    {isAdmin ? (
                      <select 
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-none outline-none cursor-pointer ${getStatusColor(order.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-none-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/dashboard/orders/${order._id}`} className="p-2 text-gray-500 hover:text-primary bg-gray-100 hover:bg-primary/10 dark:bg-zinc-800 dark:hover:bg-primary/20 rounded-none transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button className="p-2 text-gray-500 hover:text-primary bg-gray-100 hover:bg-primary/10 dark:bg-zinc-800 dark:hover:bg-primary/20 rounded-none transition-colors" title="Download Invoice">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}
    </div>
  );
}
