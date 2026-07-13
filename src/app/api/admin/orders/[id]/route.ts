import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import Order from "@/models/Order";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { status } = await req.json();

    await connectToDatabase();
    
    const updatedOrder = await Order.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order updated successfully", order: updatedOrder }, { status: 200 });
  } catch (error) {
    console.error("Orders PUT error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
