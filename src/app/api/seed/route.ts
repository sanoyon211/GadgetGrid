import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Gadget from "@/models/Gadget";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const dummyGadgets = [
  {
    name: "MacBook Pro 16\" (M3 Max)",
    shortDescription: "The most advanced Mac ever built.",
    description: "Experience the ultimate blend of design and functionality with this premium laptop. Crafted with aerospace-grade materials, it offers unparalleled durability while maintaining a sleek, modern aesthetic. Whether you're a professional on the go or a tech enthusiast, this device is engineered to meet and exceed your expectations.",
    price: 3499,
    originalPrice: 3699,
    category: "Laptops & MacBooks",
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000"],
    stock: 50,
    rating: 4.9,
    reviewsCount: 128,
    isFeatured: true,
    isTrending: true,
    specifications: { "Chip": "M3 Max", "RAM": "36GB" },
  },
  {
    name: "Sony WH-1000XM5",
    shortDescription: "Industry-leading noise canceling headphones.",
    description: "These premium headphones deliver exceptional sound quality and noise cancellation, creating a truly immersive listening experience. Enjoy crystal-clear audio, whether you're listening to music, taking calls, or enjoying a podcast in a noisy environment.",
    price: 398,
    category: "Audio & Headphones",
    images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1000"],
    stock: 120,
    rating: 4.8,
    reviewsCount: 356,
    isTrending: true,
    specifications: { "Type": "Over-ear", "Noise Cancellation": "Yes" },
  },
  {
    name: "iPhone 15 Pro Max",
    shortDescription: "Titanium design with A17 Pro chip.",
    description: "The iPhone 15 Pro Max features a strong and lightweight titanium design with new contoured edges, a new Action button, powerful camera upgrades, and A17 Pro for next-level performance and mobile gaming.",
    price: 1199,
    category: "Smartphones",
    images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=1000"],
    stock: 85,
    rating: 4.9,
    reviewsCount: 892,
    specifications: { "Storage": "256GB", "Display": "6.7 inch" },
  },
  {
    name: "Apple Watch Ultra 2",
    shortDescription: "Rugged and capable, built to meet the demands of endurance athletes.",
    description: "The most rugged and capable Apple Watch pushes the limits again. Featuring the all-new S9 SiP, a magical new way to use your watch without touching the screen, and the brightest Apple display ever.",
    price: 799,
    category: "Wearables",
    images: ["https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&q=80&w=1000"],
    stock: 45,
    rating: 4.7,
    reviewsCount: 215,
    isFeatured: true,
    specifications: { "Case": "Titanium", "GPS": "Dual-frequency" },
  },
  {
    name: "PlayStation 5 Console",
    shortDescription: "Lightning fast loading with an ultra-high speed SSD.",
    description: "Experience lightning fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games.",
    price: 499,
    category: "Gaming",
    images: ["https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1000"],
    stock: 30,
    rating: 4.9,
    reviewsCount: 1240,
    specifications: { "Storage": "825GB SSD", "Resolution": "8K Output" },
  },
  {
    name: "Canon EOS R5",
    shortDescription: "Professional mirrorless camera.",
    description: "The EOS R5 builds off of the powerful legacy of Canon's full frame cameras offering next generation refinements in image quality, performance and reliability. It's an ideal choice for a large range of photographic and cinematographic environments.",
    price: 3899,
    originalPrice: 3999,
    category: "Cameras",
    images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000"],
    stock: 15,
    rating: 4.8,
    reviewsCount: 89,
    specifications: { "Sensor": "45MP Full-Frame", "Video": "8K Raw" },
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    shortDescription: "Galaxy AI is here.",
    description: "Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility — starting with the most important device in your life.",
    price: 1299,
    category: "Smartphones",
    images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=1000"],
    stock: 90,
    rating: 4.8,
    reviewsCount: 412,
    specifications: { "Camera": "200MP", "S Pen": "Included" },
  },
  {
    name: "AirPods Pro (2nd Gen)",
    shortDescription: "Rich, high-quality audio and voice.",
    description: "AirPods Pro feature up to 2x more Active Noise Cancellation, plus Adaptive Transparency, and Personalized Spatial Audio with dynamic head tracking for immersive sound. Now with multiple ear tips for a customizable fit.",
    price: 249,
    category: "Audio & Headphones",
    images: ["https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=1000"],
    stock: 200,
    rating: 4.9,
    reviewsCount: 2310,
    specifications: { "Battery": "Up to 30 hours", "Charging": "MagSafe" },
  },
  {
    name: "iPad Pro 12.9\"",
    shortDescription: "The ultimate iPad experience.",
    description: "Astonishing performance. Incredibly advanced displays. Superfast wireless connectivity. Next-level Apple Pencil capabilities. Powerful new features in iPadOS 16. The ultimate iPad experience.",
    price: 1099,
    category: "Tablets",
    images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=1000"],
    stock: 60,
    rating: 4.9,
    reviewsCount: 534,
    isTrending: true,
    specifications: { "Chip": "M2", "Display": "Liquid Retina XDR" },
  }
];

export async function GET() {
  try {
    await connectToDatabase();
    
    // Clear existing
    await Gadget.deleteMany({});
    await User.deleteMany({});
    
    // Insert new gadgets
    await Gadget.insertMany(dummyGadgets);

    // Insert new users
    const hashedAdminPassword = await bcrypt.hash("admin123", 10);
    const hashedUserPassword = await bcrypt.hash("user123", 10);

    await User.insertMany([
      {
        name: "Admin User",
        email: "admin@gadgetgrid.com",
        password: hashedAdminPassword,
        role: "admin",
      },
      {
        name: "Regular User",
        email: "user@gadgetgrid.com",
        password: hashedUserPassword,
        role: "user",
      }
    ]);
    
    return NextResponse.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ message: "Error seeding database" }, { status: 500 });
  }
}
