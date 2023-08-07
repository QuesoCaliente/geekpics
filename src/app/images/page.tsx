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

const getImages = () => {
  const response = fetch(`${process.env.API_URL}/api/images`, {
    cache: "no-store",
  }).then((res) => res.json());
  return response;
};

export default async function ImagesPage() {
  const posts: Response = await getImages();
  return (
    <div>
      <Gallery images={posts.images} />
    </div>
  );
}
