"use client";

import React, { useState } from "react";
import Drawer from "../drawer";
import { drawerItems } from "@/utils/drawerItems";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="flex bg-primary min-h-[60px] w-full justify-center items-center">
        <button onClick={() => handleIsOpen()} className="absolute left-0 ml-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 className="text-2xl text-white">Geek.pics</h1>
      </div>
      <Drawer
        isOpen={isOpen}
        drawerItems={drawerItems}
        handleOpen={handleIsOpen}
        drawerTitle="Geek"
      />
    </>
  );
}
