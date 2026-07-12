import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import Gadget from "@/models/Gadget"; // needed for population

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    
    // We populate the wishlist with the Gadget details
    const user = await User.findById(session.user.id).populate('wishlist');
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ wishlist: user.wishlist }, { status: 200 });
  } catch (error) {
    console.error("Wishlist GET error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    await connectToDatabase();
    
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const index = user.wishlist.indexOf(productId);
    let added = false;
    
    if (index === -1) {
      user.wishlist.push(productId);
      added = true;
    } else {
      user.wishlist.splice(index, 1);
    }

    await user.save();
    
    const populatedUser = await User.findById(session.user.id).populate('wishlist');

    return NextResponse.json({ 
      wishlist: populatedUser?.wishlist, 
      added 
    }, { status: 200 });
  } catch (error) {
    console.error("Wishlist POST error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
