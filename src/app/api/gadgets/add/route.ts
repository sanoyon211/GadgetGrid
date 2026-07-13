import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import Gadget from "@/models/Gadget";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    await connectToDatabase();
    
    // Assign ownership to the user who creates it
    data.userId = session.user.id;
    
    const newGadget = await Gadget.create(data);
    return NextResponse.json({ message: "Gadget added successfully", gadget: newGadget }, { status: 201 });
  } catch (error) {
    console.error("Error adding gadget:", error);
    return NextResponse.json({ message: "Error adding gadget" }, { status: 500 });
  }
}
