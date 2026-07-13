import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import Order from "@/models/Order";
import User from "@/models/User";
import Gadget from "@/models/Gadget";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    
    // If admin, fetch all orders. Otherwise, fetch only user's orders.
    const isAdmin = session.user.role === 'admin';
    const query = isAdmin ? {} : { user: session.user.id };
    
    const orders = await Order.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Orders GET error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { shippingAddress, paymentMethod } = await req.json();

    await connectToDatabase();
    
    const user = await User.findById(session.user.id).populate('cart.product');
    if (!user || user.cart.length === 0) {
      return NextResponse.json({ message: "Cart is empty or user not found" }, { status: 400 });
    }

    let totalAmount = 0;
    const items = user.cart.map((cartItem: any) => {
      const product = cartItem.product;
      const quantity = cartItem.quantity;
      totalAmount += product.price * quantity;
      
      return {
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.images[0] || "",
      };
    });

    const newOrder = await Order.create({
      user: session.user.id,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    // Deduct stock for each product
    await Promise.all(user.cart.map(async (cartItem: any) => {
      const product = cartItem.product;
      const quantity = cartItem.quantity;
      await Gadget.findByIdAndUpdate(product._id, { $inc: { stock: -quantity } });
    }));

    // Clear the user's cart
    user.cart = [];
    await user.save();

    return NextResponse.json({ message: "Order placed successfully", orderId: newOrder._id }, { status: 201 });
  } catch (error) {
    console.error("Orders POST error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
