// app/actions/testAction.ts
"use server";
import { cookies } from "next/headers";

export async function setTestCookie() {
  const cookieStore = await cookies();
  cookieStore.set("test_cookie", "hello", {
    httpOnly: true,
    maxAge: 60,
    path: "/",
  });
  return { success: true };
}