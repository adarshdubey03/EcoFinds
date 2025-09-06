// app/api/purchases/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import { Purchase } from "@/models/Purchase";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Verify JWT
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded.id; // ensure JWT has { id: user._id }

    const data = await req.json();
    if (!data.products || !Array.isArray(data.products) || !data.totalAmount) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    const newPurchase = new Purchase({
      user: userId, // save actual JWT user ID
      products: data.products.map((p: any) => ({
        productId: p.productId,
        title: p.title,
        price: p.price,
        quantity: p.quantity,
      })),
      total: data.totalAmount,
      status: "completed",
      purchasedAt: new Date(),
    });

    const savedPurchase = await newPurchase.save();
    return NextResponse.json({ message: "Purchase saved", purchase: savedPurchase }, { status: 201 });

  } catch (error: any) {
    console.error("Error in /api/purchases/create:", error);
    return NextResponse.json({ error: error.message || "Failed to save purchase" }, { status: 500 });
  }
}
