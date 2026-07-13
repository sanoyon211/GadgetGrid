import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, currentPassword, newPassword } = await req.json();
    await connectToDatabase();

    const user = await User.findById(session.user.id);
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    if (name) {
      user.name = name;
    }

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return NextResponse.json({ message: "Incorrect current password" }, { status: 400 });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();
    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
