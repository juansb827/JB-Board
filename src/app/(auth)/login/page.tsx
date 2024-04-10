"use client";
import { signInWithGoogle } from "@/core/auth/auth";
import { useUserSession } from "@/core/auth/hooks";
import { useRouter } from "next/navigation";
import React from "react";

function Auth() {
  const router = useRouter();
  const user = useUserSession(undefined);

  const handleLogInWithGoogle = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await signInWithGoogle();
    router.push("/");
    console.log("Login Page Ok");
  };

  return (
    <>
      <div>USer: {JSON.stringify(user)}</div>
      <a href="#" onClick={handleLogInWithGoogle}>
        Log in with Google
      </a>
      ;<div>Auth</div>
    </>
  );
}

export default Auth;
