"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to over 100 countries worldwide. International shipping times typically range from 5-14 business days depending on your location."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day hassle-free return policy on most items. Products must be in their original packaging and condition. Some restrictions apply to opened software and customized items."
  },
  {
    question: "Are your products covered by warranty?",
    answer: "All our products come with a standard 1-year manufacturer warranty. We also offer extended protection plans that you can add during checkout."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, you'll receive a confirmation email with a tracking number and a link to trace your package's journey in real-time."
  },
  {
    question: "Do you price match?",
    answer: "Yes, we offer price matching against authorized retailers for identical, in-stock items. Contact our support team before making your purchase to request a price match."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-background border-t border-gray-100 dark:border-zinc-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-medium text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-500 text-sm tracking-wide">Have questions? We're here to help.</p>
        </div>

        <div className="space-y-0 border-t border-gray-200 dark:border-zinc-800">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border-b border-gray-200 dark:border-zinc-800 transition-colors duration-300"
            >
              <button
                className="w-full py-6 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className={`text-sm font-medium uppercase tracking-wide ${openIndex === index ? 'text-gray-500' : 'text-foreground'}`}>
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-foreground flex-shrink-0" />
                )}
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-gray-500 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
