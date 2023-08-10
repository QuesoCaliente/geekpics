import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "700"] });

export const metadata: Metadata = {
  title: "Geek.pics",
  description: "donde las imágenes cobran vida",
};

export default function AuthTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
