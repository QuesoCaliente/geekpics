"use client";
import React from "react";
import Button from "../button";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LogoutButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="px-3">
        <Button className="w-full">Cargando...</Button>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="px-3">
        <Button onClick={() => signIn()} className="w-full">
          Ingresar
        </Button>
      </div>
    );
  }

  return (
    <div className="px-3">
      <Button onClick={() => signOut()} className="w-full">
        Logout
      </Button>
    </div>
  );
}
