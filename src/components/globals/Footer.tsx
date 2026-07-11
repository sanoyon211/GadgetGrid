import Link from "next/link";
import { Facebook, Twitter, Instagram, Github, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="font-heading text-3xl font-bold tracking-tight inline-block">
              Gadget<span className="text-primary">Grid</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Your ultimate destination for premium tech gadgets. Buy, sell, and discover the best devices on the market.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/explore" className="text-gray-300 hover:text-primary transition-colors text-sm">Explore Gadgets</Link></li>
              <li><Link href="/categories" className="text-gray-300 hover:text-primary transition-colors text-sm">Categories</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-primary transition-colors text-sm">About Us</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-primary transition-colors text-sm">Tech Blog</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Customer Support</h3>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-gray-300 hover:text-primary transition-colors text-sm">Contact Us</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-primary transition-colors text-sm">FAQ</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-primary transition-colors text-sm">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-primary transition-colors text-sm">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-300 text-sm">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <span>123 Tech Avenue, Silicon Valley, CA 94025</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-300 text-sm">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-300 text-sm">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span>support@gadgetgrid.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} GadgetGrid. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <span className="text-gray-400 text-sm font-medium">Built with Next.js & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
