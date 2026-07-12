"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Save, Plus, Trash2 } from "lucide-react";

export default function AddProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "Smartphones",
    image1: "📱",
    image2: "",
    image3: "",
    image4: "",
    stock: "10"
  });
  const [specs, setSpecs] = useState([{ label: "", value: "" }]);

  const handleSpecChange = (index: number, field: string, value: string) => {
    const newSpecs = [...specs];
    newSpecs[index] = { ...newSpecs[index], [field]: value };
    setSpecs(newSpecs);
  };

  const addSpec = () => setSpecs([...specs, { label: "", value: "" }]);
  const removeSpec = (index: number) => setSpecs(specs.filter((_, i) => i !== index));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const imagesArray = [formData.image1, formData.image2, formData.image3, formData.image4].filter(img => img.trim() !== "");
      const specifications = specs.reduce((acc, curr) => {
        if (curr.label.trim() && curr.value.trim()) {
          acc[curr.label.trim()] = curr.value.trim();
        }
        return acc;
      }, {} as Record<string, string>);

      const res = await fetch("/api/gadgets/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          shortDescription: formData.shortDescription,
          description: formData.description,
          price: Number(formData.price),
          originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
          category: formData.category,
          stock: Number(formData.stock),
          images: imagesArray.length > 0 ? imagesArray : ["📱"],
          specifications
        })
      });

      if (!res.ok) throw new Error("Failed to add product");
      
      toast.success("Product added successfully!");
      router.push("/items/manage");
      router.refresh();
    } catch (error) {
      toast.error("Error adding product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-transparent p-6">
      <h2 className="text-2xl font-heading font-bold text-foreground mb-8 pb-4 border-b border-gray-200 dark:border-zinc-800">Add New Product</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Product Name</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-transparent border-b border-gray-200 dark:border-zinc-800 text-foreground focus:outline-none focus:border-foreground transition-colors" />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Short Description</label>
            <textarea required rows={2} name="shortDescription" value={formData.shortDescription} onChange={handleChange} className="w-full px-4 py-3 bg-transparent border-b border-gray-200 dark:border-zinc-800 text-foreground focus:outline-none focus:border-foreground transition-colors"></textarea>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Full Description</label>
            <textarea required rows={4} name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-3 bg-transparent border-b border-gray-200 dark:border-zinc-800 text-foreground focus:outline-none focus:border-foreground transition-colors"></textarea>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Price ($)</label>
            <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-3 bg-transparent border-b border-gray-200 dark:border-zinc-800 text-foreground focus:outline-none focus:border-foreground transition-colors" />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Original Price ($)</label>
            <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} className="w-full px-4 py-3 bg-transparent border-b border-gray-200 dark:border-zinc-800 text-foreground focus:outline-none focus:border-foreground transition-colors" />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 bg-transparent border-b border-gray-200 dark:border-zinc-800 text-foreground focus:outline-none focus:border-foreground transition-colors">
              <option value="Smartphones">Smartphones</option>
              <option value="Laptops & MacBooks">Laptops & MacBooks</option>
              <option value="Audio & Headphones">Audio & Headphones</option>
              <option value="Wearables">Wearables</option>
              <option value="Gaming">Gaming</option>
              <option value="Cameras">Cameras</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Stock</label>
            <input required type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full px-4 py-3 bg-transparent border-b border-gray-200 dark:border-zinc-800 text-foreground focus:outline-none focus:border-foreground transition-colors" />
          </div>

          <div className="sm:col-span-2 mt-4">
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 border-b pb-2">Product Images (Max 4)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Image 1 (Primary)</label>
                <input required type="text" name="image1" value={formData.image1} onChange={handleChange} placeholder="URL or Emoji" className="w-full px-4 py-3 bg-transparent border-b border-gray-200 dark:border-zinc-800 text-foreground focus:outline-none focus:border-foreground transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Image 2 (Optional)</label>
                <input type="text" name="image2" value={formData.image2} onChange={handleChange} placeholder="URL or Emoji" className="w-full px-4 py-3 bg-transparent border-b border-gray-200 dark:border-zinc-800 text-foreground focus:outline-none focus:border-foreground transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Image 3 (Optional)</label>
                <input type="text" name="image3" value={formData.image3} onChange={handleChange} placeholder="URL or Emoji" className="w-full px-4 py-3 bg-transparent border-b border-gray-200 dark:border-zinc-800 text-foreground focus:outline-none focus:border-foreground transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Image 4 (Optional)</label>
                <input type="text" name="image4" value={formData.image4} onChange={handleChange} placeholder="URL or Emoji" className="w-full px-4 py-3 bg-transparent border-b border-gray-200 dark:border-zinc-800 text-foreground focus:outline-none focus:border-foreground transition-colors" />
              </div>
            </div>
          </div>

          <div className="sm:col-span-2 mt-4">
            <div className="flex items-center justify-between border-b pb-2 mb-4">
              <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">Specifications</h3>
              <button type="button" onClick={addSpec} className="text-xs flex items-center gap-1 text-primary hover:text-primary/80">
                <Plus className="w-3 h-3" /> Add Spec
              </button>
            </div>
            <div className="space-y-3">
              {specs.map((spec, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <input
                    type="text"
                    value={spec.label}
                    onChange={(e) => handleSpecChange(index, "label", e.target.value)}
                    placeholder="e.g. Battery Life"
                    className="flex-1 px-4 py-2 bg-transparent border border-gray-200 dark:border-zinc-800 text-foreground rounded-lg focus:outline-none focus:border-foreground"
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                    placeholder="e.g. 18 hours"
                    className="flex-1 px-4 py-2 bg-transparent border border-gray-200 dark:border-zinc-800 text-foreground rounded-lg focus:outline-none focus:border-foreground"
                  />
                  {specs.length > 1 && (
                    <button type="button" onClick={() => removeSpec(index)} className="text-red-500 hover:text-red-700 p-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button disabled={isLoading} type="submit" className="flex items-center gap-2 px-8 py-3 bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50 mt-8">
          <Save className="w-4 h-4" />
          {isLoading ? "Saving..." : "Save Product"}
        </button>
      </form>
    </div>
  );
}
