import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  await prisma.anime.createMany({
    data: [
      { name: "Naruto" },
      { name: "Bleach" },
      { name: "One Piece" },
      { name: "Dragon Ball" },
      { name: "Death Note" },
      { name: "Fullmetal Alchemist: Brotherhood" },
      { name: "Hunter x Hunter (2011)" },
      { name: "Attack on Titan" },
      { name: "Cowboy Bebop" },
      { name: "My Hero Academia" },
      { name: "Code Geass: Lelouch of the Rebellion" },
    ],
  });

  await prisma.category.createMany({
    data: [{ name: "SFW" }, { name: "NSFW" }, { name: "Ecchi" }],
  });

  await prisma.role.createMany({
    data: [{ name: "Administrator" }, { name: "Moderator" }, { name: "User" }],
  });

  return NextResponse.json({
    message: "Seed Executed",
  });
}
