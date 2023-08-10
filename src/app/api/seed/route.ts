import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  // await prisma.anime.deleteMany();
  // await prisma.category.deleteMany();
  // await prisma.role.deleteMany();
  // await prisma.anime.createMany({
  //   data: [
  //     { name: "Naruto" },
  //     { name: "Bleach" },
  //     { name: "One Piece" },
  //     { name: "Dragon Ball" },
  //     { name: "Death Note" },
  //     { name: "Fullmetal Alchemist: Brotherhood" },
  //     { name: "Hunter x Hunter (2011)" },
  //     { name: "Attack on Titan" },
  //     { name: "Cowboy Bebop" },
  //     { name: "My Hero Academia" },
  //     { name: "Code Geass: Lelouch of the Rebellion" },
  //   ],
  // });

  // await prisma.category.createMany({
  //   data: [
  //     { id: "46021183-8e35-42d0-ac28-26cee27ef34f", name: "SFW" },
  //     { id: "4b5fd1b4-72cb-412f-8e86-5b4c14940046", name: "NSFW" },
  //     { id: "a8fc6f21-625c-4034-a7e3-b438aa977218", name: "Ecchi" },
  //   ],
  // });

  // await prisma.role.createMany({
  //   data: [
  //     { id: "cdf104fd-1a2b-4178-bce5-df92ed430170", name: "Administrator" },
  //     { id: "eadb63f0-8e1c-493d-a178-b040e6ff96c6", name: "Moderator" },
  //     { id: "c348dc6e-24ca-4e08-8633-b8072efb95b6", name: "User" },
  //   ],
  // });

  return NextResponse.json({
    message: "Seed Executed",
  });
}
