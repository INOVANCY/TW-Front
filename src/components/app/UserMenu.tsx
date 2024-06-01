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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Button, buttonVariants } from "../ui/button";
import { useAuth } from "@/providers/AuthProvider";

export default function UserMenu() {
  const { user } = useAuth();

  const userNavItems: NavItems = [
    {
      name: "Votre profil",
      href: "/user/gaspard.dlx",
      icon: <IconUser size={20} />,
    },
    { name: "Paramètres", href: "/settings", icon: <IconSettings size={20} /> },
    {
      name: "Vos commandes",
      href: "/orders",
      icon: <IconShoppingCart size={20} />,
    },
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
    <Popover>
      <PopoverTrigger asChild>
        {user ? (
          <Avatar className="cursor-pointer">
            <AvatarImage src="/dev/pdp.jpeg" alt="Avatar" />
            <AvatarFallback>GD</AvatarFallback>
          </Avatar>
        ) : (
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-red-600 to-rose-300 flex items-center justify-center text-white cursor-pointer">
            <IconUser size={20} />
          </div>
        )}
      </PopoverTrigger>
      <PopoverContent sideOffset={10} align="center" className="w-56">
        {user ? (
          <div>
            <div className="flex gap-3 items-center">
              <Avatar className="cursor-pointer">
                <AvatarImage src="/dev/pdp.jpeg" alt="Avatar" />
                <AvatarFallback>GD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="font-medium">Gaspard Delvaux</p>
                <span className="text-sm">Administateur</span>
              </div>
            </div>
            <Separator className="mt-4 mb-1" />
            {userNavItems.map((item, index) =>
              item.name === "hr" ? (
                <Separator key={index} className="my-1" />
              ) : (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full !justify-start"
                  asChild
                >
                  <Link
                    key={index}
                    href={item.href}
                    className="flex gap-2 items-center"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </Button>
              )
            )}
          </div>
        ) : (
          <div className="text-center flex flex-col space-y-2">
            <p className="font-medium my-4">
              Connecte-toi pour accéder à ton compte et à toutes les
              fonctionnalités de Thrills World!
            </p>
            <Button size="sm" variant="secondary" asChild>
              <Link href="/auth/login">Se connecter</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/auth/login">S'enregistrer</Link>
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
