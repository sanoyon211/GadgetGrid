"use client";

import { useState } from "react";
import { CreditCard, Wallet, Landmark } from "lucide-react";

export default function PaymentMethods() {
  const [method, setMethod] = useState("card");

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 sm:p-8 mt-6">
      <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-6">Payment Method</h2>
      
      <div className="space-y-4">
        
        {/* Credit Card Option */}
        <label className={`block border rounded-xl p-4 cursor-pointer transition-all ${method === "card" ? "border-primary bg-primary/5" : "border-gray-200 dark:border-zinc-800 hover:border-primary/50"}`}>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-5 h-5 rounded-full border border-gray-300 dark:border-zinc-600">
              {method === "card" && <div className="w-3 h-3 rounded-full bg-primary" />}
            </div>
            <CreditCard className={`w-6 h-6 ${method === "card" ? "text-primary" : "text-gray-400"}`} />
            <span className="font-medium text-gray-900 dark:text-white">Credit Card</span>
          </div>
          <input type="radio" className="hidden" name="paymentMethod" value="Credit Card" checked={method === "card"} onChange={() => setMethod("card")} />
          
          {/* Card Details (Only visible if selected) */}
          {method === "card" && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-zinc-700/50 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Card Number</label>
                <input type="text" placeholder="0000 0000 0000 0000" className="block w-full px-3 py-2 border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-950 text-sm focus:ring-1 focus:ring-primary focus:border-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Expiry Date</label>
                  <input type="text" placeholder="MM/YY" className="block w-full px-3 py-2 border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-950 text-sm focus:ring-1 focus:ring-primary focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">CVC</label>
                  <input type="text" placeholder="123" className="block w-full px-3 py-2 border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-950 text-sm focus:ring-1 focus:ring-primary focus:border-primary" />
                </div>
              </div>
            </div>
          )}
        </label>

        {/* bKash Option */}
        <label className={`block border rounded-xl p-4 cursor-pointer transition-all ${method === "bkash" ? "border-pink-500 bg-pink-500/5 dark:bg-pink-500/10" : "border-gray-200 dark:border-zinc-800 hover:border-pink-500/50"}`}>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-5 h-5 rounded-full border border-gray-300 dark:border-zinc-600 shrink-0">
              {method === "bkash" && <div className="w-3 h-3 rounded-full bg-pink-500" />}
            </div>
            <div className="w-8 h-8 rounded bg-pink-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
              bK
            </div>
            <div>
              <span className="block font-medium text-gray-900 dark:text-white">bKash Mobile Menu</span>
              <span className="block text-xs text-gray-500 mt-0.5">Pay via your bKash wallet.</span>
            </div>
          </div>
          <input type="radio" className="hidden" name="paymentMethod" value="bKash" checked={method === "bkash"} onChange={() => setMethod("bkash")} />
          
          {/* bKash Details */}
          {method === "bkash" && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-zinc-700/50 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">bKash Account Number</label>
                <input type="text" placeholder="e.g 01XXXXXXXXX" className="block w-full px-3 py-2 border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-950 text-sm focus:ring-1 focus:ring-pink-500 focus:border-pink-500" required={method === "bkash"} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">bKash Verification Code (OTP)</label>
                <input type="text" placeholder="123456" className="block w-full px-3 py-2 border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-950 text-sm focus:ring-1 focus:ring-pink-500 focus:border-pink-500" required={method === "bkash"} />
              </div>
            </div>
          )}
        </label>

        {/* Cash on Delivery Option */}
        <label className={`block border rounded-xl p-4 cursor-pointer transition-all ${method === "cod" ? "border-primary bg-primary/5" : "border-gray-200 dark:border-zinc-800 hover:border-primary/50"}`}>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-5 h-5 rounded-full border border-gray-300 dark:border-zinc-600">
              {method === "cod" && <div className="w-3 h-3 rounded-full bg-primary" />}
            </div>
            <Landmark className={`w-6 h-6 ${method === "cod" ? "text-primary" : "text-gray-400"}`} />
            <div>
              <span className="block font-medium text-gray-900 dark:text-white">Cash on Delivery</span>
              <span className="block text-xs text-gray-500 mt-0.5">Pay with cash when your order is delivered.</span>
            </div>
          </div>
          <input type="radio" className="hidden" name="paymentMethod" value="Cash on Delivery" checked={method === "cod"} onChange={() => setMethod("cod")} />
        </label>

      </div>
    </div>
  );
}
