import { Mail } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="relative py-24 bg-[var(--accent)] border-t border-gray-100 dark:border-zinc-800">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-heading font-medium text-foreground mb-4">
          Subscribe newsletter
        </h2>
        <p className="text-gray-500 text-sm mb-10 tracking-wide">
          Subscribe to our newsletter to get updates on our latest offers and new tech arrivals.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your Email"
            className="flex-1 px-4 py-3 bg-transparent border-b border-gray-400 text-foreground placeholder-gray-500 focus:outline-none focus:border-foreground rounded-none transition-colors"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 font-medium text-xs tracking-wider uppercase text-foreground hover:text-gray-500 transition-colors border-b border-gray-400 hover:border-gray-500"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
