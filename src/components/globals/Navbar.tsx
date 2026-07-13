"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, ShoppingCart, User, Sun, Moon, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import dynamic from "next/dynamic";
const SearchModal = dynamic(() => import("./SearchModal"), { ssr: false });
import { useShop } from "@/context/ShopContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();
  const { cart } = useShop();
  const pathname = usePathname();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    
    // Body scroll lock for mobile menu
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  if (session) {
    navLinks.push(
      { name: "Add Item", href: "/dashboard/products/add" },
      { name: "Manage Items", href: "/dashboard/products" }
    );
  }

  const mobileNavLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  if (session) {
    mobileNavLinks.push(
      { name: "Dashboard", href: "/dashboard" },
      { name: "Add Item", href: "/dashboard/products/add" },
      { name: "Manage Items", href: "/dashboard/products" }
    );
  }

  return (
    <>
      {/* Top Promo Bar */}
      <div className="bg-[#4a4a4a] text-[#f4f1eb] py-2 px-4 text-xs font-medium flex justify-between items-center hidden sm:flex">
        <p>Free delivery on orders over $1499. Don't miss discount.</p>
        <div className="flex items-center space-x-6">
          <Link href="/contact" className="hover:text-white transition-colors">Help & contact</Link>
          <Link href="/products" className="hover:text-white transition-colors">Deals of the day</Link>
        </div>
      </div>

      <nav className="sticky top-0 z-50 w-full bg-background border-b border-gray-200 dark:border-zinc-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center w-1/4">
            <Link href="/" className="font-heading text-3xl font-medium text-foreground tracking-tight flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 stroke-1" />
              GadgetGrid
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center space-x-6 xl:space-x-10 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  pathname === link.href ? "text-foreground border-b-2 border-foreground" : "text-gray-500"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons & Actions */}
          <div className="hidden lg:flex items-center justify-end w-1/4 space-x-4">
            
            {/* Search Button */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-foreground hover:text-primary active:scale-95 transition-all"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {/* Theme Toggle */}
            {mounted && (
              <button 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 text-foreground hover:text-primary active:scale-95 transition-all"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}

            {/* Cart Icon */}
            <Link href="/cart" className="p-2 text-foreground hover:text-gray-500 transition-colors relative">
              <ShoppingCart className="w-5 h-5 stroke-1" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-background bg-foreground rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {status === "loading" ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            ) : session ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden shrink-0 hover:ring-2 hover:ring-primary/50 transition-all focus:outline-none"
                >
                  {session.user?.image ? (
                    <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    session.user?.name?.charAt(0).toUpperCase() || "U"
                  )}
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-background border border-gray-200 dark:border-zinc-800 rounded-lg shadow-lg overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-zinc-800">
                      <p className="text-sm font-medium text-foreground truncate">{session.user?.name || "User"}</p>
                      <p className="text-xs text-gray-500 truncate">{session.user?.email || ""}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-2 bg-foreground text-background px-5 py-2 rounded-full font-medium hover:bg-foreground/90 active:scale-95 transition-all"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-foreground hover:text-primary hover:bg-gray-100/50 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div 
        className={`fixed inset-y-0 left-0 w-[80%] max-w-sm bg-background shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link href="/" className="text-xl font-heading font-bold text-foreground">
            Gadget<span className="text-primary">Grid</span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md text-foreground hover:bg-gray-100/50 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 overflow-y-auto h-[calc(100vh-70px)]">
          {mobileNavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                pathname === link.href 
                  ? "text-primary bg-primary/5" 
                  : "text-foreground active:bg-gray-50"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="border-t border-gray-100 mt-4 pt-4 px-3 flex flex-col space-y-3">
            {session ? (
              <button
                onClick={() => {
                  setIsOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="flex items-center justify-center space-x-2 bg-red-50 text-red-500 px-4 py-3 rounded-lg font-medium active:bg-red-100 transition-all shadow-sm"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center justify-center space-x-2 bg-primary text-white dark:text-black px-4 py-3 rounded-lg font-medium active:bg-primary/90 transition-all shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>Login / Register</span>
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
    </>
  );
}
