import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Coupon from "@/models/Coupon";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ message: "Coupon code is required" }, { status: 400 });
    }

    await connectToDatabase();
    
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return NextResponse.json({ message: "Invalid coupon code" }, { status: 404 });
    }

    if (!coupon.isActive) {
      return NextResponse.json({ message: "This coupon is no longer active" }, { status: 400 });
    }

    if (new Date(coupon.expiresAt) < new Date()) {
      return NextResponse.json({ message: "This coupon has expired" }, { status: 400 });
    }

    return NextResponse.json({ 
        message: "Coupon applied successfully", 
        discountPercentage: coupon.discountPercentage 
    }, { status: 200 });
  } catch (error) {
    console.error("Coupons Apply error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
