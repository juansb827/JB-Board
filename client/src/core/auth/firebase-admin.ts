import "server-only";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";

export const adminApp =
  getApps().find((it) => it.name === "board-dev") ||
  initializeApp(
    {
      credential: cert(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT!),
    },
    "board-dev"
  );
export const adminAuth = getAuth(adminApp);

export async function isUserAuthenticated(
  session: string | undefined = undefined
) {
  const _session = session ?? (await getSession());
  if (!_session) return false;

  try {
    const isRevoked = !(await adminAuth.verifySessionCookie(_session, true));
    return !isRevoked;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getSession() {
  try {
    return cookies().get("__session")?.value;
  } catch (error) {
    return undefined;
  }
}
