"use client";

import { useState } from "react";
import { Maximize2, Package } from "lucide-react";
import Image from "next/image";

export default function ProductGallery({ images = [] }: { images?: string[] }) {
  const [activeImage, setActiveImage] = useState(0);

  const displayImages = images.length > 0 
    ? images.map((img, id) => ({ id, content: img })) 
    : [{ id: 0, content: "" }];

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide w-full lg:w-24 shrink-0">
        {displayImages.map((img, idx) => (
          <button
            key={img.id}
            onClick={() => setActiveImage(idx)}
            className={`relative flex items-center justify-center h-20 w-20 md:w-24 md:h-24 lg:w-full lg:h-24 rounded-xl border-2 transition-all overflow-hidden bg-gray-50 dark:bg-zinc-900 shrink-0 ${
              activeImage === idx 
                ? "border-primary ring-2 ring-primary/20 ring-offset-2 dark:ring-offset-black" 
                : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            {img.content ? (
              <img src={img.content} alt="Thumbnail" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-400"><Package className="w-8 h-8" /></div>
            )}
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square bg-gray-50 dark:bg-zinc-900 rounded-2xl overflow-hidden flex items-center justify-center group">
        <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out">
          {displayImages[activeImage].content ? (
            <div className="relative w-full h-full p-8">
              <Image 
                src={displayImages[activeImage].content} 
                alt="Product" 
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain drop-shadow-xl" 
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <Package className="w-32 h-32 sm:w-48 sm:h-48" strokeWidth={1} />
            </div>
          )}
        </div>
        
        {/* Fullscreen Button */}
        <button className="absolute top-4 right-4 p-3 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
