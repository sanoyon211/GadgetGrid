"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function ManageOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders"); 
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders);
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error("Failed to update status");
      
      toast.success("Order status updated!");
      fetchOrders();
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  if (isLoading) {
    return <div className="p-8 animate-pulse text-gray-500">Loading orders...</div>;
  }

  return (
    <div className="bg-transparent">
      <div className="mb-8 pb-4 border-b border-gray-200 dark:border-zinc-800">
        <h2 className="text-2xl font-heading font-bold text-foreground">Manage Orders</h2>
        <p className="text-sm text-gray-500 mt-2">View and update customer order statuses.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-foreground text-xs uppercase tracking-widest font-bold text-foreground">
              <th className="py-4 px-4 font-normal">Order ID</th>
              <th className="py-4 px-4 font-normal">Customer</th>
              <th className="py-4 px-4 font-normal">Date</th>
              <th className="py-4 px-4 font-normal">Total</th>
              <th className="py-4 px-4 font-normal">Status</th>
              <th className="py-4 px-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
            {orders.map((order: any) => (
              <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors">
                <td className="py-4 px-4 font-mono text-xs text-foreground">{order._id.slice(-6).toUpperCase()}</td>
                <td className="py-4 px-4">
                  <div className="text-sm font-medium text-foreground">{order.shippingAddress?.fullName}</div>
                  <div className="text-xs text-gray-500">{order.shippingAddress?.phone}</div>
                </td>
                <td className="py-4 px-4 text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="py-4 px-4 text-sm font-medium text-foreground">${order.totalAmount.toLocaleString()}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest border shrink-0
                    ${order.status === 'delivered' ? 'border-green-500 text-green-500' : 
                      order.status === 'cancelled' ? 'border-red-500 text-red-500' : 
                      'border-gray-300 text-gray-500'}
                  `}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-right space-x-2">
                  <select 
                    className="text-xs border border-gray-200 dark:border-zinc-800 bg-transparent text-foreground px-2 py-1 rounded"
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="py-12 text-center text-gray-500">No orders found.</div>
        )}
      </div>
    </div>
  );
}
