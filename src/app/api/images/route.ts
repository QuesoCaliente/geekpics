import prisma from "@/lib/prisma";
import { getImages, getUserPresignedUrls } from "@/utils/uploadImage";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  console.log("GET IMAGES");
  let images: ({
    category: {
      id: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
      enabled: boolean;
    };
  } & {
    id: string;
    name: string;
    url: string;
    albumId: string | null;
    userId: string;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
  })[] = [];
  try {
    images = await prisma.image.findMany({
      include: {
        category: true,
      },
    });
  } catch (error) {
    console.log("ERROR ESPECIAL", error);
  }
  console.log("AQUI XD", images);
  if (!images || images?.length === 0) {
    console.log("RESPUESTA 1");
    return NextResponse.json([]);
  }

  const { error, urls } = await getImages(images?.map(({ url }) => url));
  if (error) {
    return NextResponse.json([]);
  }
  images?.forEach((image, idx) => {
    image.url = urls![idx];
  });
  console.log("RESPUESTA 2, ", images);
  return NextResponse.json(images ?? []);
}
