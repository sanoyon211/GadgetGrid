import { Mail } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-primary dark:bg-primary/20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-black/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Get 10% Off Your First Order
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-8">
            Subscribe to our newsletter to get updates on our latest offers and new tech arrivals. No spam, we promise.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
              required
            />
            <button
              type="submit"
              className="px-8 py-3.5 rounded-full bg-white text-primary font-medium hover:bg-gray-100 transition-colors shadow-lg"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-sm text-white/60">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  );
}
