import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2 xl:w-5/12 2xl:w-1/3 pt-12 pb-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10 text-center lg:text-left">
            <Link href="/" className="font-heading text-3xl font-bold tracking-tight inline-block">
              Gadget<span className="text-primary">Grid</span>
            </Link>
          </div>
          {children}
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:block relative flex-1 w-0">
        <div className="absolute inset-0 h-full w-full bg-zinc-950 flex flex-col justify-center p-12 overflow-hidden">
          
          {/* Decorative background elements */}
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[100px]" />
          
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="inline-block p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <span className="text-6xl">🚀</span>
            </div>
            <h2 className="text-4xl font-heading font-bold text-white mb-6 leading-tight">
              Join the Ultimate <br/> Tech Community
            </h2>
            <p className="text-lg text-gray-400 max-w-lg mx-auto">
              Get early access to premium gadgets, exclusive member discounts, and a seamless checkout experience.
            </p>
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
          
        </div>
      </div>
    </div>
  );
}
