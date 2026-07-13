import Link from "next/link";
import { ChevronRight, ShieldCheck, Zap, HeartHandshake } from "lucide-react";


import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the mission, vision, and team behind GadgetGrid.",
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
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "David Chen",
      role: "Head of Product",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Elena Rodriguez",
      role: "Customer Experience",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="bg-background min-h-screen">
      
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200 dark:border-zinc-800 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm font-medium text-gray-500">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-foreground">About Us</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-24 lg:py-32 overflow-hidden bg-[var(--accent)]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-heading font-medium text-foreground tracking-tight mb-8">
            Redefining Your <br />
            Tech Experience
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            At GadgetGrid, we believe that technology should be accessible, beautiful, and seamlessly integrate into your daily life.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-zinc-800">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-10 lg:mb-0">
            <div className="aspect-square bg-[var(--accent)] flex items-center justify-center overflow-hidden">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" alt="GadgetGrid Office" className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-heading font-medium text-foreground mb-8">Our Story</h2>
            <p className="text-base text-gray-500 mb-6 leading-relaxed">
              Founded in 2026, GadgetGrid started with a simple idea: bringing the world's most innovative tech products directly to consumers without the hassle. We were tired of cluttered electronics stores and confusing specifications.
            </p>
            <p className="text-base text-gray-500 leading-relaxed">
              Today, we serve over 100,000 customers globally, curating only the best gadgets that meet our strict standards for design, performance, and reliability. We're not just a store; we're a community of tech enthusiasts.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-24 bg-background border-b border-gray-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-medium text-foreground">Our Core Values</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {values.map((value, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className={`w-12 h-12 mb-6 text-foreground`}>
                  <value.icon className={`w-10 h-10`} strokeWidth={1} />
                </div>
                <h3 className="text-lg font-heading font-medium text-foreground mb-4">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-medium text-foreground mb-4">Meet the Team</h2>
          <p className="text-sm tracking-wide text-gray-500">The passionate people behind GadgetGrid.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {team.map((member, idx) => (
            <div key={idx} className="text-center group flex flex-col items-center">
              <div className="w-40 h-40 rounded-full bg-[var(--accent)] mb-6 overflow-hidden relative">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <h3 className="text-sm font-bold tracking-widest uppercase text-foreground">{member.name}</h3>
              <p className="text-gray-500 text-xs mt-2">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
