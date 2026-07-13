"use client";

import { useState } from "react";
import { ShoppingCart, Heart, Share2, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { useShop } from "@/context/ShopContext";
import { useRouter } from "next/navigation";

export default function ProductActions({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const router = useRouter();
  
  const isWishlisted = wishlist.some(item => item._id === product._id);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const handleAddToCart = async () => {
    await addToCart(product._id, quantity);
  };

  const handleBuyNow = async () => {
    await addToCart(product._id, quantity);
    router.push('/checkout');
  };

  const handleToggleWishlist = async () => {
    await toggleWishlist(product._id);
  };

  const handleShare = () => {
    toast("Link copied to clipboard!", {
      icon: <Share2 className="w-5 h-5" />
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-zinc-900/50 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800">
      
      {/* Quantity Selector */}
      <div className="flex items-center mb-6">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-4 w-16">Quantity</span>
        <div className="flex items-center bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-zinc-700 overflow-hidden">
          <button 
            onClick={handleDecrease}
            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <div className="w-12 h-10 flex items-center justify-center font-medium text-gray-900 dark:text-white border-x border-gray-200 dark:border-zinc-700">
            {quantity}
          </div>
          <button 
            onClick={handleIncrease}
            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button 
          onClick={handleAddToCart}
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-white dark:text-black px-8 py-3.5 rounded-full font-medium hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-lg shadow-primary/30"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
        <button 
          onClick={handleBuyNow}
          className="flex-1 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black px-8 py-3.5 rounded-full font-medium hover:bg-black/90 dark:hover:bg-gray-100 transition-all hover:scale-[1.02]"
        >
          Buy It Now
        </button>
      </div>

      {/* Secondary Actions */}
      <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-200 dark:border-zinc-800">
        <button 
          onClick={handleToggleWishlist}
          className={`flex items-center gap-2 text-sm font-medium transition-colors ${
            isWishlisted ? "text-red-500" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
          {isWishlisted ? "Saved" : "Save to Wishlist"}
        </button>
        <div className="w-px h-4 bg-gray-300 dark:bg-zinc-700"></div>
        <button 
          onClick={handleShare}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <Share2 className="w-5 h-5" />
          Share
        </button>
      </div>
    </div>
  );
}
