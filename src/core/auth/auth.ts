import { FirebaseOptions, getApps, initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import { auth, firebaseApp } from "./firebase";

export function onAuthStateChanged(cb) {
  return _onAuthStateChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const userCreds = await signInWithPopup(auth, provider);
    const idToken = await userCreds.user.getIdToken();

    // TODO: csrf token
    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });
    const resBody = await response.json();
    if (response.ok && resBody.success) {
      return true;
    } else return false;
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}

//https://github.com/firebase/friendlyeats-web/blob/master/nextjs-end/src/lib/firebase/firebase.js/
// export async function getAuthenticatedAppForUser(session = null) {

//     if (typeof window !== "undefined") {
//       // client
//       console.log("client: ", firebaseApp);

//       return { app: firebaseApp, user: auth.currentUser.toJSON() };
//     }

//     const { initializeApp: initializeAdminApp, getApps: getAdminApps } = await import("firebase-admin/app");

//     const { getAuth: getAdminAuth } = await import("firebase-admin/auth");

//     const { credential } = await import("firebase-admin");

//     const ADMIN_APP_NAME = "firebase-frameworks";
//     const adminApp =
//       getAdminApps().find((it) => it.name === ADMIN_APP_NAME) ||
//       initializeAdminApp({
//         credential: credential.applicationDefault(),
//     }, ADMIN_APP_NAME);

//     const adminAuth = getAdminAuth(adminApp);
//     const noSessionReturn = { app: null, currentUser: null };

//     if (!session) {
//       // if no session cookie was passed, try to get from next/headers for app router
//       session = await getAppRouterSession();

//       if (!session) return noSessionReturn;
//     }

//     const decodedIdToken = await adminAuth.verifySessionCookie(session);

//     const app = initializeAuthenticatedApp(decodedIdToken.uid)
//       const auth = getAuth(app)

//     // handle revoked tokens
//     const isRevoked = !(await adminAuth
//       .verifySessionCookie(session, true)
//       .catch((e) => console.error(e.message)));
//     if (isRevoked) return noSessionReturn;

//     // authenticate with custom token
//     if (auth.currentUser?.uid !== decodedIdToken.uid) {
//       // TODO(jamesdaniels) get custom claims
//       const customToken = await adminAuth
//         .createCustomToken(decodedIdToken.uid)
//         .catch((e) => console.error(e.message));

//       if (!customToken) return noSessionReturn;

//       await signInWithCustomToken(auth, customToken);
//     }
//     console.log("server: ", app);
//     return { app, currentUser: auth.currentUser };
//   }
