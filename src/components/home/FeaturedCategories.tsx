import Link from "next/link";
import { Smartphone, Laptop, Headphones, Watch, Camera, Gamepad2 } from "lucide-react";

const categories = [
  { name: "Smartphones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80", href: "/category/smartphones" },
  { name: "Laptops", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=300&q=80", href: "/category/laptops" },
  { name: "Audio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80", href: "/category/audio" },
  { name: "Wearables", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80", href: "/category/wearables" },
  { name: "Cameras", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=300&q=80", href: "/category/cameras" },
  { name: "Gaming", image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=300&q=80", href: "/category/gaming" },
];

export default function FeaturedCategories() {
  return (
    <section id="categories" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-2">Shop by categories</h2>
          <p className="text-gray-500 text-sm tracking-wide">Find exactly what you are looking for.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group flex flex-col items-center justify-center space-y-4"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-[var(--accent)] transition-transform duration-500 group-hover:scale-105">
                <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-semibold font-heading tracking-wide text-foreground group-hover:text-gray-500 transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
