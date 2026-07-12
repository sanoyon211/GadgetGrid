import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Terms of Service | GadgetGrid",
  description: "Terms and conditions for using GadgetGrid.",
};

export default function TermsPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="border-b border-gray-200 dark:border-zinc-800 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm font-medium text-gray-500">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-foreground">Terms of Service</span>
          </nav>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-20 text-gray-700 dark:text-gray-300">
        <h1 className="text-4xl font-heading font-medium text-foreground mb-8">Terms of Service</h1>
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <p className="mb-4">Please read these terms of service carefully before using GadgetGrid.</p>
        <h2 className="text-xl font-heading font-medium text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">By accessing and using our website, you accept and agree to be bound by the terms and provision of this agreement.</p>
        <h2 className="text-xl font-heading font-medium text-foreground mt-8 mb-4">2. Products and Pricing</h2>
        <p className="mb-4">All products are subject to availability. We reserve the right to modify prices without prior notice.</p>
      </div>
    </div>
  );
}
