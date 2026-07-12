"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, LogIn, User } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Successfully logged in!");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoAdminLogin = () => {
    setEmail("admin@gadgetgrid.com");
    setPassword("admin123");
    toast("Admin credentials auto-filled. Please click Sign in.");
  };

  const handleDemoUserLogin = () => {
    setEmail("user@gadgetgrid.com");
    setPassword("user123");
    toast("User credentials auto-filled. Please click Sign in.");
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-2">
        Welcome back
      </h2>
      <p className="text-gray-500 mb-8">
        Please enter your details to sign in.
      </p>

      {/* Social Login */}
      <div className="flex gap-4 mb-6">
        <button 
          type="button"
          onClick={() => toast("Google login would open here")}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-300 dark:border-zinc-700 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
        >
          <FaGoogle className="text-red-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Google</span>
        </button>
        <button 
          type="button"
          onClick={() => toast("GitHub login would open here")}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-300 dark:border-zinc-700 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
        >
          <FaGithub className="text-gray-900 dark:text-white" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">GitHub</span>
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <button 
          type="button"
          onClick={handleDemoAdminLogin}
          className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-primary/20 bg-primary/5 text-primary rounded-xl font-bold hover:bg-primary/10 transition-colors"
        >
          <User className="w-5 h-5" />
          Demo Admin
        </button>

        <button 
          type="button"
          onClick={handleDemoUserLogin}
          className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <User className="w-5 h-5" />
          Demo User
        </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-zinc-800"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-black text-gray-500">Or continue with</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-10 px-4 py-3 border border-gray-200 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 px-4 py-3 border border-gray-200 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all sm:text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded dark:border-zinc-700 dark:bg-zinc-900 cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-primary hover:text-primary/80 transition-colors">
              Forgot password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Sign in
              <LogIn className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
        Don't have an account?{" "}
        <Link href="/register" className="font-medium text-primary hover:text-primary/80 transition-colors">
          Sign up now
        </Link>
      </p>
    </div>
  );
}
