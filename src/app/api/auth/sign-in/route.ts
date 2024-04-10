import { auth } from "@/core/auth/firebase";
import { adminAuth } from "@/core/auth/firebase-admin";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { idToken } = (await request.json()) as {
    idToken: string;
  };

  // 5 days
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  const sessionCookie = await adminAuth.createSessionCookie(idToken, {
    expiresIn,
  });

  cookies().set("__session", sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
  });

  return Response.json({ success: true });
}
