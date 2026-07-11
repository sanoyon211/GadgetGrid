import { Eye, Download } from "lucide-react";

export default function OrderHistory() {
  const orders = [
    {
      id: "ORD-84920",
      date: "Oct 12, 2026",
      items: 1,
      total: 1199.00,
      status: "Shipped",
      statusColor: "text-amber-700 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400"
    },
    {
      id: "ORD-73921",
      date: "Sep 28, 2026",
      items: 3,
      total: 4208.76,
      status: "Delivered",
      statusColor: "text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400"
    },
    {
      id: "ORD-62104",
      date: "Aug 15, 2026",
      items: 1,
      total: 249.50,
      status: "Delivered",
      statusColor: "text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400"
    },
    {
      id: "ORD-51922",
      date: "Jul 02, 2026",
      items: 2,
      total: 89.99,
      status: "Cancelled",
      statusColor: "text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400"
    }
  ];

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

      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
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
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    ${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="p-2 text-gray-500 hover:text-primary bg-gray-100 hover:bg-primary/10 dark:bg-zinc-800 dark:hover:bg-primary/20 rounded-lg transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-primary bg-gray-100 hover:bg-primary/10 dark:bg-zinc-800 dark:hover:bg-primary/20 rounded-lg transition-colors" title="Download Invoice">
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
    </div>
  );
}
