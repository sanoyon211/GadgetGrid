import connectToDatabase from "@/lib/mongoose";
import Gadget from "@/models/Gadget";
import Link from "next/link";
import { Plus } from "lucide-react";
import DeleteButton from "@/components/dashboard/DeleteButton";

export default async function ManageProductsPage() {
  await connectToDatabase();
  const gadgets = await Gadget.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-gray-100 dark:border-zinc-900 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Products</h2>
        <Link href="/dashboard/add-product" className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-zinc-800 text-sm font-medium text-gray-500">
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
            {gadgets.map((gadget: any) => (
              <tr key={gadget._id.toString()} className="hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-xl">
                      {gadget.images[0] || "📦"}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white line-clamp-1">{gadget.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-500">{gadget.category}</td>
                <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">${gadget.price}</td>
                <td className="py-4 px-4 text-gray-500">{gadget.stock}</td>
                <td className="py-4 px-4 text-right">
                  <DeleteButton id={gadget._id.toString()} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {gadgets.length === 0 && (
          <div className="py-12 text-center text-gray-500">No products found.</div>
        )}
      </div>
    </div>
  );
}
