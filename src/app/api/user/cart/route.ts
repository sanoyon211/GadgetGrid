import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import "@/models/Gadget";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    
    const user = await User.findById(session.user.id).populate('cart.product');
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ cart: user.cart }, { status: 200 });
  } catch (error) {
    console.error("Cart GET error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId, quantity, replace } = await req.json();
    if (!productId) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    const qty = quantity || 1;

    await connectToDatabase();
    
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const existingCartItem = user.cart.find(item => item.product.toString() === productId);
    
    if (existingCartItem) {
      if (replace) {
        existingCartItem.quantity = qty;
      } else {
        existingCartItem.quantity += qty;
      }
    } else {
      user.cart.push({ product: productId, quantity: qty });
    }

    await user.save();
    
    const populatedUser = await User.findById(session.user.id).populate('cart.product');

    return NextResponse.json({ cart: populatedUser?.cart }, { status: 200 });
  } catch (error) {
    console.error("Cart POST error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');

    await connectToDatabase();
    
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (productId) {
      user.cart = user.cart.filter(item => item.product.toString() !== productId);
    } else {
      user.cart = []; // Clear entire cart
    }

    await user.save();
    
    const populatedUser = await User.findById(session.user.id).populate('cart.product');

    return NextResponse.json({ cart: populatedUser?.cart }, { status: 200 });
  } catch (error) {
    console.error("Cart DELETE error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
