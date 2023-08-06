"use client";

interface IAuthProviderProps {
  children: React.ReactNode;
}

import { SessionProvider } from "next-auth/react";
import React from "react";

export default function AuthProvider({ children }: IAuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
