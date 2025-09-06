// app/api/purchases/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Purchase } from "@/models/Purchase";
import { connectDB } from "@/utils/db";

export async function GET(req: Request) {
  await connectDB();

  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return new NextResponse("Unauthorized", { status: 401 });

    const token = authHeader.split(" ")[1];
    if (!token) return new NextResponse("Unauthorized", { status: 401 });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded.id;

    console.log("Fetching purchases for user:", userId);

    const purchases = await Purchase.find({ user: userId }).sort({ purchasedAt: -1 });

    const response = purchases.map((p) => ({
      _id: p._id.toString(),
      products: p.products.map((prod: any) => ({
        productId: prod.productId,
        title: prod.title,
        price: prod.price,
        quantity: prod.quantity,
      })),
      totalAmount: p.total,
      purchasedAt: p.purchasedAt,
      status: p.status,
    }));

    return NextResponse.json({ purchases: response }, { status: 200 });
  } catch (err: any) {
    console.error("Error fetching purchases:", err);
    return new NextResponse("Invalid token or server error", { status: 401 });
  }
}
