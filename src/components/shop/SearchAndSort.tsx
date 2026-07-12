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

      <div className="flex items-center gap-6 w-full sm:w-auto border-b border-gray-300 sm:border-0 pb-2 sm:pb-0">
        <button className="sm:hidden flex items-center justify-center gap-2 text-sm uppercase tracking-wider text-foreground w-full">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
        
        <div className="relative w-full sm:w-auto shrink-0 border-0 sm:border-b border-gray-300 group">
          <select
            value={searchParams.get("sort") || "newest"}
            onChange={handleSortChange}
            className="block w-full pl-0 pr-8 py-2 text-sm uppercase tracking-wider bg-transparent border-0 focus:outline-none focus:ring-0 text-foreground appearance-none cursor-pointer group-hover:text-gray-500 transition-colors"
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
      </div>
    </div>
  );
}
