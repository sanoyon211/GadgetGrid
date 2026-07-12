import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";

import connectToDatabase from "@/lib/mongoose";
import Gadget from "@/models/Gadget";

export default async function TrendingGadgets() {
  await connectToDatabase();
  const productsRaw = await Gadget.find({}).limit(4).lean();
  const products = productsRaw.map((p: any) => ({
    id: p._id.toString(),
    name: p.name,
    price: p.price,
    originalPrice: p.originalPrice,
    rating: p.rating,
    reviews: p.reviewsCount,
    image: p.images?.[0] || "📦",
    category: p.category,
    badge: p.isTrending ? "Trending" : p.isFeatured ? "Sale" : null
  }));

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-2">Deal on gadgets</h2>
          <p className="text-gray-500 text-sm tracking-wide">Find the latest tech accessories to improve your daily life</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => (
          <div key={product.id} className="group relative flex flex-col items-center">
            <Link href={`/product/${product.id}`} className="w-full">
              <div className="relative w-full aspect-square bg-[var(--accent)] flex items-center justify-center mb-4 transition-colors duration-300 overflow-hidden">
                {product.badge && (
                  <div className="absolute top-4 right-4 z-10 px-2 py-1 text-[10px] font-bold bg-foreground text-background tracking-wider">
                    {product.badge}
                  </div>
                )}
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                ) : (
                  <div className="text-6xl">📦</div>
                )}
              </div>
            </Link>
            
            <h3 className="text-sm font-semibold font-heading tracking-wide text-foreground mb-2 text-center">
              <Link href={`/product/${product.id}`}>
                {product.name}
              </Link>
            </h3>
            
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
        
        <div className="mt-16 text-center">
          <Link href="/products" className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 dark:border-gray-700 text-sm font-medium text-foreground hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors">
            See Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
