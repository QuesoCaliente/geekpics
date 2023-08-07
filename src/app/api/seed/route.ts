import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  await prisma.anime.deleteMany();
  await prisma.category.deleteMany();
  await prisma.role.deleteMany();
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
    data: [
      { id: "cdf104fd-1a2b-4178-bce5-df92ed430170", name: "Administrator" },
      { id: "eadb63f0-8e1c-493d-a178-b040e6ff96c6", name: "Moderator" },
      { id: "c348dc6e-24ca-4e08-8633-b8072efb95b6", name: "User" },
    ],
  });

  return NextResponse.json({
    message: "Seed Executed",
  });
}
