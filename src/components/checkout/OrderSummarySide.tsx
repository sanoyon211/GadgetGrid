"use client";

import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import { Lock, Trash2 } from "lucide-react";

export default function OrderSummarySide() {
  const { cart: cartItems, removeFromCart } = useShop();

  const subtotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const shipping = 15.00; // Flat rate for demo
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 dark:bg-zinc-900/50 rounded-none border border-gray-200 dark:border-zinc-800 p-6 sm:p-8 sticky top-8">
      <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

      {/* Items List */}
      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={item.product._id} className="flex gap-4">
            <div className="relative w-16 h-16 rounded-none overflow-hidden bg-white dark:bg-black border border-gray-100 dark:border-zinc-800 shrink-0">
              <Image 
                src={item.product.images[0]} 
                alt={item.product.name} 
                fill 
                className="object-cover"
              />
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-gray-500 text-white text-xs flex items-center justify-center rounded-full z-10">
                {item.quantity}
              </div>
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{item.product.name}</h4>
              <p className="text-xs text-gray-500 mt-1">{item.product.category}</p>
            </div>
            <div className="flex items-center justify-end gap-3">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                ${(item.product.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <button 
                type="button" 
                onClick={() => removeFromCart(item.product._id)} 
                className="text-gray-400 hover:text-red-500 transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center border border-transparent hover:border-red-500/20 rounded-none"
                title="Remove item"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-zinc-800 my-6"></div>

      {/* Calculations */}
      <div className="space-y-3 mb-6 text-sm">
        <div className="flex justify-between text-gray-500 dark:text-gray-400">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900 dark:text-white">
            ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex justify-between text-gray-500 dark:text-gray-400">
          <span>Shipping</span>
          <span className="font-medium text-gray-900 dark:text-white">
            ${shipping.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex justify-between text-gray-500 dark:text-gray-400">
          <span>Estimated Tax</span>
          <span className="font-medium text-gray-900 dark:text-white">
            ${tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-zinc-800 my-6"></div>

      {/* Total */}
      <div className="flex items-center justify-between mb-8">
        <span className="text-base font-bold text-gray-900 dark:text-white">Total</span>
        <span className="text-2xl font-bold text-primary">
          ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      </div>

      {/* Place Order Button */}
      <button 
        type="submit"
        className="w-full flex justify-center items-center gap-2 py-4 px-6 rounded-none shadow-lg shadow-primary/25 text-white dark:text-black bg-primary hover:bg-primary/90 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all font-bold text-lg"
      >
        <Lock className="w-5 h-5" />
        Place Order
      </button>

      <p className="text-xs text-center text-gray-500 mt-4 flex items-center justify-center gap-1">
        Payments are secure and encrypted.
      </p>

    </div>
  );
}
