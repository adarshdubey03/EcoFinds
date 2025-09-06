import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import User from "@/models/User";

connectDB();

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const user = await User.create({ email, password, name });
  return NextResponse.json({ message: "User created successfully", user: { email: user.email, name: user.name, _id: user._id } });
}
