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
  images?: Post[];
  error?: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  enabled: boolean;
}

const getImages = async () => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/images`, {
      cache: "no-cache",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error };
  }
};

export default async function ImagesPage() {
  const posts: Response = await getImages();

  if (posts?.error) {
    return <div>{posts.error}</div>;
  }

  const images = posts?.images ?? [];
  return (
    <div>
      <Gallery images={images} />
    </div>
  );
}
