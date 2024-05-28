"use client";

import { useOpenElement } from "@/contexts/OpenElement";
import { NavItems } from "@/types/app";
import {
  IconBrandDiscord,
  IconChevronDown,
  IconCircle,
  IconCrane,
  IconDeviceGamepad,
  IconHeartHandshake,
  IconHome,
  IconInfoSquare,
  IconMailCheck,
  IconMap,
  IconMenu,
  IconMenu2,
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

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Button } from "../ui/button";
import Image from "next/image";

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
      href: "/marketplace",
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
    <div>
      <div className="hidden xl:block">
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
      </div>
      <div className="block xl:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="my-1">
              <IconMenu2 className="me-2" /> Menu
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex gap-3 items-center">
              <Image
                src="/logomark.svg"
                height={48}
                width={48}
                alt="Thrills World Logomark"
              />
              <h1 className="font-cagr text-4xl font-extrabold uppercase mt-1">
                Thrills
              </h1>
            </div>
            <div className="mt-6">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.name}>
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className={`flex items-center justify-start w-full gap-2`}
                        >
                          {item.icon}
                          {item.name}
                          <IconChevronDown size={16} />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        {item.children!.map((child) => (
                          <Link href={child.href} key={child.name} passHref>
                            <Button
                              variant="ghost"
                              className={`flex items-center justify-start w-full gap-2 ${
                                pathName === child.href &&
                                `bg-primary text-white `
                              }`}
                            >
                              <IconCircle
                                size={12}
                                className="text-muted-foreground mx-1"
                              />
                              {child.icon}
                              {child.name}
                            </Button>
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    key={item.name}
                    passHref
                    className="mt-2"
                  >
                    <Button
                      variant="ghost"
                      className={`flex items-center justify-start w-full gap-2 ${
                        pathName === item.href && `bg-primary text-white `
                      }`}
                    >
                      {item.icon}
                      {item.name}
                    </Button>
                  </Link>
                )
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
