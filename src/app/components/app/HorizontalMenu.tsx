'use client';

import { IconDeviceGamepad, IconHome, IconMap, IconNews, IconPlane, IconPoo, IconPuzzle, IconRollercoaster, IconShoppingCart, IconTrophy } from "@tabler/icons-react";
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
    { name: "Classements", href: "/classements", icon: <IconTrophy size={20} /> },
    { name: "Carte", href: "/carte", icon: <IconMap size={20} /> },
    { name: "Voyages", href: "/voyages", icon: <IconPlane size={20} /> },
    { name: "VDM", href: "/vdm", icon: <IconPoo size={20} /> },
    { name: "Gaming", href: "/gaming", icon: <IconDeviceGamepad size={20} /> },
    { name: "Produits", href: "/produits", icon: <IconShoppingCart size={20} /> },
    { name: "Quizz", href: "/quizz", icon: <IconPuzzle size={20} /> },
    { name: "Thrills", href: "/thrills", icon: <IconRollercoaster size={20} /> },
  ];

  return (
    <div className="flex gap-3 p-2 ps-0">
      {navItems.map((item) => {
        const isActive = pathName === item.href;
        const className = isActive
          ? 'py-2 px-4 bg-gradient-to-br from-red-500 to-rose-400 text-white flex items-center gap-2 rounded-lg'
          : 'py-2 px-4 text-slate-800 flex items-center gap-2 rounded-lg';

        return (
          <a
            key={item.name}
            href={item.href}
            className={className}
          >
            {item.icon} {item.name}
          </a>
        );
      })}
    </div>
  );
}
