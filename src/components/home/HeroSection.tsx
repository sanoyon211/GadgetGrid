import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-20 lg:pt-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          
          {/* Text Content */}
          <div className="sm:text-center md:mx-auto lg:col-span-6 lg:text-left">
            <p className="text-sm tracking-widest text-gray-500 uppercase mb-4">Limited Edition</p>
            <h1 className="font-heading text-5xl tracking-normal text-foreground sm:text-6xl md:text-7xl leading-tight mb-6">
              The smarter way to <br className="hidden lg:block" />
              listen music
            </h1>
            <p className="text-base text-gray-500 sm:text-lg sm:max-w-xl sm:mx-auto lg:mx-0 font-light leading-relaxed mb-10">
              Experience the highest quality audio with our premium selection of noise-cancelling headphones and smart speakers.
            </p>
            <div className="sm:flex sm:justify-center lg:justify-start">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-10 py-3 border border-foreground text-sm font-medium text-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Image/Visual Content */}
          <div className="mt-16 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center justify-end">
            <div className="relative w-full aspect-square md:w-[120%] md:-mr-[20%]">
              <img src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1200&bg=faf8f5" alt="Premium Headphones" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal drop-shadow-2xl hover:scale-105 transition-transform duration-1000 ease-out" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
