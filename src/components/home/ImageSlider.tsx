"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const sliderImages = [
  "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1629429407756-4a7703614972?q=80&w=870&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2084&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1738830251513-a7bfef4b53c6?q=80&w=2084&auto=format&fit=crop"
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Discover the Latest Tech
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience innovation with our curated selection of premium gadgets designed to elevate your lifestyle.
          </p>
        </div>
        
        <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
          {sliderImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className="absolute inset-0 bg-black/20 z-10 rounded-2xl"></div>
              <Image
                src={img}
                alt={`Gadget showcase ${index + 1}`}
                fill
                className="object-cover rounded-2xl"
                priority={index === 0}
              />
            </div>
          ))}

          {/* Navigation dots */}
          <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-3">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 shadow-md ${
                  index === currentIndex
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
