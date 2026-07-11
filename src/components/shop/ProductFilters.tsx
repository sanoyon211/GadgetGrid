"use client";

import { useState } from "react";
import { Check, ChevronDown, SlidersHorizontal } from "lucide-react";

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
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [selectedPrice, setSelectedPrice] = useState("any");

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100 dark:border-zinc-800">
        <SlidersHorizontal className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-heading font-semibold text-gray-900 dark:text-white">Filters</h2>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Categories</h3>
        <ul className="space-y-3">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => setSelectedCategory(category)}
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

      {/* Price Range */}
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
                    onChange={() => setSelectedPrice(range.id)}
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

      {/* Ratings */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2].map((stars) => (
            <label key={stars} className="flex items-center cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 mr-3 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-zinc-800" />
              <div className="flex items-center text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < stars ? 'fill-current' : 'text-gray-300 dark:text-zinc-700 fill-current'}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">& Up</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
