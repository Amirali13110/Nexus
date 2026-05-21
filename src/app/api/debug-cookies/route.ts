import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  console.log("DEBUG: All cookies received:", allCookies);
  return NextResponse.json({ cookies: allCookies });
}
