"use client";

import Link from "next/link";
import { Star, ShoppingCart, Heart, Package } from "lucide-react";
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
          <div key={product.id} className="group relative flex flex-col items-center">
            <Link href={`/product/${product.id}`} className="w-full">
              <div className="relative w-full aspect-square bg-[var(--accent)] flex items-center justify-center mb-4 transition-colors duration-300 overflow-hidden">
                {product.badge && (
                  <div className="absolute top-4 right-4 z-10 px-2 py-1 text-[10px] font-bold bg-foreground text-background tracking-wider">
                    {product.badge}
                  </div>
                )}
                {product.image || product.images?.[0] ? (
                  <img src={product.image || product.images?.[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                ) : (
                  <div className="text-gray-400 dark:text-gray-600"><Package className="w-16 h-16" strokeWidth={1.5} /></div>
                )}
              </div>
            </Link>
            
            <h3 className="text-sm font-semibold font-heading tracking-wide text-foreground mb-2 text-center">
              <Link href={`/product/${product.id}`}>
                {product.name}
              </Link>
            </h3>
            
            <p className="text-xs text-gray-500 mb-2 text-center line-clamp-2 px-2">
              {product.description}
            </p>

            <div className="flex items-center justify-center gap-1 mb-2">
              <Star className="w-3 h-3 fill-foreground text-foreground" />
              <span className="text-xs font-medium text-foreground">{product.rating} ({product.reviews || 0})</span>
            </div>
            
            <div className="flex items-center justify-center gap-3 text-sm mb-4">
              {product.originalPrice && (
                <span className="text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
              <span className="text-gray-600 dark:text-gray-300 font-medium">${product.price.toFixed(2)}</span>
            </div>

            <Link href={`/product/${product.id}`} className="text-xs font-bold tracking-widest uppercase text-foreground border-b border-transparent hover:border-foreground transition-colors pb-1">
              View Details
            </Link>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 min-h-[44px] flex items-center border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-none hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-none font-medium transition-colors ${
                  currentPage === i + 1
                    ? "bg-primary text-white dark:text-black border border-primary"
                    : "border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 min-h-[44px] flex items-center border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-none hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
