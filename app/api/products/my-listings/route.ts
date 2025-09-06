import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Product from "@/models/Product";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function GET(req: Request) {
  try {
    // Get token from headers
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    await connectDB();

    // Find products owned by the user
    const products = await Product.find({ owner: decoded.id }).sort({ createdAt: -1 });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
