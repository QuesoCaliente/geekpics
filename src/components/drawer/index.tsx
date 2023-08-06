import clsx from "clsx";
import { AiOutlineClose } from "react-icons/ai";
import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ProfileCard from "../profile";
import Nav from "./nav";
import LogoutButton from "../buttonLogout";
export default function Drawer({
  isOpen,
  handleOpen,
  drawerItems,
  drawerTitle,
}: {
  isOpen: boolean;
  handleOpen: () => void;
  drawerItems?: { name: string; icon: React.ReactNode; href: string }[];
  drawerTitle?: ReactNode;
}) {
  const pathname = usePathname();
  return (
    <>
      <div
        className={clsx(
          "top-0 bottom-0 z-50 w-full sm:w-80 bg-primary text-white fixed h-full transition-all duration-500 ease-in-out",
          isOpen ? "left-0" : "-left-[200%]"
        )}
      >
        <header className="flex justify-around items-center pt-5 pb-5">
          <h1 className="text-2xl font-semibold">{drawerTitle ?? "Drawer"}</h1>
          <button onClick={handleOpen}>
            <AiOutlineClose className="text-2xl" />
          </button>
        </header>
        <ProfileCard />
        <Nav handleOpen={handleOpen} />
        <LogoutButton />
      </div>
      <div
        onClick={handleOpen}
        className={clsx(
          "bg-black fixed z-30 w-screen h-screen transition-opacity duration-500 ease-in-out",
          isOpen ? "opacity-30" : "opacity-0 pointer-events-none"
        )}
      ></div>
    </>
  );
}
