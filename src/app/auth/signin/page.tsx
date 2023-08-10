import { Metadata } from "next";
import { SignInForm } from "./form";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Iniciar sesión - Geek.pics",
  description: "donde las imágenes cobran vida",
};

export default function SignIn() {
  return (
    <>
      <div className="py-6">
        <div className="mx-auto flex max-w-sm overflow-hidden rounded-lg  bg-white shadow-lg lg:max-w-4xl">
          <div
            className="hidden bg-cover lg:block lg:w-1/2"
            style={{
              backgroundImage: `url('https://i.imgur.com/o7Z95H0.png')`,
              backgroundPosition: "left",
              backgroundSize: "cover",
            }}
          />
          <div className="w-full p-8 lg:w-1/2">
            <div className="flex justify-center">
              <Image
                src="/images/logov1.png"
                alt="Geek.pics"
                width={100}
                height={100}
              />
            </div>
            <p className="text-center text-xl text-gray-600">Bienvenido!</p>
            <div className="flex items-center my-3">
              <div className="border-t border-gray-300 flex-grow mr-3" />
              <div className="text-gray-500">O</div>
              <div className="border-t border-gray-300 flex-grow ml-3" />
            </div>
            <SignInForm />
          </div>
        </div>
      </div>
    </>
  );
}
