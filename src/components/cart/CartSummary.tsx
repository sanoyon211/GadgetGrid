"use client";

import { ArrowRight, Lock, Tag } from "lucide-react";

export default function CartSummary() {
  // Dummy calculated data
  const subtotal = 3897;
  const shipping = 0; // Free shipping
  const tax = 311.76;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 sticky top-24">
      <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>
      
      {/* Promo Code */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Tag className="h-4 w-4 text-gray-400" />
        </div>
        <input 
          type="text" 
          placeholder="Promo code" 
          className="block w-full pl-9 pr-24 py-3 border border-gray-200 dark:border-zinc-700 rounded-xl bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm transition-all"
        />
        <button className="absolute inset-y-1 right-1 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
          Apply
        </button>
      </div>

      {/* Breakdown */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
          <span className="font-medium text-gray-900 dark:text-white">${subtotal.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Shipping</span>
          <span className="font-medium text-green-500">Free</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Tax (8%)</span>
          <span className="font-medium text-gray-900 dark:text-white">${tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-zinc-800 pt-6 mb-8">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
          <span className="text-2xl font-bold text-primary">
            ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <button className="w-full flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:-translate-y-1">
        Proceed to Checkout
        <ArrowRight className="w-5 h-5" />
      </button>

      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
        <Lock className="w-4 h-4" />
        <span>Secure encrypted checkout</span>
      </div>
    </div>
  );
}
