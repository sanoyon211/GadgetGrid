"use client";

import { Check, ChevronDown, SlidersHorizontal } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const categories = [
  "All Products",
  "Smartphones",
  "Laptops & MacBooks",
  "Audio & Headphones",
  "Wearables",
  "Gaming",
  "Cameras"
];

const priceRanges = [
  { id: "any", label: "Any Price" },
  { id: "under-100", label: "Under $100" },
  { id: "100-500", label: "$100 - $500" },
  { id: "500-1000", label: "$500 - $1000" },
  { id: "over-1000", label: "Over $1000" }
];

export default function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") || "All Products";
  const selectedPrice = searchParams.get("priceRange") || "any";

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All Products") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    params.set("page", "1");
    router.push(pathname + "?" + params.toString());
  };

  const handlePriceChange = (priceId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("priceRange", priceId);
    
    if (priceId === "under-100") { params.set("minPrice", "0"); params.set("maxPrice", "100"); }
    else if (priceId === "100-500") { params.set("minPrice", "100"); params.set("maxPrice", "500"); }
    else if (priceId === "500-1000") { params.set("minPrice", "500"); params.set("maxPrice", "1000"); }
    else if (priceId === "over-1000") { params.set("minPrice", "1000"); params.delete("maxPrice"); }
    else { params.delete("minPrice"); params.delete("maxPrice"); }
    
    params.set("page", "1");
    router.push(pathname + "?" + params.toString());
  };

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100 dark:border-zinc-800">
        <SlidersHorizontal className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-heading font-semibold text-gray-900 dark:text-white">Filters</h2>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Categories</h3>
        <ul className="space-y-3">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => handleCategoryChange(category)}
                className={`flex items-center justify-between w-full text-left text-sm transition-colors ${
                  selectedCategory === category 
                    ? "text-primary font-medium" 
                    : "text-gray-600 dark:text-gray-400 hover:text-primary"
                }`}
              >
                <span>{category}</span>
                {selectedCategory === category && <Check className="w-4 h-4" />}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Price</h3>
        <ul className="space-y-3">
          {priceRanges.map((range) => (
            <li key={range.id}>
              <label className="flex items-center cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5 mr-3">
                  <input
                    type="radio"
                    name="priceRange"
                    className="peer sr-only"
                    checked={selectedPrice === range.id}
                    onChange={() => handlePriceChange(range.id)}
                  />
                  <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 rounded-full peer-checked:border-primary peer-checked:border-[5px] transition-all"></div>
                </div>
                <span className={`text-sm transition-colors ${
                  selectedPrice === range.id ? "text-gray-900 dark:text-white font-medium" : "text-gray-600 dark:text-gray-400 group-hover:text-primary"
                }`}>
                  {range.label}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
