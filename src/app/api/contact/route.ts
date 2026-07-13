import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Message from "@/models/Message";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await connectToDatabase();
    
    await Message.create({ name, email, subject, message });

    return NextResponse.json({ message: "Message sent successfully" }, { status: 201 });
  } catch (error) {
    console.error("Contact POST error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
