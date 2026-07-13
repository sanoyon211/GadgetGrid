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
    <div className="bg-background min-h-screen pb-24">
      
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200 dark:border-zinc-800 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm font-medium text-gray-500">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-foreground">Contact Us</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-heading font-medium text-foreground mb-6">
          Get in Touch
        </h1>
        <p className="text-sm tracking-wide text-gray-500 max-w-2xl mx-auto">
          Have a question about a product, order, or just want to say hi? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-12 pt-8">
            
            <div className="flex flex-col text-left">
              <div className="w-10 h-10 border border-foreground rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-4 h-4 text-foreground" />
              </div>
              <h3 className="text-lg font-heading font-medium text-foreground mb-3">Our Office</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                123 Tech Avenue, Suite 400<br />
                San Francisco, CA 94105
              </p>
            </div>

            <div className="flex flex-col text-left">
              <div className="w-10 h-10 border border-foreground rounded-full flex items-center justify-center mb-6">
                <Phone className="w-4 h-4 text-foreground" />
              </div>
              <h3 className="text-lg font-heading font-medium text-foreground mb-3">Phone</h3>
              <p className="text-gray-500 text-sm mb-2">Mon-Fri from 8am to 5pm.</p>
              <a href="tel:+15551234567" className="text-foreground text-sm hover:text-gray-500 transition-colors">+1 (555) 123-4567</a>
            </div>

            <div className="flex flex-col text-left">
              <div className="w-10 h-10 border border-foreground rounded-full flex items-center justify-center mb-6">
                <Mail className="w-4 h-4 text-foreground" />
              </div>
              <h3 className="text-lg font-heading font-medium text-foreground mb-3">Email</h3>
              <p className="text-gray-500 text-sm mb-2">Our friendly team is here to help.</p>
              <a href="mailto:support@gadgetgrid.com" className="text-foreground text-sm hover:text-gray-500 transition-colors">support@gadgetgrid.com</a>
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-[var(--accent)] p-8 sm:p-12">
              <h2 className="text-3xl font-heading font-medium text-foreground mb-8">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <input 
                      type="text" 
                      required
                      className="block w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 text-foreground focus:ring-0 focus:border-foreground transition-colors placeholder-gray-500 text-sm"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      required
                      className="block w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 text-foreground focus:ring-0 focus:border-foreground transition-colors placeholder-gray-500 text-sm"
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                <div>
                  <input 
                    type="email" 
                    required
                    className="block w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 text-foreground focus:ring-0 focus:border-foreground transition-colors placeholder-gray-500 text-sm"
                    placeholder="Email Address"
                  />
                </div>

                <div>
                  <input 
                    type="text" 
                    required
                    className="block w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 text-foreground focus:ring-0 focus:border-foreground transition-colors placeholder-gray-500 text-sm"
                    placeholder="Subject"
                  />
                </div>

                <div>
                  <textarea 
                    required
                    rows={5}
                    className="block w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 text-foreground focus:ring-0 focus:border-foreground transition-colors placeholder-gray-500 text-sm resize-none"
                    placeholder="Message"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center gap-2 py-4 px-6 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm tracking-wider uppercase mt-4"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message
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
