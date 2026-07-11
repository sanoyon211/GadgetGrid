"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";

export default function AddProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "Smartphones",
    image: "📱",
    stock: "10"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/gadgets/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
          stock: Number(formData.stock),
          images: [formData.image],
        })
      });

      if (!res.ok) throw new Error("Failed to add product");
      
      toast.success("Product added successfully!");
      router.push("/dashboard/products");
      router.refresh();
    } catch (error) {
      toast.error("Error adding product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-gray-100 dark:border-zinc-900 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add New Product</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 dark:border-zinc-800 rounded-lg bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white" />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea required rows={4} name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 dark:border-zinc-800 rounded-lg bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price ($)</label>
            <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 dark:border-zinc-800 rounded-lg bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Original Price ($)</label>
            <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 dark:border-zinc-800 rounded-lg bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 dark:border-zinc-800 rounded-lg bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white">
              <option value="Smartphones">Smartphones</option>
              <option value="Laptops & MacBooks">Laptops & MacBooks</option>
              <option value="Audio & Headphones">Audio & Headphones</option>
              <option value="Wearables">Wearables</option>
              <option value="Gaming">Gaming</option>
              <option value="Cameras">Cameras</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock</label>
            <input required type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 dark:border-zinc-800 rounded-lg bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white" />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Emoji / Image Placeholder</label>
            <input required type="text" name="image" value={formData.image} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 dark:border-zinc-800 rounded-lg bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white" />
          </div>
        </div>

        <button disabled={isLoading} type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50">
          <Save className="w-4 h-4" />
          {isLoading ? "Saving..." : "Save Product"}
        </button>
      </form>
    </div>
  );
}
