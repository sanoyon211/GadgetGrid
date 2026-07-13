import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import Order from "@/models/Order";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { status } = await req.json();
    await connectToDatabase();
    const resolvedParams = await params;

    const order = await Order.findByIdAndUpdate(
      resolvedParams.id,
      { status },
      { new: true }
    );

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order status updated successfully", order }, { status: 200 });
  } catch (error) {
    console.error("Order update error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
