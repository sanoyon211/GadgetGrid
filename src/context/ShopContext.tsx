"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";
import Swal from "sweetalert2";

export interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    category: string;
  };
  quantity: number;
}

export interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  rating: number;
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  isLoading: boolean;
  fetchCartAndWishlist: () => void;
  addToCart: (productId: string, quantity?: number) => Promise<boolean>;
  removeFromCart: (productId: string) => Promise<void>;
  updateCartQuantity: (productId: string, quantity: number) => Promise<void>;
  toggleWishlist: (productId: string) => Promise<void>;
  clearCart: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCartAndWishlist = async () => {
    if (!session?.user) {
      setCart([]);
      setWishlist([]);
      setIsLoading(false);
      return;
    }

    try {
      const [cartRes, wishlistRes] = await Promise.all([
        fetch("/api/user/cart"),
        fetch("/api/user/wishlist")
      ]);

      if (cartRes.ok) {
        const cartData = await cartRes.json();
        setCart(cartData.cart || []);
      }
      
      if (wishlistRes.ok) {
        const wishlistData = await wishlistRes.json();
        setWishlist(wishlistData.wishlist || []);
      }
    } catch (error) {
      console.error("Error fetching cart/wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartAndWishlist();
  }, [session]);

  const addToCart = async (productId: string, quantity = 1): Promise<boolean> => {
    if (!session?.user) {
      const result = await Swal.fire({
        title: "Login Required",
        text: "Please sign in to add items to your cart.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#000",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now"
      });
      if (result.isConfirmed) {
        router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      }
      return false;
    }

    try {
      const res = await fetch("/api/user/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");
      
      const data = await res.json();
      setCart(data.cart);
      toast.success("Added to cart");
      return true;
    } catch (error) {
      toast.error("Failed to add to cart");
      return false;
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!session?.user) return;
    try {
      const res = await fetch(`/api/user/cart?productId=${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove");
      const data = await res.json();
      setCart(data.cart);
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const updateCartQuantity = async (productId: string, quantity: number) => {
    if (!session?.user) return;
    if (quantity < 1) return;
    try {
      const res = await fetch("/api/user/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity, replace: true }),
      });
      if (!res.ok) throw new Error("Failed to update");
      const data = await res.json();
      setCart(data.cart);
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  const toggleWishlist = async (productId: string) => {
    if (!session?.user) {
      const result = await Swal.fire({
        title: "Login Required",
        text: "Please sign in to manage your wishlist.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#000",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now"
      });
      if (result.isConfirmed) {
        router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      }
      return;
    }

    try {
      const res = await fetch("/api/user/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) throw new Error("Failed to toggle wishlist");
      const data = await res.json();
      setWishlist(data.wishlist);
      
      if (data.added) {
        toast.success("Added to wishlist");
      } else {
        toast.success("Removed from wishlist");
      }
    } catch (error) {
      toast.error("Failed to update wishlist");
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        isLoading,
        fetchCartAndWishlist,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleWishlist,
        clearCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
