import prisma from "@/lib/prisma";
import { getImages, getUserPresignedUrls } from "@/utils/uploadImage";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  const images = await prisma.image.findMany({
    include: {
      category: true,
    },
  });

  if (!images) {
    return new Response(
      JSON.stringify({
        error: "No se encontraron imagenes",
      }),
      { status: 404 }
    );
  }

  const { error, urls } = await getImages(images?.map(({ url }) => url));
  if (error) {
    return new Response(
      JSON.stringify({
        error,
      }),
      { status: 500 }
    );
  }
  images.forEach((image, idx) => {
    image.url = urls![idx];
  });

  return new Response(
    JSON.stringify({
      images,
    }),
    { status: 200 }
  );
}
