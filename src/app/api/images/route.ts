import prisma from "@/lib/prisma";
import { getImages, getUserPresignedUrls } from "@/utils/uploadImage";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  const images: string[] = [];

  if (!images || images?.length === 0) {
    return NextResponse.json([]);
  }

  // const { error, urls } = await getImages(images?.map(({ url }) => url));
  // if (error) {
  //   return NextResponse.json([]);
  // }
  // images?.forEach((image, idx) => {
  //   image.url = urls![idx];
  // });
  // console.log("RESPUESTA 2, ", images);
  return NextResponse.json(images ?? []);
}
