"use client";

import { useState } from "react";
import { Star, Check, ShieldCheck, Truck } from "lucide-react";

export default function ProductInfo({ product }: { product: any }) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedStorage, setSelectedStorage] = useState(product.storage?.[0] || "");

  return (
    <div className="flex flex-col">
      {/* Category & Badges */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-primary font-medium text-sm">{product.category}</span>
        {product.badge && (
          <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-500 rounded-full">
            {product.badge}
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
        {product.name}
      </h1>

      {/* Ratings & Reviews */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
            />
          ))}
        </div>
        <span className="text-gray-900 dark:text-gray-100 font-medium">{product.rating}</span>
        <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
      </div>

      {/* Price */}
      <div className="flex items-end gap-3 mb-6">
        <span className="text-4xl font-bold text-gray-900 dark:text-white">${product.price}</span>
        {product.originalPrice && (
          <span className="text-xl text-gray-400 line-through mb-1">${product.originalPrice}</span>
        )}
        {product.originalPrice && (
          <span className="text-sm font-medium text-green-500 mb-2 ml-2">
            Save ${product.originalPrice - product.price}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 text-base mb-8 leading-relaxed">
        {product.description || "Experience next-level performance and stunning design with this premium gadget. Engineered for those who demand the best in technology."}
      </p>

      <hr className="border-gray-200 dark:border-zinc-800 mb-8" />

      {/* Variants: Colors */}
      {product.colors && (
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
            Color: <span className="text-gray-500 ml-1 capitalize">{selectedColor}</span>
          </h3>
          <div className="flex gap-3">
            {product.colors.map((color: string) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  selectedColor === color 
                    ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-black" 
                    : "ring-1 ring-gray-200 dark:ring-zinc-700 hover:scale-110"
                }`}
                style={{ backgroundColor: color === 'black' ? '#1a1a1a' : color === 'white' ? '#f5f5f5' : color }}
              >
                {selectedColor === color && (
                  <Check className={`w-5 h-5 ${color === 'white' ? 'text-black' : 'text-white'}`} />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Variants: Storage */}
      {product.storage && (
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
            Storage Configuration
          </h3>
          <div className="flex flex-wrap gap-3">
            {product.storage.map((size: string) => (
              <button
                key={size}
                onClick={() => setSelectedStorage(size)}
                className={`px-5 py-2.5 rounded-lg border font-medium transition-all ${
                  selectedStorage === size
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Features summary */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <ShieldCheck className="w-5 h-5 text-green-500" />
          <span>1 Year Warranty</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <Truck className="w-5 h-5 text-primary" />
          <span>Free Express Delivery</span>
        </div>
      </div>
    </div>
  );
}
