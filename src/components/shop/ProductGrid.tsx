import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";

// Dummy data for products
const products = [
  {
    id: 1, name: "MacBook Pro 16\" (M3 Max)", price: 3499, originalPrice: 3699, rating: 4.9, reviews: 128, image: "💻", category: "Laptops & MacBooks", badge: "Sale"
  },
  {
    id: 2, name: "Sony WH-1000XM5", price: 398, originalPrice: null, rating: 4.8, reviews: 356, image: "🎧", category: "Audio & Headphones", badge: "Trending"
  },
  {
    id: 3, name: "iPhone 15 Pro Max", price: 1199, originalPrice: null, rating: 4.9, reviews: 892, image: "📱", category: "Smartphones", badge: null
  },
  {
    id: 4, name: "Apple Watch Ultra 2", price: 799, originalPrice: null, rating: 4.7, reviews: 215, image: "⌚", category: "Wearables", badge: "New"
  },
  {
    id: 5, name: "PlayStation 5 Console", price: 499, originalPrice: null, rating: 4.9, reviews: 1240, image: "🎮", category: "Gaming", badge: null
  },
  {
    id: 6, name: "Canon EOS R5", price: 3899, originalPrice: 3999, rating: 4.8, reviews: 89, image: "📸", category: "Cameras", badge: "Sale"
  },
  {
    id: 7, name: "Samsung Galaxy S24 Ultra", price: 1299, originalPrice: null, rating: 4.8, reviews: 412, image: "📱", category: "Smartphones", badge: "New"
  },
  {
    id: 8, name: "AirPods Pro (2nd Gen)", price: 249, originalPrice: null, rating: 4.9, reviews: 2310, image: "🎧", category: "Audio & Headphones", badge: null
  },
  {
    id: 9, name: "iPad Pro 12.9\"", price: 1099, originalPrice: null, rating: 4.9, reviews: 534, image: "📱", category: "Tablets", badge: "Trending"
  }
];

export default function ProductGrid() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group relative bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden hover:shadow-xl transition-all duration-300">
            {/* Badges */}
            {product.badge && (
              <div className={`absolute top-4 left-4 z-10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white rounded-full ${
                product.badge === 'Sale' ? 'bg-red-500' : product.badge === 'New' ? 'bg-blue-500' : 'bg-green-500'
              }`}>
                {product.badge}
              </div>
            )}
            
            {/* Wishlist Button */}
            <button className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-colors">
              <Heart className="w-5 h-5" />
            </button>

            {/* Product Image (Placeholder) */}
            <div className="aspect-square bg-gray-50 dark:bg-zinc-800 flex items-center justify-center p-6 relative overflow-hidden">
              <div className="text-8xl group-hover:scale-110 transition-transform duration-500">
                {product.image}
              </div>
            </div>

            {/* Product Details */}
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
              
              {/* Ratings */}
              <div className="flex items-center mb-4">
                <div className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-300 ml-1">{product.rating}</span>
                <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
              </div>

              {/* Price and Cart */}
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

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <nav className="flex items-center space-x-2">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-lg font-medium">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800">
            3
          </button>
          <span className="text-gray-500">...</span>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800">
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}
