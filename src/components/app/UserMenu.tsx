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
import { useToast } from "../ui/use-toast";
import {
  capitalizeFirstLetter,
  getInitials,
  getProfilePicture,
} from "@/lib/utils";

export default function UserMenu() {
  const { user, setUser } = useAuth();
  const { toast } = useToast();
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    toast({
      title: "Hipipip ! 🎉",
      description: "Vous êtes désormais déconnecté ! À bientôt !",
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {user ? (
          <Avatar className="cursor-pointer">
            <AvatarImage
              src={getProfilePicture(user.profilePicture)}
              alt="Avatar"
            />
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
                <AvatarImage
                  src={getProfilePicture(user.profilePicture)}
                  alt="Avatar"
                />
                <AvatarFallback>
                  {getInitials(user.lastName, user.firstName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="font-medium">
                  {user.firstName + " " + user.lastName}
                </p>
                <span className="text-sm">
                  {capitalizeFirstLetter(user.role)}
                </span>
              </div>
            </div>
            <Separator className="mt-4 mb-2" />
            <Button variant="ghost" className="w-full !justify-start" asChild>
              <Link
                href="/user/gaspard.dlx"
                className="flex gap-2 items-center"
              >
                <IconUser size={20} />
                Votre profil
              </Link>
            </Button>
            <Button variant="ghost" className="w-full !justify-start" asChild>
              <Link href="/settings" className="flex gap-2 items-center">
                <IconSettings size={20} />
                Paramètres
              </Link>
            </Button>
            <Button variant="ghost" className="w-full !justify-start" asChild>
              <Link href="/orders" className="flex gap-2 items-center">
                <IconShoppingCart size={20} />
                Vos commandes
              </Link>
            </Button>
            {user.role === "staff" && (
              <div>
                <Separator className="my-2" />
                <Button
                  variant="ghost"
                  className="w-full !justify-start"
                  asChild
                >
                  <Link href="/manage" className="flex gap-2 items-center">
                    <IconManualGearbox size={20} />
                    Tableau de gestion
                  </Link>
                </Button>
              </div>
            )}
            <Separator className="my-2" />
            <Button
              variant="ghost"
              className="w-full !justify-start cursor-pointer"
              asChild
              onClick={() => {
                handleLogout();
              }}
            >
              <span className="flex gap-2 items-center">
                <IconLogout size={20} />
                Déconnexion
              </span>
            </Button>
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
