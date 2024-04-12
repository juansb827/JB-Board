import { FirebaseOptions, getApps, initializeApp } from "firebase/app";
import { getAuth, inMemoryPersistence, setPersistence } from "firebase/auth";
import { clientConfig } from "../../../config/client-config";
export const firebaseConfig: FirebaseOptions = {
  ...clientConfig.firebase,
};
export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(firebaseApp);
setPersistence(auth, inMemoryPersistence);

export async function getAppRouterSession() {
  // dynamically import to prevent import errors in pages router
  const { cookies } = await import("next/headers");

  try {
    return cookies().get("__session");
  } catch (error) {
    console.log("error", error);
    // cookies() throws when called from pages router
    return undefined;
  }
}
