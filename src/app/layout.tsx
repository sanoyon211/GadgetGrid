import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import LayoutWrapper from "@/components/globals/LayoutWrapper";
import { ThemeProvider } from "@/components/globals/ThemeProvider";
import AuthProvider from "@/components/globals/AuthProvider";
import { ShopProvider } from "@/context/ShopContext";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | GadgetGrid",
    default: "GadgetGrid | Premium Tech Marketplace",
  },
  description: "Your ultimate destination for premium tech gadgets, smartphones, laptops, and accessories.",
  openGraph: {
    title: "GadgetGrid | Premium Tech Marketplace",
    description: "Your ultimate destination for premium tech gadgets, smartphones, laptops, and accessories.",
    url: "https://gadgetgrid.com",
    siteName: "GadgetGrid",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GadgetGrid | Premium Tech Marketplace",
    description: "Your ultimate destination for premium tech gadgets, smartphones, laptops, and accessories.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} antialiased h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground transition-colors duration-300">
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ShopProvider>
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
              <Toaster richColors position="top-right" />
            </ShopProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
