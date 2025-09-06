// app/api/products/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Product from "@/models/Product";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

// POST: Create a new product (requires authentication)
export async function POST(req: Request) {
  try {
    const { title, category, description, price, image } = await req.json();

    // Get token from headers
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    await connectDB();

    // Create new product
    const product = await Product.create({
      title,
      category,
      description,
      price,
      image,
      owner: decoded.id,
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET: Fetch products (all, by category, or by owner)
export async function GET(req: Request) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const category = url.searchParams.get("category"); // optional filter
    const owner = url.searchParams.get("owner"); // optional filter

    let filter: any = {};
    if (category) filter.category = category;
    if (owner) filter.owner = owner;

    const products = await Product.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
