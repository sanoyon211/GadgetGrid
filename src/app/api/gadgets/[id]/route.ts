import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Gadget from "@/models/Gadget";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const resolvedParams = await params;
    
    // In a real app, verify user session is admin here
    
    await Gadget.findByIdAndDelete(resolvedParams.id);
    return NextResponse.json({ message: "Gadget deleted successfully" });
  } catch (error) {
    console.error("Error deleting gadget:", error);
    return NextResponse.json({ message: "Error deleting gadget" }, { status: 500 });
  }
}
