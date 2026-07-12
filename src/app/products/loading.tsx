import ProductSkeleton from "@/components/globals/ProductSkeleton";

export default function Loading() {
  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-heading font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Explore Gadgets
          </h1>
          <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded w-1/2 max-w-xl animate-pulse"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 h-96 bg-gray-200 dark:bg-zinc-900 rounded-2xl animate-pulse"></div>
          </aside>

          <main className="flex-1">
            <div className="h-12 bg-gray-200 dark:bg-zinc-900 rounded-lg mb-6 animate-pulse"></div>
            <ProductSkeleton />
          </main>
        </div>
      </div>
    </div>
  );
}
