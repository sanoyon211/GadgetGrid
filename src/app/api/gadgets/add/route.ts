import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Gadget from "@/models/Gadget";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await connectToDatabase();
    
    // In a real app, verify user session is admin here
    
    const newGadget = await Gadget.create(data);
    return NextResponse.json({ message: "Gadget added successfully", gadget: newGadget }, { status: 201 });
  } catch (error) {
    console.error("Error adding gadget:", error);
    return NextResponse.json({ message: "Error adding gadget" }, { status: 500 });
  }
}
