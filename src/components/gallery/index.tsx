import { Post } from "@/app/images/page";
import Image from "next/image";
import React from "react";

interface GalleryProps {
  images: Post[];
}

export const Gallery = ({ images }: GalleryProps) => {
  return (
    <div className="columns-5 columns-lg">
      {images?.map((image, index) => (
        <Image
          key={index}
          width={0}
          height={0}
          style={{ width: "100%", height: "auto" }}
          sizes="100vw"
          alt={image.name}
          src={image.url}
        />
      ))}
    </div>
  );
};
