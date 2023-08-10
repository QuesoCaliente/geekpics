import Drawer from "@/components/drawer";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "@/components/header";
import AuthProvider from "@/core/auth/authProvider";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "700"] });

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
