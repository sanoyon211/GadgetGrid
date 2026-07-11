import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CartItemsList from "@/components/cart/CartItemsList";
import CartSummary from "@/components/cart/CartSummary";

export const metadata = {
  title: "Shopping Cart | GadgetGrid",
  description: "Review your items and proceed to checkout.",
};

export default function CartPage() {
  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen pb-16">
      
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200 dark:border-zinc-900 bg-white dark:bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm font-medium text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 dark:text-gray-300">Shopping Cart</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-gray-900 dark:text-white tracking-tight">
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
