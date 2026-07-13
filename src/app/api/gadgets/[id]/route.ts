import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import Gadget from "@/models/Gadget";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    const resolvedParams = await params;
    
    const gadget = await Gadget.findById(resolvedParams.id);
    if (!gadget) return NextResponse.json({ message: "Not found" }, { status: 404 });

    // Check ownership-based permissions
    if (gadget.userId?.toString() !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json({ message: "Forbidden: You don't own this product" }, { status: 403 });
    }

    await Gadget.findByIdAndDelete(resolvedParams.id);
    return NextResponse.json({ message: "Gadget deleted successfully" });
  } catch (error) {
    console.error("Error deleting gadget:", error);
    return NextResponse.json({ message: "Error deleting gadget" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    await connectToDatabase();
    const resolvedParams = await params;

    const gadget = await Gadget.findById(resolvedParams.id);
    if (!gadget) return NextResponse.json({ message: "Not found" }, { status: 404 });

    // Check ownership-based permissions
    if (gadget.userId?.toString() !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json({ message: "Forbidden: You don't own this product" }, { status: 403 });
    }

    const updatedGadget = await Gadget.findByIdAndUpdate(resolvedParams.id, data, { new: true });
    return NextResponse.json({ message: "Gadget updated successfully", gadget: updatedGadget });
  } catch (error) {
    console.error("Error updating gadget:", error);
    return NextResponse.json({ message: "Error updating gadget" }, { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const resolvedParams = await params;
    const gadget = await Gadget.findById(resolvedParams.id);
    if (!gadget) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ gadget });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching gadget" }, { status: 500 });
  }
}
