"use client";

import { useState } from "react";
import { Maximize2 } from "lucide-react";

export default function ProductGallery({ mainImage = "📱" }: { mainImage?: string }) {
  // We'll use the mainImage emoji as the placeholder for the main image, 
  // and some varying shades for thumbnails
  const [activeImage, setActiveImage] = useState(0);

  const images = [
    { id: 0, content: mainImage },
    { id: 1, content: "📦" }, // Box
    { id: 2, content: "🔌" }, // Charger
    { id: 3, content: "✨" }, // Shine
  ];

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide w-full lg:w-24 shrink-0">
        {images.map((img, idx) => (
          <button
            key={img.id}
            onClick={() => setActiveImage(idx)}
            className={`relative flex items-center justify-center h-24 w-24 sm:w-auto sm:h-24 lg:w-full lg:h-24 rounded-xl border-2 transition-all overflow-hidden bg-gray-50 dark:bg-zinc-900 shrink-0 ${
              activeImage === idx 
                ? "border-primary ring-2 ring-primary/20 ring-offset-2 dark:ring-offset-black" 
                : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            <span className="text-4xl">{img.content}</span>
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square bg-gray-50 dark:bg-zinc-900 rounded-2xl overflow-hidden flex items-center justify-center group">
        <span className="text-9xl sm:text-[12rem] transform group-hover:scale-110 transition-transform duration-500 ease-out">
          {images[activeImage].content}
        </span>
        
        {/* Fullscreen Button */}
        <button className="absolute top-4 right-4 p-3 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
