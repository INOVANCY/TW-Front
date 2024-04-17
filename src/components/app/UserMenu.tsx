"use client";

import { useOpenElement } from "@/contexts/OpenElement";
import { IconSettings, IconShoppingCart, IconUser } from "@tabler/icons-react";
import Image from "next/image";

export default function UserMenu() {
  const { openElement, setOpenElement } = useOpenElement();

  const handleOpenClose = () => {
    if (openElement === "userMenu") {
      setOpenElement(null);
    } else {
      setOpenElement("userMenu");
    }
  };

  const userNavItems = [
    {
      name: "Votre profil",
      href: "/",
      icon: <IconUser size={20} />,
    },
    { name: "Paramètres", href: "/", icon: <IconSettings size={20} /> },
    { name: "Vos commandes", href: "/", icon: <IconShoppingCart size={20} /> },
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
        className={`absolute right-0 top-12 w-56 pb-3 z-20 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col transition-all duration-300 transform ${
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
        <hr className="mb-2" />
        {userNavItems.map((item) => {
          return (
            <a
              key={item.name}
              href={item.href}
              className="mx-2 mt-0.5 px-3 py-2 rounded-lg text-slate-800 flex items-center gap-2 hover:bg-slate-200/50"
            >
              {item.icon} {item.name}
            </a>
          );
        })}
      </div>
    </div>
  );
}
