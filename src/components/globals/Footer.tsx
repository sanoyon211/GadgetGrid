import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground pt-16 pb-8 border-t border-gray-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="font-heading text-3xl font-medium tracking-tight inline-block flex items-center gap-2">
              <span className="w-6 h-6 border-2 border-foreground rounded-full flex items-center justify-center text-xs font-bold">G</span>
              GadgetGrid
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Your ultimate destination for premium tech gadgets. Buy, sell, and discover the best devices on the market.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-foreground transition-colors"><FaFacebook className="w-4 h-4" /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-foreground transition-colors"><FaTwitter className="w-4 h-4" /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-foreground transition-colors"><FaInstagram className="w-4 h-4" /></a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-foreground transition-colors"><FaGithub className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/products" className="text-gray-500 hover:text-foreground transition-colors text-sm">Shop All Gadgets</Link></li>
              <li><Link href="/#categories" className="text-gray-500 hover:text-foreground transition-colors text-sm">Categories</Link></li>
              <li><Link href="/about" className="text-gray-500 hover:text-foreground transition-colors text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-500 hover:text-foreground transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-foreground">Customer Support</h3>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-gray-500 hover:text-foreground transition-colors text-sm">Contact Us</Link></li>
              <li><Link href="/#faq" className="text-gray-500 hover:text-foreground transition-colors text-sm">FAQ</Link></li>
              <li><Link href="/terms" className="text-gray-500 hover:text-foreground transition-colors text-sm">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-gray-500 hover:text-foreground transition-colors text-sm">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-foreground">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-500 text-sm">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <span>123 Tech Avenue, Silicon Valley, CA 94025</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500 text-sm">
                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500 text-sm">
                <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <span>support@gadgetgrid.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} GadgetGrid. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <span className="font-medium">Designed by Antigravity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
