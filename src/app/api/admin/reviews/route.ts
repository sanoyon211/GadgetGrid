import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import Review from "@/models/Review";
// Import User and Gadget to ensure they are registered in Mongoose for population
import "@/models/User";
import "@/models/Gadget";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    
    const reviews = await Review.find({})
      .populate("user", "name email")
      .populate("gadget", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    console.error("Reviews GET error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
