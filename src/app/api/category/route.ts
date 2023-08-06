import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  const categorys = await prisma.category.findMany();

  if (!categorys) {
    return NextResponse.json({
      message: "No categorys found.",
    });
  }

  return NextResponse.json(categorys);
}
