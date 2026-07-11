"use client";

import { useState, useEffect } from "react";
import { Search, X, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const popularSearches = ["iPhone 15 Pro", "Sony WH-1000XM5", "MacBook Air", "Smartwatches"];

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      // In a real app, you would route to `/products?q=${query}`
      router.push("/products");
    }
  };

  const handlePopularSearch = (term: string) => {
    setQuery(term);
    onClose();
    router.push("/products");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden transform transition-all animate-in fade-in slide-in-from-top-4 duration-200">
        
        <form onSubmit={handleSearch} className="relative border-b border-gray-100 dark:border-zinc-800 flex items-center px-6 py-4">
          <Search className="w-6 h-6 text-gray-400 shrink-0" />
          <input 
            type="text" 
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none focus:ring-0 text-lg px-4 text-gray-900 dark:text-white placeholder:text-gray-400"
            placeholder="Search for products, categories..."
          />
          <button 
            type="button" 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors shrink-0 bg-gray-100 dark:bg-zinc-800 rounded-lg ml-2"
          >
            <span className="text-xs font-semibold">ESC</span>
          </button>
        </form>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-primary" />
            Popular Searches
          </div>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term, idx) => (
              <button 
                key={idx}
                onClick={() => handlePopularSearch(term)}
                className="px-4 py-2 bg-gray-50 dark:bg-zinc-800/50 hover:bg-gray-100 dark:hover:bg-zinc-800 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl transition-colors border border-transparent hover:border-gray-200 dark:hover:border-zinc-700"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
