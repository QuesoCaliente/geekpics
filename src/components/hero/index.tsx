import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <section className="flex flex-col items-center md:flex-row justify-center gap-5 p-5 h-auto">
      <div className="md:w-1/2 flex flex-col gap-10 justify-center items-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-white">
          Descubre, Comparte, Inspira:{" "}
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Geek.pics
          </span>
          , donde las imágenes cobran vida.
        </h2>
        <p className="text-white text-xl md:text-3xl">
          Comparte imágenes impresionantes en una experiencia moderna. Descubre
          talentosos artistas y únete a una apasionada comunidad. ¡Inspírate en
          este emocionante viaje visual en línea!
        </p>
      </div>
      <div className="md:w-1/3 w-full overflow-hidden relative h-[80vh]">
        <Image fill src="/images/hero.jpg" alt="hero" />
      </div>
    </section>
  );
}
