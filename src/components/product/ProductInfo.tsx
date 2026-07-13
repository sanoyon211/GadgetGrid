"use client";

import { Star } from "lucide-react";

export default function ProductInfo({ product }: { product: any }) {

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
              className={`w-5 h-5 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
            />
          ))}
        </div>
        <span className="text-gray-900 dark:text-gray-100 font-medium">{product.rating || 0}</span>
        <span className="text-gray-400 text-sm">({product.reviewsCount || 0} reviews)</span>
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
        {product.shortDescription || product.description || "Experience next-level performance and stunning design with this premium gadget. Engineered for those who demand the best in technology."}
      </p>

      <hr className="border-gray-200 dark:border-zinc-800 mb-8" />


    </div>
  );
}
