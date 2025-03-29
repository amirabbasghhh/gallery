// /app/api/logout/route.ts

import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
  response.cookies.set("token", "", { expires: new Date(0), httpOnly: true, secure: true, path: '/' });

  return response;
}
