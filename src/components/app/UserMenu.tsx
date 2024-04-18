"use client";

import { useOpenElement } from "@/contexts/OpenElement";
import { NavItems } from "@/types/app";
import {
  IconLogout,
  IconManualGearbox,
  IconSettings,
  IconShoppingCart,
  IconUser,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function UserMenu() {
  const { openElement, setOpenElement } = useOpenElement();

  const handleOpenClose = () => {
    if (openElement === "userMenu") {
      setOpenElement(null);
    } else {
      setOpenElement("userMenu");
    }
  };

  const userNavItems: NavItems = [
    {
      name: "Votre profil",
      href: "/",
      icon: <IconUser size={20} />,
    },
    { name: "Paramètres", href: "/", icon: <IconSettings size={20} /> },
    { name: "Vos commandes", href: "/", icon: <IconShoppingCart size={20} /> },
    { name: "hr", href: "", icon: <></> },
    {
      name: "Panneau de gestion",
      href: "/manage",
      icon: <IconManualGearbox size={20} />,
    },
    { name: "hr", href: "", icon: <></> },
    { name: "Déconnexion", href: "/", icon: <IconLogout size={20} /> },
  ];

  return (
    <div className="relative">
      <Image
        src="/dev/pdp.jpeg"
        height={40}
        width={40}
        alt="Avatar"
        className="rounded-full shadow-md cursor-pointer"
        onClick={() => handleOpenClose()}
      />
      <div
        className={`absolute right-0 top-12 w-56 pb-2 z-20 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col transition-all duration-300 transform ${
          openElement === "userMenu"
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex gap-3 px-4 py-2 items-center">
          <Image
            src="/dev/pdp.jpeg"
            height={48}
            width={48}
            alt="Avatar"
            className="rounded-full"
          />
          <div className="flex flex-col">
            <p className="text-slate-800 font-medium">Gaspard Delvaux</p>
            <span className="text-slate-800 text-sm">Administateur</span>
          </div>
        </div>
        <hr className="mb-1" />
        {userNavItems.map((item, index) =>
          item.name === "hr" ? (
            <hr key={index} className="my-1" />
          ) : (
            <Link
              key={index}
              href={item.href}
              className="mx-2 mt-0.5 px-3 py-2 rounded-lg text-slate-800 flex items-center gap-2 hover:bg-slate-200/50"
            >
              {item.icon}
              {item.name}
            </Link>
          )
        )}
      </div>
    </div>
  );
}
