// https://github.com/firebase/friendlyeats-web/blob/master/nextjs-end/src/lib/firebase/firebase.js

import { FirebaseOptions, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig: FirebaseOptions = {
  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  apiKey: "AIzaSyA9B5oqmgbPBenxqd8QnPWyzR6qomrXRT0",
  authDomain: "jb-board-249df.firebaseapp.com",
  projectId: "jb-board-249df",
  storageBucket: "jb-board-249df.appspot.com",
  messagingSenderId: "994052719564",
  appId: "1:994052719564:web:1fce05c5443564fdfa1369",
  measurementId: "G-V38KL0B3DD",
};
export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(firebaseApp);

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
