// app/api/products/[id]/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Product from "@/models/Product";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const product = await Product.findById(params.id);
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json({ product }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    await connectDB();
    const product = await Product.findById(params.id);
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    if (product.owner.toString() !== decoded.id)
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });

    await Product.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// NEW PUT handler for editing product
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    const { title, category, description, price, image } = await req.json();

    await connectDB();
    const product = await Product.findById(params.id);
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    if (product.owner.toString() !== decoded.id)
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });

    product.title = title;
    product.category = category;
    product.description = description;
    product.price = price;
    product.image = image;

    await product.save();
    return NextResponse.json({ product }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
