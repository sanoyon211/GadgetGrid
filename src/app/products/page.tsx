import ProductFilters from "@/components/shop/ProductFilters";
import SearchAndSort from "@/components/shop/SearchAndSort";
import ProductGrid from "@/components/shop/ProductGrid";

export const metadata = {
  title: "Explore Gadgets | GadgetGrid",
  description: "Browse our premium collection of smartphones, laptops, audio, and wearables.",
};

export default function ProductsPage() {
  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-heading font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Explore Gadgets
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Discover the latest and greatest in tech. From cutting-edge smartphones to high-fidelity audio, we have everything you need to upgrade your lifestyle.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters (Desktop) */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24">
              <ProductFilters />
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <SearchAndSort />
            <ProductGrid />
          </main>
        </div>
        
      </div>
    </div>
  );
}
