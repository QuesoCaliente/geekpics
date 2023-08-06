import Drawer from "@/components/drawer";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "@/components/header";
import { useState } from "react";
import { drawerItems } from "@/utils/drawerItems";
import AuthProvider from "@/core/auth/authProvider";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "700"] });

export const metadata: Metadata = {
  title: "Geek.pics",
  description: "donde las imágenes cobran vida",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="es">
        <body className={`${roboto.className} bg-onPrimary`}>
          <Header />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
