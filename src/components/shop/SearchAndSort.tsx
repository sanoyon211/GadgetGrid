"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ProductFilters from "./ProductFilters";

export default function SearchAndSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [mounted, setMounted] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
      router.push(pathname + "?" + params.toString());
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    // Close mobile filters when route changes (e.g., after selecting a filter)
    setIsMobileFiltersOpen(false);
  }, [searchParams]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    params.set("page", "1");
    router.push(pathname + "?" + params.toString());
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", e.target.value);
    params.set("page", "1");
    router.push(pathname + "?" + params.toString());
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12">
        <div className="relative w-full sm:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-8 pr-3 py-2 border-0 border-b border-gray-300 bg-transparent text-foreground placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-foreground transition-colors text-sm"
            placeholder="Search products..."
          />
        </div>

        <div className="flex flex-wrap items-center justify-between sm:justify-start gap-4 w-full sm:w-auto border-b border-gray-300 sm:border-0 pb-2 sm:pb-0">
          <button 
            onClick={() => setIsMobileFiltersOpen(true)}
            className="sm:hidden flex items-center gap-2 text-sm uppercase tracking-wider text-foreground"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
          
          <div className="flex items-center gap-4 shrink-0">
            <div className="relative shrink-0 border-0 sm:border-b border-gray-300 group">
              <select
                value={searchParams.get("sort") || "newest"}
                onChange={handleSortChange}
                className="block pl-0 pr-6 py-2 text-sm uppercase tracking-wider bg-transparent border-0 focus:outline-none focus:ring-0 text-foreground appearance-none cursor-pointer group-hover:text-gray-500 transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Low to High</option>
                <option value="price-desc">High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-0 text-foreground group-hover:text-gray-500 transition-colors">
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div className="relative shrink-0 border-0 sm:border-b border-gray-300 group">
              <select
                value={searchParams.get("limit") || "12"}
                onChange={handleLimitChange}
                className="block pl-0 pr-6 py-2 text-sm uppercase tracking-wider bg-transparent border-0 focus:outline-none focus:ring-0 text-foreground appearance-none cursor-pointer group-hover:text-gray-500 transition-colors"
              >
                <option value="12">Show: 12</option>
                <option value="20">Show: 20</option>
                <option value="40">Show: 40</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-0 text-foreground group-hover:text-gray-500 transition-colors">
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 transition-opacity" 
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white dark:bg-zinc-950 p-6 shadow-xl overflow-y-auto transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-heading font-medium tracking-widest uppercase text-foreground">
                Mobile Filters
              </span>
              <button 
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-2 -mr-2 text-gray-500 hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <ProductFilters />
          </div>
        </div>
      )}
    </>
  );
}
