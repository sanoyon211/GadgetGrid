"use client";

import Link from "next/link";
import { ChevronRight, MapPin, Phone, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent successfully!", {
        description: "Our team will get back to you within 24 hours."
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-black min-h-screen pb-20">
      
      {/* Breadcrumbs */}
      <div className="border-b border-gray-100 dark:border-zinc-900 bg-gray-50/50 dark:bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm font-medium text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 dark:text-gray-300">Contact Us</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-gray-900 dark:text-white mb-4">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Have a question about a product, order, or just want to say hi? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            
            <div className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-2xl border border-gray-100 dark:border-zinc-800 flex flex-col items-center text-center hover:border-primary transition-colors">
              <div className="w-14 h-14 bg-white dark:bg-black rounded-full flex items-center justify-center shadow-sm mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Our Office</h3>
              <p className="text-gray-500 dark:text-gray-400">
                123 Tech Avenue, Suite 400<br />
                San Francisco, CA 94105
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-2xl border border-gray-100 dark:border-zinc-800 flex flex-col items-center text-center hover:border-primary transition-colors">
              <div className="w-14 h-14 bg-white dark:bg-black rounded-full flex items-center justify-center shadow-sm mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Phone</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-1">Mon-Fri from 8am to 5pm.</p>
              <a href="tel:+15551234567" className="text-primary font-medium hover:underline">+1 (555) 123-4567</a>
            </div>

            <div className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-2xl border border-gray-100 dark:border-zinc-800 flex flex-col items-center text-center hover:border-primary transition-colors">
              <div className="w-14 h-14 bg-white dark:bg-black rounded-full flex items-center justify-center shadow-sm mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Email</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-1">Our friendly team is here to help.</p>
              <a href="mailto:support@gadgetgrid.com" className="text-primary font-medium hover:underline">support@gadgetgrid.com</a>
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-zinc-900 p-8 sm:p-10 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">First Name</label>
                    <input 
                      type="text" 
                      required
                      className="block w-full px-4 py-3 border border-gray-200 dark:border-zinc-700 rounded-xl bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Last Name</label>
                    <input 
                      type="text" 
                      required
                      className="block w-full px-4 py-3 border border-gray-200 dark:border-zinc-700 rounded-xl bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    required
                    className="block w-full px-4 py-3 border border-gray-200 dark:border-zinc-700 rounded-xl bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject</label>
                  <input 
                    type="text" 
                    required
                    className="block w-full px-4 py-3 border border-gray-200 dark:border-zinc-700 rounded-xl bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                  <textarea 
                    required
                    rows={5}
                    className="block w-full px-4 py-3 border border-gray-200 dark:border-zinc-700 rounded-xl bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center gap-2 py-4 px-6 rounded-xl shadow-lg shadow-primary/25 text-white bg-primary hover:bg-primary/90 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed font-medium text-lg"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
