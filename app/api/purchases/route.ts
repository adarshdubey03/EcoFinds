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

    // Verify JWT and extract user ID
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded.id; // Make sure your JWT has { id: user._id }

    // Fetch purchases for this user
    const purchases = await Purchase.find({ user: userId }).sort({ date: -1 });

    return NextResponse.json({ purchases });
  } catch (err) {
    console.error(err);
    return new NextResponse("Invalid token", { status: 401 });
  }
}
