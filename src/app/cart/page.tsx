import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "View and manage items in your GadgetGrid shopping cart.",
};
import { ChevronRight } from "lucide-react";
import CartItemsList from "@/components/cart/CartItemsList";
import CartSummary from "@/components/cart/CartSummary";



export default function CartPage() {
  return (
    <div className="bg-background min-h-screen pb-24">
      
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200 dark:border-zinc-800 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm font-medium text-gray-500">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-foreground">Shopping Cart</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-heading font-medium text-foreground tracking-tight">
            Shopping Cart
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area: Cart Items */}
          <main className="flex-1">
            <CartItemsList />
          </main>

          {/* Right Sidebar: Summary */}
          <aside className="w-full lg:w-96 shrink-0">
            <CartSummary />
          </aside>
        </div>
      </div>
      
    </div>
  );
}
