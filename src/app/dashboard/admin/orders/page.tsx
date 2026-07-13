"use client";

import { useState, useEffect } from "react";
import { Eye, X } from "lucide-react";
import { toast } from "sonner";

export default function ManageOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

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
    <div className="bg-transparent relative">
      <div className="mb-8 pb-4 border-b border-gray-200 dark:border-zinc-800">
        <h2 className="text-2xl font-heading font-bold text-foreground">Manage Orders</h2>
        <p className="text-sm text-gray-500 mt-2">View and update customer order statuses.</p>
      </div>

      <div className="overflow-x-auto">
        {/* Desktop Table View */}
        <table className="hidden md:table w-full text-left border-collapse">
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
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="p-3 text-gray-400 hover:text-primary transition-colors border border-transparent hover:border-primary/20 rounded-none min-w-[44px] min-h-[44px] flex items-center justify-center"
                      title="View Order Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <select 
                      className="text-sm border border-gray-200 dark:border-zinc-800 bg-transparent text-foreground px-3 py-2 rounded-none h-12"
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Card View */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {orders.map((order: any) => (
            <div key={`mobile-${order._id}`} className="bg-white dark:bg-zinc-950 p-4 border border-gray-200 dark:border-zinc-800 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-widest">Order ID</span>
                  <div className="font-mono text-sm font-bold text-foreground">{order._id.slice(-6).toUpperCase()}</div>
                </div>
                <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest border
                  ${order.status === 'delivered' ? 'border-green-500 text-green-500' : 
                    order.status === 'cancelled' ? 'border-red-500 text-red-500' : 
                    'border-gray-300 text-gray-500'}
                `}>
                  {order.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-xs text-gray-500 block mb-1">Customer</span>
                  <div className="font-medium">{order.shippingAddress?.fullName}</div>
                  <div className="text-xs text-gray-500">{order.shippingAddress?.phone}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500 block mb-1">Date</span>
                  <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-zinc-800">
                <span className="font-bold text-foreground">${order.totalAmount.toLocaleString()}</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="p-2 text-gray-400 hover:text-primary transition-colors border border-transparent hover:border-primary/20 rounded-none min-w-[44px] min-h-[44px] flex items-center justify-center"
                    title="View Order Details"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <select 
                    className="text-sm border border-gray-200 dark:border-zinc-800 bg-transparent text-foreground px-2 py-1 rounded-none h-12"
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
        {orders.length === 0 && (
          <div className="py-12 text-center text-gray-500">No orders found.</div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-950 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-none shadow-2xl border border-gray-100 dark:border-zinc-900">
            <div className="sticky top-0 bg-white dark:bg-zinc-950 px-6 py-4 border-b border-gray-100 dark:border-zinc-900 flex items-center justify-between z-10">
              <h3 className="text-lg font-bold">Order Details: <span className="font-mono text-primary">{selectedOrder._id.slice(-6).toUpperCase()}</span></h3>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Shipping Address</h4>
                  <div className="bg-gray-50 dark:bg-zinc-900/50 p-4 rounded-none text-sm space-y-1 text-gray-700 dark:text-gray-300">
                    <p className="font-bold text-foreground">{selectedOrder.shippingAddress?.fullName}</p>
                    <p>{selectedOrder.shippingAddress?.address}</p>
                    <p>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.postalCode}</p>
                    <p>{selectedOrder.shippingAddress?.country}</p>
                    <p className="pt-2 text-xs">Phone: {selectedOrder.shippingAddress?.phone}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Order Info</h4>
                  <div className="bg-gray-50 dark:bg-zinc-900/50 p-4 rounded-none text-sm space-y-2 text-gray-700 dark:text-gray-300">
                    <p className="flex justify-between"><span>Date:</span> <span className="font-medium text-foreground">{new Date(selectedOrder.createdAt).toLocaleString()}</span></p>
                    <p className="flex justify-between"><span>Payment:</span> <span className="font-medium text-foreground uppercase">{selectedOrder.paymentMethod}</span></p>
                    <p className="flex justify-between"><span>Status:</span> <span className="font-bold text-primary uppercase">{selectedOrder.status}</span></p>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Order Items</h4>
                <div className="border border-gray-200 dark:border-zinc-800 rounded-none overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 dark:bg-zinc-900/80 border-b border-gray-200 dark:border-zinc-800">
                      <tr>
                        <th className="px-4 py-2 font-medium">Product</th>
                        <th className="px-4 py-2 font-medium text-right">Qty</th>
                        <th className="px-4 py-2 font-medium text-right">Price</th>
                        <th className="px-4 py-2 font-medium text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                      {selectedOrder.items?.map((item: any, idx: number) => (
                        <tr key={idx}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              {item.image && (
                                <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-none bg-gray-100" />
                              )}
                              <span className="font-medium">{item.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">{item.quantity}</td>
                          <td className="px-4 py-3 text-right">${item.price?.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right font-medium">${(item.price * item.quantity).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50 dark:bg-zinc-900/80 font-bold">
                      <tr>
                        <td colSpan={3} className="px-4 py-3 text-right">Grand Total:</td>
                        <td className="px-4 py-3 text-right text-primary">${selectedOrder.totalAmount?.toLocaleString()}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
