import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/utils/db";
import User from "@/models/User";

export async function GET(req: Request) {
  await connectDB(); // connect to MongoDB

  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return new NextResponse("Unauthorized", { status: 401 });

    const token = authHeader.split(" ")[1];
    if (!token) return new NextResponse("Unauthorized", { status: 401 });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id).select("-password"); // exclude password

    if (!user) return new NextResponse("User not found", { status: 404 });

    return NextResponse.json({
      id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone || null,
      image: user.image || null,
    });
  } catch (err) {
    console.error(err);
    return new NextResponse("Invalid token", { status: 401 });
  }
}
