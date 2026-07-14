"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";

import { useShop } from "@/context/ShopContext";

export default function CartItemsList() {
  const { cart: items, updateCartQuantity, removeFromCart, isLoading } = useShop();

  const handleUpdateQuantity = (id: string, delta: number) => {
    const item = items.find((i) => i.product._id === id);
    if (item) {
      updateCartQuantity(id, item.quantity + delta);
    }
  };

  if (isLoading) {
    return <div className="p-12 text-center text-gray-500">Loading cart...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-12 text-center">
        <div className="w-24 h-24 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400 dark:text-gray-500">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any premium gadgets to your cart yet.</p>
        <Link 
          href="/products" 
          className="inline-flex items-center justify-center bg-primary text-white dark:text-black px-8 py-3.5 rounded-full font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/30"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
        <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
          Cart Items ({items.length})
        </h2>
      </div>

      <ul className="divide-y divide-gray-200 dark:divide-zinc-800">
        {items.map((item) => (
          <li key={item.product._id} className="p-6 flex flex-col sm:flex-row gap-6">
            {/* Image */}
            <div className="w-full sm:w-32 h-32 bg-gray-50 dark:bg-zinc-950 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 dark:border-zinc-800 overflow-hidden">
              <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                    <Link href={`/product/${item.product._id}`} className="hover:text-primary transition-colors">
                      {item.product.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{item.product.category}</p>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white ml-4">
                  ${(item.product.price * item.quantity).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4">
                {/* Quantity Controls */}
                <div className="flex items-center bg-gray-50 dark:bg-black rounded-lg border border-gray-200 dark:border-zinc-700 overflow-hidden">
                  <button 
                    onClick={() => handleUpdateQuantity(item.product._id, -1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-white dark:hover:bg-zinc-800 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-10 h-8 flex items-center justify-center font-medium text-sm text-gray-900 dark:text-white border-x border-gray-200 dark:border-zinc-700">
                    {item.quantity}
                  </div>
                  <button 
                    onClick={() => handleUpdateQuantity(item.product._id, 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-white dark:hover:bg-zinc-800 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Remove Button */}
                <button 
                  onClick={() => removeFromCart(item.product._id)}
                  className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Remove</span>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
