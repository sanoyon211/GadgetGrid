import CheckoutForm from "@/components/checkout/CheckoutForm";
import PaymentMethods from "@/components/checkout/PaymentMethods";
import OrderSummarySide from "@/components/checkout/OrderSummarySide";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Checkout | GadgetGrid",
  description: "Securely checkout your GadgetGrid order.",
};

export default function CheckoutPage() {
  return (
    <div className="bg-white dark:bg-black min-h-screen pb-20">
      
      {/* Breadcrumbs */}
      <div className="border-b border-gray-100 dark:border-zinc-900 bg-gray-50/50 dark:bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm font-medium text-gray-500">
            <Link href="/cart" className="hover:text-primary transition-colors">Cart</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 dark:text-gray-300">Checkout</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-heading font-extrabold text-gray-900 dark:text-white mb-8">
          Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Side: Forms */}
          <div className="lg:w-2/3">
            <CheckoutForm />
            <PaymentMethods />
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:w-1/3">
            <OrderSummarySide />
          </div>

        </div>
      </div>
    </div>
  );
}
