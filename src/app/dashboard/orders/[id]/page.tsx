import connectToDatabase from "@/lib/mongoose";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import BackButton from "@/components/globals/BackButton";
import Image from "next/image";
import Link from "next/link";

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }

  await connectToDatabase();
  const resolvedParams = await params;
  
  const order = await Order.findById(resolvedParams.id).lean();
  
  if (!order) {
    return (
      <div className="p-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <BackButton />
      </div>
    );
  }

  // Security: only owner or admin can view
  if (order.user.toString() !== session.user.id && session.user.role !== 'admin') {
    return (
      <div className="p-12 text-center text-red-500">
        <h1 className="text-2xl font-bold mb-4">Unauthorized</h1>
        <p>You don't have permission to view this order.</p>
        <BackButton />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return "text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400";
      case 'cancelled':
        return "text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "text-amber-700 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400";
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <BackButton />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
            Order Details
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Order ID: <span className="font-mono text-foreground">{order._id.toString()}</span>
          </p>
        </div>
        <div className={`px-4 py-2 rounded-full font-bold uppercase tracking-wider text-sm ${getStatusColor(order.status)}`}>
          {order.status}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6">
            <h2 className="text-lg font-bold mb-4 border-b border-gray-200 dark:border-zinc-800 pb-2">Items Ordered</h2>
            <div className="divide-y divide-gray-100 dark:divide-zinc-800">
              {order.items.map((item: any, idx: number) => (
                <div key={idx} className="py-4 flex gap-4 items-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                    {item.image?.startsWith('http') ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl">{item.image || "📦"}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <Link href={`/product/${item.product.toString()}`} className="font-medium text-foreground hover:text-primary transition-colors line-clamp-1">
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-bold text-foreground">
                    ${(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-zinc-800 flex justify-between items-center text-lg font-bold">
              <span>Total Amount</span>
              <span>${order.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6">
            <h2 className="text-lg font-bold mb-4 border-b border-gray-200 dark:border-zinc-800 pb-2">Shipping Information</h2>
            <div className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
              <p><span className="font-medium text-foreground">Name:</span> {order.shippingAddress.fullName}</p>
              <p><span className="font-medium text-foreground">Phone:</span> {order.shippingAddress.phone}</p>
              <p><span className="font-medium text-foreground">Address:</span> {order.shippingAddress.address}, {order.shippingAddress.city}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6">
            <h2 className="text-lg font-bold mb-4 border-b border-gray-200 dark:border-zinc-800 pb-2">Payment Details</h2>
            <div className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
              <p><span className="font-medium text-foreground">Method:</span> {order.paymentMethod}</p>
              <p><span className="font-medium text-foreground">Date:</span> {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
