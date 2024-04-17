"use client";

import { NavItems } from "@/app/types/app";
import {
  IconBrandDiscord,
  IconChevronDown,
  IconCrane,
  IconDeviceGamepad,
  IconHome,
  IconInfoSquare,
  IconMailCheck,
  IconMap,
  IconMoneybag,
  IconNews,
  IconPlane,
  IconPoo,
  IconPuzzle,
  IconRollercoaster,
  IconShoppingCart,
  IconTrophy,
  IconUsersGroup,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export default function HorizontalMenu() {
  const pathName = usePathname();
  const navItems: NavItems = [
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
    {
      name: "Gaming",
      href: "/gaming",
      icon: <IconDeviceGamepad size={20} />,
      children: [
        {
          name: "Créations",
          href: "/gaming/creations",
          icon: <IconCrane size={20} />,
        },
        {
          name: "Concours",
          href: "/gaming/concours",
          icon: <IconTrophy size={20} />,
        },
      ],
    },
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
        {
          name: "A propos",
          href: "/thrills/a-propos",
          icon: <IconInfoSquare size={20} />,
        },
        {
          name: "Collaborateurs",
          href: "/thrills/collaborateurs",
          icon: <IconUsersGroup size={20} />,
        },
        {
          name: "Faire un don",
          href: "/thrills/faire-un-don",
          icon: <IconMoneybag size={20} />,
        },
        {
          name: "Discord",
          href: "/thrills/discord",
          icon: <IconBrandDiscord size={20} />,
        },
        {
          name: "Contact",
          href: "/thrills/contact",
          icon: <IconMailCheck size={20} />,
        },
      ],
    },
  ];

  return (
    <div className="flex p-2 gap-2 ps-0">
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
                {item.children && <IconChevronDown size={18} />}
              </a>
              {item.children && (
                <div className="opacity-0 group-hover:opacity-100 absolute left-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-opacity duration-300">
                  {item.children.map((child) => (
                    <a
                      key={child.name}
                      href={child.href}
                      className="flex items-center gap-2 mx-2 my-1 px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-200/50"
                    >
                      {child.icon} {child.name}
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
