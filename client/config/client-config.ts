/* eslint-disable no-process-env */
import type { FirebaseOptions } from "firebase/app";
const firebase: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  // Optional – required if your app uses AppCheck – https://firebase.google.com/docs/app-check
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
export const clientConfig = {
  firebase,
  graphql: {
    subscriptionsEndpoint:
      process.env.NEXT_PUBLIC_GRAPHQL_SUBSCRIPTIONS_ENDPOINT!,
  },
};
