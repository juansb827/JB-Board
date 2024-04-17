import { NextRequest, NextResponse } from "next/server";
import {
  authMiddleware,
  redirectToHome,
  redirectToLogin,
} from "next-firebase-auth-edge";
import { authConfig, serverConfig } from "../config/server-config";

const AUTH_ROUTES = ["/login", "/auth/signup"];
const PUBLIC_PATHS = [...AUTH_ROUTES];

export async function middleware(request: NextRequest) {
  // using next-firebase-auth-edge because firebase-admin doesn't work inside next middleware
  return authMiddleware(request, {
    // default endpoints provided by next-firebase-auth-edge
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: serverConfig.firebaseApiKey,
    cookieName: authConfig.cookieName,
    cookieSignatureKeys: authConfig.cookieSignatureKeys,
    debug: serverConfig.debug,
    cookieSerializeOptions: authConfig.cookieSerializeOptions,
    serviceAccount: authConfig.serviceAccount,
    handleValidToken: async ({ token, decodedToken }, headers) => {
      // Authenticated user should not be able to access AUTH_ROUTES
      if (AUTH_ROUTES.includes(request.nextUrl.pathname)) {
        return redirectToHome(request);
      }
      return NextResponse.next({
        request: {
          headers,
        },
      });
    },
    handleInvalidToken: async (reason) => {
      console.info("Missing or malformed credentials", { reason });
      return redirectToLogin(request, {
        path: "/login",
        publicPaths: PUBLIC_PATHS,
      });
    },
    handleError: async (error) => {
      console.error("Unhandled authentication error", { error });
      return redirectToLogin(request, {
        path: "/login",
        publicPaths: PUBLIC_PATHS,
      });
    },
  });
}

export const config = {
  matcher: ["/", "/((?!_next|api|.*\\.).*)", "/api/login", "/api/logout"],
};
