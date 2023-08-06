import dotenv from "dotenv";
import crypto from "crypto";
import { promisify } from "util";
const randomBytes = promisify(crypto.randomBytes);
import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

const region = "us-east-1";
const bucketName = "gallry";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId: accessKeyId!,
    secretAccessKey: secretAccessKey!,
  },
  apiVersion: "v4",
});

export async function uploadToS3({
  file,
  userId,
}: {
  file: File;
  userId: string;
}) {
  const key = `${userId}/${uuid()}`;
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: file,
    ContentType: file.type,
  });
  try {
    await s3.send(command);
    return { key };
  } catch (error) {
    return { error };
  }
}

async function getImagesByUser(userId: string) {
  const command = new ListObjectsV2Command({
    Bucket: bucketName,
    Prefix: userId,
  });
  const { Contents = [] } = await s3.send(command);
  return Contents.map(({ Key }) => Key);
}

export const getUserPresignedUrls = async (userId: string) => {
  try {
    const imageKeys = (await getImagesByUser(userId)) ?? [];

    const preSignedUrls = await Promise.all(
      imageKeys.map((key) => {
        const command = new GetObjectCommand({
          Bucket: bucketName,
          Key: key,
        });
        return getSignedUrl(s3, command, { expiresIn: 3600 });
      })
    );
    return { preSignedUrls };
  } catch (error) {
    return { error };
  }
};

export const getImages = async (imageKeys: string[]) => {
  try {
    const preSignedUrls = await Promise.all(
      imageKeys.map((key) => {
        const command = new GetObjectCommand({
          Bucket: bucketName,
          Key: key,
        });
        return getSignedUrl(s3, command, { expiresIn: 3600 });
      })
    );
    return { urls: preSignedUrls };
  } catch (error) {
    return { error };
  }
};
