"use client";

import { useShop } from "@/context/ShopContext";
import Link from "next/link";
import { Trash2, ShoppingCart } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart, isLoading } = useShop();

  if (isLoading) {
    return <div className="p-12 text-center text-gray-500">Loading wishlist...</div>;
  }

  if (wishlist.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
        <div className="bg-transparent border border-gray-200 dark:border-zinc-800 p-8 text-center">
          <p className="text-gray-500 mb-4">You have no items in your wishlist.</p>
          <Link href="/products" className="text-primary hover:underline">
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Wishlist ({wishlist.length})</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div key={item._id} className="bg-transparent border border-gray-200 dark:border-zinc-800 p-6 flex flex-col">
            <div className="w-full h-48 bg-gray-50 dark:bg-zinc-950 mb-4 rounded-xl flex items-center justify-center overflow-hidden">
              <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
            <p className="text-gray-500 text-sm mb-4">{item.category}</p>
            <div className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              ${item.price.toLocaleString()}
            </div>
            
            <div className="mt-auto flex gap-3">
              <button
                onClick={() => addToCart(item._id)}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(item._id)}
                className="p-2 border border-gray-200 dark:border-zinc-800 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
