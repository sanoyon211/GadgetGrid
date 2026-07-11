import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductActions from "@/components/product/ProductActions";
import ProductTabs from "@/components/product/ProductTabs";
import TrendingGadgets from "@/components/home/TrendingGadgets"; // Using this as Related Products

// Dummy data fetching function based on ID
function getProductById(id: string) {
  return {
    id,
    name: "MacBook Pro 16\" (M3 Max)",
    price: 3499,
    originalPrice: 3699,
    rating: 4.9,
    reviews: 128,
    category: "Laptops & MacBooks",
    badge: "Sale",
    colors: ["silver", "space-gray"],
    storage: ["1TB SSD", "2TB SSD", "4TB SSD"],
    description: "Experience the ultimate blend of design and functionality with the new MacBook Pro. Engineered for those who demand the best in technology, featuring the M3 Max chip for unparalleled performance."
  };
}

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      
      {/* Breadcrumbs */}
      <div className="border-b border-gray-100 dark:border-zinc-900 bg-gray-50/50 dark:bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm font-medium text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/products" className="hover:text-primary transition-colors">Shop</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href={`/category/${product.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="hover:text-primary transition-colors">
              {product.category}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 dark:text-gray-300 truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16">
          
          {/* Left Column: Gallery */}
          <div className="mb-10 lg:mb-0">
            <div className="sticky top-24">
              <ProductGallery mainImage="💻" />
            </div>
          </div>

          {/* Right Column: Info & Actions */}
          <div className="flex flex-col">
            <ProductInfo product={product} />
            <ProductActions product={product} />
          </div>
          
        </div>

        {/* Tabs below main content */}
        <ProductTabs product={product} />
        
      </main>

      {/* Related Products Section */}
      <div className="border-t border-gray-100 dark:border-zinc-900 bg-gray-50 dark:bg-black pb-12">
        {/* We reuse the TrendingGadgets component but treat it as Related Products here */}
        <TrendingGadgets />
      </div>

    </div>
  );
}
