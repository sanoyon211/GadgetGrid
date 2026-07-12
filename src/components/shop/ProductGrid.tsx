"use client";

import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function ProductGrid({ initialGadgets, totalPages, currentPage }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(pathname + "?" + params.toString());
  };

  if (initialGadgets.length === 0) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No products found</h3>
        <p className="text-gray-500">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {initialGadgets.map((product: any) => (
          <div key={product.id} className="group relative bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden hover:shadow-xl transition-all duration-300">
            {product.badge && (
              <div className={`absolute top-4 left-4 z-10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white rounded-full ${
                product.badge === 'Sale' ? 'bg-red-500' : product.badge === 'New' ? 'bg-blue-500' : 'bg-green-500'
              }`}>
                {product.badge}
              </div>
            )}
            
            <button className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-colors">
              <Heart className="w-5 h-5" />
            </button>

            <div className="aspect-square bg-gray-50 dark:bg-zinc-800 flex items-center justify-center p-6 relative overflow-hidden">
              <div className="text-8xl group-hover:scale-110 transition-transform duration-500">
                {product.image || "📦"}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span className="text-primary font-medium">{product.category}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                <Link href={`/product/${product.id}`}>
                  <span className="absolute inset-0" />
                  {product.name}
                </Link>
              </h3>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-300 ml-1">{product.rating}</span>
                <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                  )}
                </div>
                <button className="p-3 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-colors relative z-20">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${
                  currentPage === i + 1
                    ? "bg-primary text-white border border-primary"
                    : "border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
