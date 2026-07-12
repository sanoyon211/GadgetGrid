import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | GadgetGrid",
  description: "Privacy policy for GadgetGrid.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="border-b border-gray-200 dark:border-zinc-800 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm font-medium text-gray-500">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-foreground">Privacy Policy</span>
          </nav>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-20 text-gray-700 dark:text-gray-300">
        <h1 className="text-4xl font-heading font-medium text-foreground mb-8">Privacy Policy</h1>
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <p className="mb-4">Your privacy is critically important to us at GadgetGrid.</p>
        <h2 className="text-xl font-heading font-medium text-foreground mt-8 mb-4">1. Information We Collect</h2>
        <p className="mb-4">We only collect information about you if we have a reason to do so—for example, to provide our Services, to communicate with you, or to make our Services better.</p>
        <h2 className="text-xl font-heading font-medium text-foreground mt-8 mb-4">2. How We Use Information</h2>
        <p className="mb-4">We use the information we collect to provide our products and services, process your orders, and communicate with you.</p>
      </div>
    </div>
  );
}
