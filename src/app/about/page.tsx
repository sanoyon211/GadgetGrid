import Link from "next/link";
import { ChevronRight, ShieldCheck, Zap, HeartHandshake } from "lucide-react";

export const metadata = {
  title: "About Us | GadgetGrid",
  description: "Learn more about GadgetGrid and our mission.",
};

export default function AboutPage() {
  const values = [
    {
      title: "Premium Quality",
      description: "We source only the highest quality tech gadgets from trusted global manufacturers.",
      icon: ShieldCheck,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Lightning Fast Delivery",
      description: "Get your new gadgets delivered to your doorstep in record time.",
      icon: Zap,
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    {
      title: "Customer First",
      description: "Our 24/7 support team is always ready to help you with any issues or queries.",
      icon: HeartHandshake,
      color: "text-green-500",
      bg: "bg-green-500/10"
    }
  ];

  const team = [
    {
      name: "Sarah Jenkins",
      role: "Founder & CEO",
      image: "👩‍💼"
    },
    {
      name: "David Chen",
      role: "Head of Product",
      image: "👨‍💻"
    },
    {
      name: "Elena Rodriguez",
      role: "Customer Experience",
      image: "👩‍💻"
    }
  ];

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      
      {/* Breadcrumbs */}
      <div className="border-b border-gray-100 dark:border-zinc-900 bg-gray-50/50 dark:bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm font-medium text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 dark:text-gray-300">About Us</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10"></div>
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
            Redefining Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Tech Experience</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            At GadgetGrid, we believe that technology should be accessible, beautiful, and seamlessly integrate into your daily life.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-10 lg:mb-0">
            <div className="aspect-square rounded-3xl bg-gray-100 dark:bg-zinc-900 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-zinc-800">
              <span className="text-[12rem]">🏢</span>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Founded in 2026, GadgetGrid started with a simple idea: bringing the world's most innovative tech products directly to consumers without the hassle. We were tired of cluttered electronics stores and confusing specifications.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Today, we serve over 100,000 customers globally, curating only the best gadgets that meet our strict standards for design, performance, and reliability. We're not just a store; we're a community of tech enthusiasts.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-20 bg-gray-50 dark:bg-zinc-950 border-y border-gray-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Our Core Values</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-gray-200 dark:border-zinc-800 text-center hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl">
                <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 ${value.bg}`}>
                  <value.icon className={`w-8 h-8 ${value.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{value.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">Meet the Team</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">The passionate people behind GadgetGrid.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="text-center">
              <div className="w-48 h-48 mx-auto rounded-full bg-gray-100 dark:bg-zinc-900 flex items-center justify-center mb-6 border-4 border-white dark:border-black shadow-lg">
                <span className="text-7xl">{member.image}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
              <p className="text-primary font-medium mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
