"use client";

import {
  IconDeviceGamepad,
  IconHome,
  IconMap,
  IconNews,
  IconPlane,
  IconPoo,
  IconPuzzle,
  IconRollercoaster,
  IconShoppingCart,
  IconTrophy,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export default function HorizontalMenu() {
  const pathName = usePathname();
  const navItems = [
    {
      name: "Accueil",
      href: "/",
      icon: <IconHome size={20} />,
    },
    { name: "Actualités", href: "/actualites", icon: <IconNews size={20} /> },
    {
      name: "Classements",
      href: "/classements",
      icon: <IconTrophy size={20} />,
    },
    { name: "Carte", href: "/carte", icon: <IconMap size={20} /> },
    { name: "Voyages", href: "/voyages", icon: <IconPlane size={20} /> },
    { name: "VDM", href: "/vdm", icon: <IconPoo size={20} /> },
    { name: "Gaming", href: "/gaming", icon: <IconDeviceGamepad size={20} /> },
    {
      name: "Produits",
      href: "/produits",
      icon: <IconShoppingCart size={20} />,
    },
    { name: "Quizz", href: "/quizz", icon: <IconPuzzle size={20} /> },
    {
      name: "Thrills",
      href: "/thrills",
      icon: <IconRollercoaster size={20} />,
      children: [
        { name: "A propos", href: "/thrills/a-propos" },
        { name: "Collaborateurs", href: "/thrills/collaborateurs" },
        { name: "Faire un don", href: "/thrills/faire-un-don" },
        { name: "Discord", href: "/thrills/discord" },
        { name: "Contact", href: "/thrills/contact" },
      ],
    },
  ];

  return (
    <div className="flex gap-3 p-2 ps-0">
      {navItems.map((item) => {
        const isActive = pathName === item.href;
        const className = isActive
          ? "py-1.5 px-4 bg-gradient-to-r from-red-600 to-rose-400 text-white flex items-center gap-2 rounded-lg"
          : "py-1.5 px-4 text-slate-800 flex items-center gap-2 rounded-lg hover:bg-slate-200/50";

        return (
          <div className="relative" key={item.name}>
            <div className="group inline-block">
              <a href={item.href} className={className}>
                {item.icon} {item.name}
              </a>
              {item.children && (
                <div className="hidden group-hover:block absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  {item.children.map((child) => (
                    <a
                      key={child.name}
                      href={child.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {child.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
