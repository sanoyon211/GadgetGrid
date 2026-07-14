import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductActions from "@/components/product/ProductActions";
import ProductTabs from "@/components/product/ProductTabs";
import TrendingGadgets from "@/components/home/TrendingGadgets";
import connectToDatabase from "@/lib/mongoose";
import Gadget from "@/models/Gadget";
import Review from "@/models/Review";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  await connectToDatabase();
  try {
    const productRaw = await Gadget.findById(resolvedParams.id).lean();
    if (!productRaw) return { title: "Product Not Found" };
    return {
      title: productRaw.name,
      description: productRaw.shortDescription || productRaw.description.substring(0, 160),
      openGraph: {
        title: productRaw.name,
        description: productRaw.shortDescription || productRaw.description.substring(0, 160),
        images: productRaw.images && productRaw.images.length > 0 ? [{ url: productRaw.images[0] }] : [],
      },
    };
  } catch (error) {
    return { title: "Product" };
  }
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  await connectToDatabase();

  let productRaw;
  let actualReviewCount = 0;
  let actualRating = 0;
  try {
    productRaw = await Gadget.findById(resolvedParams.id).lean();
    if (productRaw) {
      const allReviews = await Review.find({ gadget: productRaw._id });
      actualReviewCount = allReviews.length;
      if (actualReviewCount > 0) {
        const totalRating = allReviews.reduce((sum, rev) => sum + rev.rating, 0);
        actualRating = Number((totalRating / actualReviewCount).toFixed(1));
      }
    }
  } catch (error) {
    productRaw = null;
  }

  if (!productRaw) {
    notFound();
  }

  const product = {
    id: productRaw._id.toString(),
    _id: productRaw._id.toString(),
    name: productRaw.name,
    price: productRaw.price,
    originalPrice: productRaw.originalPrice,
    rating: actualReviewCount > 0 ? actualRating : (productRaw.rating || 0),
    reviews: actualReviewCount,
    category: productRaw.category,
    badge: productRaw.isTrending ? "Trending" : productRaw.isFeatured ? "Featured" : null,
    colors: ["silver", "space-gray"], // Defaulting since we don't have this in schema yet
    storage: ["1TB SSD", "2TB SSD", "4TB SSD"], // Defaulting
    description: productRaw.description,
    shortDescription: productRaw.shortDescription,
    image: productRaw.images[0] || "",
    images: productRaw.images || [],
    specifications: productRaw.specifications || {}
  };

  return (
    <div className="bg-background min-h-screen">
      
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200 dark:border-zinc-800 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm font-medium text-gray-500">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/products" className="hover:text-foreground transition-colors">Shop</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-foreground transition-colors">
              {product.category}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-foreground truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16">
          
          {/* Left Column: Gallery */}
          <div className="mb-10 lg:mb-0">
            <div className="sticky top-24">
              <ProductGallery images={product.images} />
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
      <div className="border-t border-gray-200 dark:border-zinc-800 bg-background pb-12">
        {/* We reuse the TrendingGadgets component but treat it as Related Products here */}
        <TrendingGadgets />
      </div>

    </div>
  );
}
