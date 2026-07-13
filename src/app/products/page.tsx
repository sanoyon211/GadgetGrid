import ProductFilters from "@/components/shop/ProductFilters";
import SearchAndSort from "@/components/shop/SearchAndSort";
import ProductGrid from "@/components/shop/ProductGrid";
import connectToDatabase from "@/lib/mongoose";
import Gadget from "@/models/Gadget";
import { Suspense } from "react";

import { Metadata } from "next";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
  const params = await searchParams;
  const category = typeof params.category === 'string' && params.category !== "All Products" ? params.category : "All Gadgets";
  const search = typeof params.search === 'string' ? params.search : '';
  
  let title = `Explore ${category}`;
  if (search) title = `Search: ${search} | ${title}`;

  return {
    title,
    description: `Browse our premium collection of ${category.toLowerCase()}, smartphones, laptops, audio, and wearables.`,
  };
}

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  await connectToDatabase();
  
  const params = await searchParams;
  const search = typeof params.search === 'string' ? params.search : '';
  const category = typeof params.category === 'string' ? params.category : '';
  const minPrice = typeof params.minPrice === 'string' ? Number(params.minPrice) : 0;
  const maxPrice = typeof params.maxPrice === 'string' ? Number(params.maxPrice) : 100000;
  const sort = typeof params.sort === 'string' ? params.sort : 'newest';
  const page = typeof params.page === 'string' ? Number(params.page) : 1;
  const limit = typeof params.limit === 'string' ? Number(params.limit) : 12;

  const query: any = {
    price: { $gte: minPrice, $lte: maxPrice }
  };
  if (search) query.name = { $regex: search, $options: "i" };
  if (category && category !== "All Products") query.category = category;

  let sortOption: any = { createdAt: -1 };
  if (sort === "price-asc") sortOption = { price: 1 };
  if (sort === "price-desc") sortOption = { price: -1 };
  if (sort === "rating") sortOption = { rating: -1 };

  const skip = (page - 1) * limit;

  const rawGadgets = await Gadget.find(query).sort(sortOption).skip(skip).limit(limit).lean();
  const total = await Gadget.countDocuments(query);
  const totalPages = Math.ceil(total / limit) || 1;

  const gadgets = rawGadgets.map((g: any) => ({
    id: g._id.toString(),
    name: g.name,
    price: g.price,
    originalPrice: g.originalPrice,
    rating: g.rating,
    reviews: g.reviewsCount,
    description: g.shortDescription || g.description,
    image: g.images[0],
    category: g.category,
    badge: g.isTrending ? "Trending" : g.isFeatured ? "Featured" : null,
  }));

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16 border-b border-gray-200 dark:border-zinc-800 pb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-medium text-foreground tracking-tight mb-4">
            Collection
          </h1>
          <p className="text-sm tracking-wide text-gray-500 max-w-2xl mx-auto">
            Discover the latest and greatest in tech. From cutting-edge smartphones to high-fidelity audio, we have everything you need to upgrade your lifestyle.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24">
              <Suspense fallback={<div>Loading filters...</div>}>
                <ProductFilters />
              </Suspense>
            </div>
          </aside>

          <main className="flex-1">
            <Suspense fallback={<div>Loading search...</div>}>
              <SearchAndSort />
            </Suspense>
            <ProductGrid initialGadgets={gadgets} totalPages={totalPages} currentPage={page} />
          </main>
        </div>
        
      </div>
    </div>
  );
}
