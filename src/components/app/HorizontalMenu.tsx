"use client";

import { useOpenElement } from "@/contexts/OpenElement";
import { NavItems } from "@/types/app";
import {
  IconBrandDiscord,
  IconChevronDown,
  IconCrane,
  IconDeviceGamepad,
  IconHeartHandshake,
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
import Link from "next/link";

export default function HorizontalMenu() {
  const { openElement, setOpenElement } = useOpenElement();

  const pathName = usePathname();
  const navItems: NavItems = [
    {
      name: "Accueil",
      href: "/",
      code: "home",
      icon: <IconHome size={20} />,
    },
    { name: "Actualités", href: "/news", icon: <IconNews size={20} /> },
    {
      name: "Classements",
      href: "/rankings",
      code: "rankings",
      icon: <IconTrophy size={20} />,
    },
    { name: "Carte", href: "/world-map", icon: <IconMap size={20} /> },
    { name: "Voyages", href: "/trips", icon: <IconPlane size={20} /> },
    { name: "VDM", href: "/stories", icon: <IconPoo size={20} /> },
    {
      name: "Gaming",
      href: "",
      code: "gaming",
      icon: <IconDeviceGamepad size={20} />,
      children: [
        {
          name: "Créations",
          href: "/gaming/creations",
          icon: <IconCrane size={20} />,
        },
        {
          name: "Concours",
          href: "/gaming/contests",
          icon: <IconTrophy size={20} />,
        },
      ],
    },
    {
      name: "Produits",
      href: "/shop",
      code: "products",
      icon: <IconShoppingCart size={20} />,
    },
    { name: "Quizz", href: "/quizz", icon: <IconPuzzle size={20} /> },
    {
      name: "Thrills",
      href: "",
      code: "thrills",
      icon: <IconRollercoaster size={20} />,
      children: [
        {
          name: "A propos",
          href: "/thrills/about",
          icon: <IconInfoSquare size={20} />,
        },
        {
          name: "Collaborateurs",
          href: "/thrills/staff",
          icon: <IconUsersGroup size={20} />,
        },
        {
          name: "Faire un don",
          href: "/thrills/donate",
          icon: <IconHeartHandshake size={20} />,
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
          ? "py-1.5 px-4 bg-gradient-to-r from-red-600 to-rose-400 text-white flex items-center gap-2 rounded-lg cursor-pointer"
          : "py-1.5 px-4 text-slate-800 flex items-center gap-2 rounded-lg hover:bg-slate-200/50 cursor-pointer";

        return (
          <div
            className="relative"
            key={item.name}
            onMouseLeave={() => setOpenElement("")}
          >
            {item.children ? (
              <span
                className={className}
                onMouseEnter={() =>
                  setOpenElement(`horizontalNav-${item.code}`)
                }
              >
                {item.icon} {item.name} <IconChevronDown size={18} />
              </span>
            ) : (
              <Link href={item.href} className={className}>
                {item.icon} {item.name}
              </Link>
            )}
            {item.children && (
              <div
                className={`absolute left-0 ${
                  openElement != `horizontalNav-${item.code}` &&
                  "pointer-events-none"
                }`}
              >
                <div className="h-2"></div>
                <div
                  className={`opacity-0 left-0 w-48 z-20 rounded-lg shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 transition-opacity duration-300 pointer-events-none ${
                    openElement === `horizontalNav-${item.code}` &&
                    "opacity-95 pointer-events-auto"
                  }`}
                >
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
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
