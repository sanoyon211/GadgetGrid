import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Gadget from "@/models/Gadget";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : 0;
    const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 100000;
    const sort = searchParams.get("sort") || "newest"; // newest, price_asc, price_desc, rating
    const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
    const limit = searchParams.get("limit") ? Number(searchParams.get("limit")) : 9;

    const query: any = {
      price: { $gte: minPrice, $lte: maxPrice }
    };

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category && category !== "All Categories") {
      query.category = category;
    }

    let sortOption: any = { createdAt: -1 };
    if (sort === "price_asc") sortOption = { price: 1 };
    if (sort === "price_desc") sortOption = { price: -1 };
    if (sort === "rating") sortOption = { rating: -1 };

    const skip = (page - 1) * limit;

    const gadgets = await Gadget.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const total = await Gadget.countDocuments(query);

    return NextResponse.json({
      gadgets,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalItems: total,
    });
  } catch (error) {
    console.error("Fetch gadgets error:", error);
    return NextResponse.json({ message: "Error fetching gadgets" }, { status: 500 });
  }
}
