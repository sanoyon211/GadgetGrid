export default function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-full aspect-square bg-gray-200 dark:bg-zinc-800 mb-4"></div>
          <div className="w-3/4 h-4 bg-gray-200 dark:bg-zinc-800 mb-3 rounded"></div>
          <div className="w-1/4 h-4 bg-gray-200 dark:bg-zinc-800 mb-4 rounded"></div>
          <div className="w-1/3 h-3 bg-gray-200 dark:bg-zinc-800 rounded"></div>
        </div>
      ))}
    </div>
  );
}
