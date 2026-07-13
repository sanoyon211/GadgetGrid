import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import Coupon from "@/models/Coupon";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    
    const coupons = await Coupon.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ coupons }, { status: 200 });
  } catch (error) {
    console.error("Coupons GET error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { code, discountPercentage, expiresAt } = await req.json();

    if (!code || !discountPercentage || !expiresAt) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await connectToDatabase();
    
    const existing = await Coupon.findOne({ code: code.toUpperCase() });
    if (existing) {
        return NextResponse.json({ message: "Coupon code already exists" }, { status: 400 });
    }

    const newCoupon = await Coupon.create({
        code,
        discountPercentage: Number(discountPercentage),
        expiresAt: new Date(expiresAt)
    });

    return NextResponse.json({ message: "Coupon created successfully", coupon: newCoupon }, { status: 201 });
  } catch (error) {
    console.error("Coupons POST error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
