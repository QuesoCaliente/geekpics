import { Gallery } from "@/components/gallery";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Images - Geek.pics",
  description: "Galleria de imagenes de geek.pics",
};

export interface Post {
  id: string;
  name: string;
  url: string;
  albumId: null;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
}

interface Response {
  images: Post[];
}

export interface Category {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  enabled: boolean;
}

const getImages = async () => {
  const response = await fetch(`${process.env.API_URL}/api/images`, {
    cache: "no-cache",
  });
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    console.log(response);
    throw new Error(`La respuesta no es un JSON válido ${response}`);
  }
  const data = await response.json();
  return data;
};

export default async function ImagesPage() {
  const posts: Response = await getImages();
  const images = posts?.images ?? [];
  return (
    <div>
      <Gallery images={images} />
    </div>
  );
}
