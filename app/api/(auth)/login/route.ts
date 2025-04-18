import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User doesn`t exist" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "password is incorrect" }, { status: 401 });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "10h" });

    
    const response = NextResponse.json({ message: "Login successful",user:user,token:token }, { status: 201 });
    
    
    response.cookies.set("token", token, { httpOnly: true, secure: true });
    
    return response;
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
