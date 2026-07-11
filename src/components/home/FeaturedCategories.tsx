import Link from "next/link";
import { Smartphone, Laptop, Headphones, Watch, Camera, Gamepad2 } from "lucide-react";

const categories = [
  { name: "Smartphones", icon: Smartphone, color: "bg-blue-500", href: "/category/smartphones" },
  { name: "Laptops", icon: Laptop, color: "bg-orange-500", href: "/category/laptops" },
  { name: "Audio", icon: Headphones, color: "bg-purple-500", href: "/category/audio" },
  { name: "Wearables", icon: Watch, color: "bg-emerald-500", href: "/category/wearables" },
  { name: "Cameras", icon: Camera, color: "bg-red-500", href: "/category/cameras" },
  { name: "Gaming", icon: Gamepad2, color: "bg-indigo-500", href: "/category/gaming" },
];

export default function FeaturedCategories() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Shop by Category</h2>
          <p className="mt-4 text-lg text-gray-500">Find exactly what you are looking for.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 lg:gap-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={category.href}
                className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 hover:shadow-md hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`p-4 rounded-full ${category.color}/10 text-${category.color.replace('bg-', '')} mb-4 group-hover:scale-110 group-hover:${category.color} group-hover:text-white transition-all duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-200 group-hover:text-primary transition-colors">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
