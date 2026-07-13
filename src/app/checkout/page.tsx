"use client";

import CheckoutForm from "@/components/checkout/CheckoutForm";
import PaymentMethods from "@/components/checkout/PaymentMethods";
import OrderSummarySide from "@/components/checkout/OrderSummarySide";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useShop } from "@/context/ShopContext";


export default function CheckoutPage() {
  const router = useRouter();
  const { clearCart, fetchCartAndWishlist } = useShop();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const shippingAddress = {
      fullName: `${formData.get("firstName")} ${formData.get("lastName")}`,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      postalCode: formData.get("zip") as string,
      country: formData.get("country") as string || "Unknown",
      phone: formData.get("phone") as string,
    };
    
    const paymentMethod = (formData.get("paymentMethod") as string) || "Credit Card";

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shippingAddress, paymentMethod }),
      });

      if (!res.ok) throw new Error("Failed to place order");

      toast.success("Order placed successfully!");
      clearCart();
      await fetchCartAndWishlist(); // refresh state
      router.push("/dashboard/orders");
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="bg-background min-h-screen pb-24">
      
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200 dark:border-zinc-800 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm font-medium text-gray-500">
            <Link href="/cart" className="hover:text-foreground transition-colors">Cart</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-foreground">Checkout</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl sm:text-5xl font-heading font-medium text-foreground mb-12">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Side: Forms */}
          <div className="lg:w-2/3">
            <CheckoutForm />
            <PaymentMethods />
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:w-1/3">
            <OrderSummarySide />
          </div>

        </form>
      </div>
    </div>
  );
}
