import ProductSkeleton from "@/components/shop/ProductSkeleton";

export default function Loading() {
  return (
    <div className="bg-background min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16 border-b border-gray-200 dark:border-zinc-800 pb-8 text-center">
          <div className="h-10 w-64 bg-gray-200 dark:bg-zinc-800 rounded mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 w-96 max-w-full bg-gray-200 dark:bg-zinc-800 rounded mx-auto animate-pulse"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="w-full h-[400px] bg-gray-200 dark:bg-zinc-800 rounded animate-pulse"></div>
          </aside>

          <main className="flex-1">
            <div className="w-full h-12 bg-gray-200 dark:bg-zinc-800 rounded mb-12 animate-pulse"></div>
            <ProductSkeleton />
          </main>
        </div>
        
      </div>
    </div>
  );
}
