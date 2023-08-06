import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BadgeAnimatedGradientBorder } from "../badgeAnimatedGradientBorder";
import { useSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getSession } from "next-auth/react";

export default function ProfileCard() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col justify-center max-w-xs p-6 rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
      <Image
        width={100}
        height={100}
        src={session?.user?.image ?? "/profile.jpg"}
        alt=""
        className="mx-auto rounded-full dark:bg-gray-500 aspect-square"
      />
      <div className="space-y-4 text-center">
        <div className="my-2 space-y-1">
          <h2 className="text-xl font-semibold sm:text-2xl">
            {session?.user?.name ?? "Invitado"}
          </h2>
          <BadgeAnimatedGradientBorder
            name={session?.user?.role?.name ?? "User"}
          />
        </div>
      </div>
    </div>
  );
}
