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

export interface Category {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  enabled: boolean;
}

const getImages: () => Promise<Post[]> = async () => {
  const response = await fetch(`${process.env.API_URL}/api/images`, {
    cache: "no-cache",
  });

  const data: Post[] = await response.json();
  return data ?? [];
};

export default async function ImagesPage() {
  // const posts = await getImages();

  return (
    <div>
      <Gallery images={[]} />
    </div>
  );
}
