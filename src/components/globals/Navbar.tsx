"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, ShoppingCart, User, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-gray-200/50 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-heading text-2xl font-bold text-primary tracking-tight">
              Gadget<span className="text-secondary">Grid</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-foreground hover:text-primary font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Search Button */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-foreground hover:text-primary transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {/* Theme Toggle */}
            {mounted && (
              <button 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 text-foreground hover:text-primary transition-colors"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}

            {/* Cart Icon */}
            <Link href="/cart" className="p-2 text-foreground hover:text-primary transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              {/* Dummy badge for UI effect */}
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-primary rounded-full">3</span>
            </Link>
            <Link
              href="/login"
              className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-all shadow-sm"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-foreground hover:text-primary hover:bg-gray-100/50 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-gray-100 absolute w-full left-0 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-gray-100 mt-4 pt-4 px-3 flex flex-col space-y-3">
              <Link
                href="/login"
                className="flex items-center justify-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-all shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                <User className="w-4 h-4" />
                <span>Login / Register</span>
              </Link>
            </div>
          </div>
        </div>
      )}
      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
}
