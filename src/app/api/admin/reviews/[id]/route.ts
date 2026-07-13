import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import Review from "@/models/Review";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    
    const deletedReview = await Review.findByIdAndDelete(params.id);

    if (!deletedReview) {
      return NextResponse.json({ message: "Review not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Review deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Reviews DELETE error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
