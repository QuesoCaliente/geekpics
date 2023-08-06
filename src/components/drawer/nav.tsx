"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Role, drawerItems } from "@/utils/drawerItems";
import clsx from "clsx";
import { useSession } from "next-auth/react";

export default function Nav({ handleOpen }: { handleOpen: () => void }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <nav className="w-full">
      <ul className="flex flex-col gap-2 p-4">
        {drawerItems?.map(
          ({ name, icon, href, permissions }, index) =>
            Object.values(permissions).includes(
              (session?.user?.role?.id as Role) || Role.GLOBAL
            ) && (
              <li
                key={index}
                className={clsx(
                  "pl-2 pr-2 pt-4 pb-4 flex items-center text-lg hover:bg-[rgba(255,255,255,0.2)] transition-all duration-300 ease-in-out",
                  pathname === href && "bg-[rgba(255,255,255,0.5)]"
                )}
              >
                <Link
                  onClick={() => handleOpen()}
                  className="flex items-center w-full"
                  href={href}
                >
                  <span className="inline-block mr-2">{icon}</span>
                  {name}
                </Link>
              </li>
            )
        )}
      </ul>
    </nav>
  );
}
