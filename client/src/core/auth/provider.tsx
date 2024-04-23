"use client";
import React from "react";
import { useUserSession } from "./hooks";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../query";

function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return children;
  const user = useUserSession(undefined);
  return user ? <>{children}</> : <div>No user</div>;
}

export default AuthProvider;
