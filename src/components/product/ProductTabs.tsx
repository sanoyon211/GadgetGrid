"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export default function ProductTabs({ product }: { product: any }) {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: `Reviews (${product.reviews})` }
  ];

  return (
    <div className="mt-16">
      <div className="border-b border-gray-200 dark:border-zinc-800">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-base transition-colors
                ${activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="pt-8 pb-16">
        {/* Description Tab */}
        {activeTab === "description" && (
          <div className="prose prose-blue dark:prose-invert max-w-none">
            <h3 className="text-xl font-heading font-semibold mb-4 text-gray-900 dark:text-white">Product Overview</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Experience the ultimate blend of design and functionality with this premium gadget. Crafted with aerospace-grade materials, it offers unparalleled durability while maintaining a sleek, modern aesthetic. Whether you're a professional on the go or a tech enthusiast, this device is engineered to meet and exceed your expectations.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Equipped with our latest processing technology, it delivers lightning-fast performance, ensuring seamless multitasking and breathtaking graphics. The advanced cooling system guarantees optimal efficiency even during the most demanding tasks. Step into the future of technology today.
            </p>
          </div>
        )}

        {/* Specifications Tab */}
        {activeTab === "specifications" && (
          <div className="max-w-3xl">
            <h3 className="text-xl font-heading font-semibold mb-6 text-gray-900 dark:text-white">Technical Specifications</h3>
            <div className="border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden">
              <dl className="divide-y divide-gray-200 dark:divide-zinc-800">
                {[
                  { label: "Model", value: product.name },
                  { label: "Weight", value: "1.2 kg (2.6 lbs)" },
                  { label: "Dimensions", value: "30.4 x 21.2 x 1.5 cm" },
                  { label: "Battery Life", value: "Up to 18 hours" },
                  { label: "Connectivity", value: "Wi-Fi 6E, Bluetooth 5.3" },
                  { label: "Warranty", value: "1 Year Limited Warranty" }
                ].map((spec, idx) => (
                  <div key={idx} className="bg-white dark:bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{spec.label}</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 font-medium">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-2">Customer Reviews</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                    ))}
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">{product.rating} out of 5</span>
                </div>
              </div>
              <button className="mt-4 sm:mt-0 px-6 py-2.5 border-2 border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-white transition-colors">
                Write a Review
              </button>
            </div>

            <div className="space-y-8">
              {[
                { name: "Alex Johnson", rating: 5, date: "October 12, 2026", comment: "Absolutely incredible! The build quality is phenomenal and it works perfectly right out of the box. Worth every penny." },
                { name: "Sarah Williams", rating: 4, date: "September 28, 2026", comment: "Really great product. It's fast, looks beautiful, and the battery life is surprisingly good. Just wish the included cable was a bit longer." },
                { name: "Michael Chen", rating: 5, date: "September 15, 2026", comment: "Upgraded from the previous generation and the difference is night and day. Highly recommend to anyone on the fence!" }
              ].map((review, idx) => (
                <div key={idx} className="pb-8 border-b border-gray-100 dark:border-zinc-800 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">{review.name}</span>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
