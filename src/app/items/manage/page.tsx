import connectToDatabase from "@/lib/mongoose";
import Gadget from "@/models/Gadget";
import Link from "next/link";
import { Plus } from "lucide-react";
import DeleteButton from "@/components/dashboard/DeleteButton";

import BackButton from "@/components/globals/BackButton";

export default async function ManageProductsPage() {
  await connectToDatabase();
  const gadgets = await Gadget.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="bg-transparent p-6">
      <BackButton />
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200 dark:border-zinc-800">
        <h2 className="text-2xl font-heading font-bold text-foreground">Manage Products</h2>
        <Link href="/items/add" className="flex items-center gap-2 bg-foreground text-background px-4 py-2 hover:bg-foreground/90 transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-foreground text-xs uppercase tracking-widest font-bold text-foreground">
              <th className="py-4 px-4 font-normal">Product</th>
              <th className="py-4 px-4 font-normal">Category</th>
              <th className="py-4 px-4 font-normal">Price</th>
              <th className="py-4 px-4 font-normal">Stock</th>
              <th className="py-4 px-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
            {gadgets.map((gadget: any) => (
              <tr key={gadget._id.toString()} className="hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-900 flex items-center justify-center text-xl overflow-hidden shrink-0">
                      {gadget.images[0]?.startsWith('http') ? (
                        <img src={gadget.images[0]} alt={gadget.name} className="w-full h-full object-cover" />
                      ) : (
                        gadget.images[0] || "📦"
                      )}
                    </div>
                    <span className="font-heading text-lg text-foreground line-clamp-1">{gadget.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-500 text-sm">{gadget.category}</td>
                <td className="py-4 px-4 font-medium text-foreground text-sm">${gadget.price}</td>
                <td className="py-4 px-4 text-gray-500">{gadget.stock}</td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/product/${gadget._id.toString()}`} className="text-xs font-bold uppercase tracking-widest text-foreground hover:text-gray-500 transition-colors border-b border-foreground hover:border-gray-500 pb-0.5">
                      View
                    </Link>
                    <Link href={`/items/edit/${gadget._id.toString()}`} className="text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors border-b border-primary hover:border-primary/80 pb-0.5">
                      Edit
                    </Link>
                    <DeleteButton id={gadget._id.toString()} />
                  </div>
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
