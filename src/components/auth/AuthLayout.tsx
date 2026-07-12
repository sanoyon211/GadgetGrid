import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2 xl:w-5/12 2xl:w-1/3 pt-12 pb-24">
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
