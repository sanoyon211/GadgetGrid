"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchAndSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [mounted, setMounted] = useState(false);

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

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    router.push(pathname + "?" + params.toString());
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
      <div className="relative w-full sm:max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-zinc-800 rounded-full leading-5 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all"
          placeholder="Search products..."
        />
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button className="sm:hidden flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-zinc-800 rounded-full bg-white dark:bg-zinc-900 text-sm font-medium text-gray-700 dark:text-gray-300 w-full">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
        
        <div className="relative w-full sm:w-auto shrink-0">
          <select
            value={searchParams.get("sort") || "newest"}
            onChange={handleSortChange}
            className="block w-full pl-4 pr-10 py-2.5 text-base border-gray-200 dark:border-zinc-800 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-full bg-white dark:bg-zinc-900 text-gray-900 dark:text-white appearance-none"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest Arrivals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
