import Link from "next/link";
import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex relative">
      {/* Back to Homepage Button */}
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-foreground transition-colors z-10 bg-white/80 dark:bg-zinc-950/80 px-4 py-2 rounded-full backdrop-blur-sm border border-gray-200 dark:border-zinc-800 shadow-sm">
        <ArrowLeft className="w-4 h-4" />
        Back to homepage
      </Link>

      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2 xl:w-5/12 2xl:w-1/3 pt-20 pb-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-16 text-center lg:text-left">
            <Link href="/" className="font-heading text-3xl font-medium tracking-wide inline-block text-foreground">
              GadgetGrid.
            </Link>
          </div>
          {children}
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:block relative flex-1 w-0 bg-[var(--accent)]">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200" alt="Minimalist tech" className="w-full h-full object-cover grayscale opacity-90" />
        </div>
      </div>
    </div>
  );
}
