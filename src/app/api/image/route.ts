import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
  return new Response(
    JSON.stringify({
      message: "Hello World",
    }),
    { status: 200 }
  );
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const body = await request.json();

  const createdImage = await prisma.image.create({
    data: {
      name: body.name,
      url: body.url,
      categoryId: body.type,
      userId: user?.id!,
    },
  });

  return NextResponse.json(createdImage, { status: 201 });
}
