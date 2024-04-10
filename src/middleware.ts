import { NextRequest } from "next/server";
import { getAppRouterSession } from "./core/auth/firebase";

export async function middleware(request: NextRequest) {
  //
  const session = await getAppRouterSession();
  console.log("ASDDSA", session);
}
