import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  await prisma.user.deleteMany();
  await prisma.image.deleteMany();
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
    data: [{ name: "Administrator" }, { name: "Moderator" }, { name: "User" }],
  });

  const adminRole = await prisma.role.findFirst({
    where: {
      name: "Administrator",
    },
  });

  await prisma.user.createMany({
    data: [
      {
        email: "brianc.contacto@gmail.com",
        name: "Brian",
        photo: "https://avatars.githubusercontent.com/u/29721601?v=4",
        roleId: adminRole?.id!,
        password: "123456",
      },
    ],
  });

  const sfwCategory = await prisma.category.findFirst({
    where: {
      name: "SFW",
    },
  });

  await prisma.image.createMany({
    data: [
      {
        name: "pink girl",
        url: "images/Konachan.com - 360261 bikini_top bottomless bow braids breasts cleavage clouds green_eyes halo kuroduki long_hair pink_hair see_through shirt sky tree underboob water.jpg",
        categoryId: sfwCategory?.id!,
      },
    ],
  });

  return NextResponse.json({
    message: "Seed Executed",
  });
}
