import prisma from "@/lib/prisma";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const s3 = new S3Client({
    apiVersion: "2006-03-01",
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const post = await createPresignedPost(s3, {
    Bucket: "gallry",
    Key:
      "images/" +
      url.searchParams.get("category") +
      "/" +
      url.searchParams.get("file"),
    Fields: {
      "Content-Type": url.searchParams.get("fileType")!,
    },
    Expires: 60, // seconds
    Conditions: [
      ["content-length-range", 0, 4048576], // up to 1 MB
    ],
  });

  return new Response(JSON.stringify(post), { status: 200 });
}
