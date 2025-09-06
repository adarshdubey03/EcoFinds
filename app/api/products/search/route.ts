import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Product from "@/models/Product";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";

    if (!query) {
      return NextResponse.json([]);
    }

    await connectDB();

    // 🔍 Case-insensitive search using regex
    const products = await Product.find({
      title: { $regex: query, $options: "i" },
    }).lean();

    return NextResponse.json(products);
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
