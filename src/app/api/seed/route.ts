import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Gadget from "@/models/Gadget";

const dummyGadgets = [
  {
    name: "MacBook Pro 16\" (M3 Max)",
    description: "The most advanced Mac ever built.",
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
    description: "Industry-leading noise canceling headphones.",
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
    description: "Titanium design with A17 Pro chip.",
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
    description: "Rugged and capable, built to meet the demands of endurance athletes.",
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
    description: "Lightning fast loading with an ultra-high speed SSD.",
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
    description: "Professional mirrorless camera.",
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
    description: "Galaxy AI is here.",
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
    description: "Rich, high-quality audio and voice.",
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
    description: "The ultimate iPad experience.",
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
    
    // Insert new
    await Gadget.insertMany(dummyGadgets);
    
    return NextResponse.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ message: "Error seeding database" }, { status: 500 });
  }
}
