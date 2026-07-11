import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl filter" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl filter" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="sm:text-center md:mx-auto lg:col-span-6 lg:text-left">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-primary bg-primary/10 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              New Arrivals For {new Date().getFullYear()}
            </div>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              Elevate Your Tech <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                Experience
              </span>
            </h1>
            <p className="mt-6 text-base text-gray-500 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-8 md:text-xl lg:mx-0">
              Discover the latest gadgets, from premium smartphones to next-gen wearables. Upgrade your lifestyle with our curated collection of cutting-edge technology.
            </p>
            <div className="mt-8 sm:flex sm:justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/explore"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-medium text-white shadow-sm hover:bg-primary/90 transition-all hover:scale-105"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Now
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-all hover:scale-105"
              >
                Explore Categories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Image/Visual Content */}
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-2xl shadow-2xl lg:max-w-md overflow-hidden bg-white aspect-[4/3] group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-10 rounded-2xl pointer-events-none" />
              
              {/* Dummy Image for Premium Feel - In real app, use next/image */}
              <div className="w-full h-full bg-gradient-to-tr from-gray-100 to-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                 <div className="text-center">
                   <div className="w-32 h-32 bg-white rounded-full shadow-lg mx-auto flex items-center justify-center mb-4 relative z-20">
                     <ShoppingBag className="w-12 h-12 text-primary" />
                   </div>
                   <p className="text-gray-400 font-medium text-sm">Premium Gadgets</p>
                 </div>
              </div>

              {/* Floating badges */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm z-20 flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span className="text-sm font-bold">4.9</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
