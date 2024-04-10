"use client";
import { signInWithGoogle } from "@/core/auth/auth";
import { useUserSession } from "@/core/auth/hooks";
import React from "react";

const handleSignIn = (event) => {
  event.preventDefault();
  signInWithGoogle();
};
function Auth() {
  const user = useUserSession(undefined);

  return (
    <>
      <div>USer: {JSON.stringify(user)}</div>
      <a href="#" onClick={handleSignIn}>
        Sign In with Google
      </a>
      ;<div>Auth</div>
    </>
  );
}

export default Auth;
