import prisma from "@/lib/prisma";
import { getImages, getUserPresignedUrls } from "@/utils/uploadImage";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(request: Request) {
  const images = await prisma.image.findMany({
    include: {
      category: true,
    },
  });
  if (!images || images?.length === 0) {
    return NextResponse.json([]);
  }

  const { error, urls } = await getImages(images?.map(({ url }) => url));
  if (error) {
    return NextResponse.json([]);
  }
  images?.forEach((image, idx) => {
    image.url = urls![idx];
  });
  return NextResponse.json(images ?? []);
}
