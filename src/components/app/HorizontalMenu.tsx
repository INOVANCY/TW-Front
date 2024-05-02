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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

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

  function onNavChange() {
    setTimeout(() => {
      const triggers = document.querySelectorAll(
        '.submenu-trigger[data-state="open"]'
      );
      if (triggers.length === 0) return;

      const firstTrigger = triggers[0] as HTMLElement;

      document.documentElement.style.setProperty(
        "--menu-left-position",
        `${firstTrigger.offsetLeft}px`
      );
    });
  }

  return (
    <NavigationMenu className="my-1" onValueChange={onNavChange}>
      <NavigationMenuList>
        {navItems.map((item) =>
          item.children ? (
            <NavigationMenuItem key={item.name}>
              <NavigationMenuTrigger className="submenu-trigger">
                <span className="me-2">{item.icon}</span> {item.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-2">
                {item.children!.map((child) => (
                  <NavigationMenuLink
                    key={child.name}
                    href={child.href}
                    className={navigationMenuTriggerStyle()}
                    active={pathName === child.href}
                  >
                    <span className="me-2">{child.icon}</span> {child.name}
                  </NavigationMenuLink>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.name}>
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={pathName === item.href}
                >
                  <span className="me-2">{item.icon}</span> {item.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
