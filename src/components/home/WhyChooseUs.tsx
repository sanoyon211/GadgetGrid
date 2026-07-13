"use client";

import { ShieldCheck, Truck, RotateCcw, Headset } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "100% Secure Payments",
      description: "Your payment details are encrypted and securely processed.",
    },
    {
      icon: <Truck className="w-8 h-8 text-primary" />,
      title: "Fast & Free Delivery",
      description: "Enjoy free shipping on all orders over $50 within 24 hours.",
    },
    {
      icon: <RotateCcw className="w-8 h-8 text-primary" />,
      title: "30-Day Returns",
      description: "Not satisfied? Return it within 30 days for a full refund.",
    },
    {
      icon: <Headset className="w-8 h-8 text-primary" />,
      title: "24/7 Premium Support",
      description: "Our dedicated support team is always here to help you.",
    },
  ];

  return (
    <section className="py-24 bg-background border-t border-gray-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Why Choose GadgetGrid
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We provide the best shopping experience with premium services and dedicated support to ensure your complete satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-gray-50 dark:bg-zinc-900/50 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-zinc-800"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
