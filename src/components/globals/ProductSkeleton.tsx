import React from 'react';

export default function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full animate-pulse">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
          <div className="aspect-square bg-gray-200 dark:bg-zinc-800" />
          <div className="p-6 space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/3" />
            <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded w-3/4" />
            <div className="flex items-center space-x-2">
              <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/4" />
              <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/4" />
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded w-1/3" />
              <div className="h-10 w-10 bg-gray-200 dark:bg-zinc-800 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
