import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import Review from "@/models/Review";
import Gadget from "@/models/Gadget";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    
    const reviews = await Review.find({ gadget: params.id })
      .populate('user', 'name image')
      .sort({ createdAt: -1 });

    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    console.error("Reviews GET error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { rating, comment } = await req.json();

    if (!rating || rating < 1 || rating > 5 || !comment) {
      return NextResponse.json({ message: "Invalid rating or comment" }, { status: 400 });
    }

    await connectToDatabase();

    // Create review
    const newReview = await Review.create({
      user: session.user.id,
      gadget: params.id,
      rating,
      comment,
    });

    // Update Gadget rating and reviewsCount
    const allReviews = await Review.find({ gadget: params.id });
    const totalRating = allReviews.reduce((sum, rev) => sum + rev.rating, 0);
    const avgRating = totalRating / allReviews.length;

    await Gadget.findByIdAndUpdate(params.id, {
      rating: Number(avgRating.toFixed(1)),
      reviewsCount: allReviews.length,
    });

    // Populate user to return back the fresh review
    await newReview.populate('user', 'name image');

    return NextResponse.json({ message: "Review added successfully", review: newReview }, { status: 201 });
  } catch (error: any) {
    console.error("Reviews POST error:", error);
    if (error.code === 11000) {
      return NextResponse.json({ message: "You have already reviewed this gadget" }, { status: 400 });
    }
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
