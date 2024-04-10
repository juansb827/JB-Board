import "server-only";
import { SessionCookieOptions, getAuth } from "firebase-admin/auth";
import { cert, getApps, initializeApp } from "firebase-admin/app";

export const adminApp =
  getApps().find((it) => it.name === "board-dev") ||
  initializeApp(
    {
      credential: cert(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT!),
    },
    "board-dev"
  );
export const adminAuth = getAuth(adminApp);
