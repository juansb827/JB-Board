"use client";
import React from "react";
import { useUserSession } from "./hooks";

function AuthProvider({ children }: { children: React.ReactNode }) {
  return children;
  const user = useUserSession(undefined);
  return user ? <>{children}</> : <div>No user</div>;
}

export default AuthProvider;
