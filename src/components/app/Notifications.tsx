"use client";

import { useOpenElement } from "@/contexts/OpenElement";
import {
  IconBell,
  IconMailOpened,
  IconShoppingCart,
  IconTrophy,
  IconUserPlus,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

export default function Notifications() {
  // Variables
  const { openElement, setOpenElement } = useOpenElement();

  // Functions
  const handleOpenClose = () => {
    if (openElement === "notifications") {
      setOpenElement(null);
    } else {
      setOpenElement("notifications");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconBell
          size={24}
          className="cursor-pointer"
          onClick={() => handleOpenClose()}
        />
      </PopoverTrigger>

      <PopoverContent sideOffset={10} align="center" className="w-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-medium">Notifications</h1>
          <div className=" flex items-center gap-3">
            <Badge variant="destructive">2 non lues</Badge>
            <IconMailOpened size={20} />
          </div>
        </div>
        <Separator />
        <div className="flex gap-3 p-2 my-2 hover:bg-slate-100/10 rounded-lg">
          <span className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center text-red-500 mt-1">
            <IconUserPlus size={24} />
          </span>
          <div className="flex flex-col">
            <p>Nouvelle demande d&apos;ami</p>
            <p className="text-xs">
              Hourra ! Gaspard Delvaux vous a demandé en ami.
            </p>
            <span className="text-xs mt-1 text-muted-foreground">
              Aujourd&apos;hui
            </span>
          </div>
        </div>
        <hr />
        <div className="flex gap-3 p-2 my-2 hover:bg-slate-100/10 rounded-lg">
          <span className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center text-red-500 mt-1">
            <IconTrophy size={24} />
          </span>
          <div className="flex flex-col">
            <p>Le nouveau classement est arrivé</p>
            <p className="text-xs ">Alors, ça donne quoi ce mois-ci ?</p>
            <span className="text-xs mt-1 text-muted-foreground">Hier</span>
          </div>
        </div>
        <hr />
        <div className="flex gap-3 p-2 my-2 hover:bg-slate-100/10 rounded-lg">
          <span className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center text-red-500 mt-1">
            <IconShoppingCart size={24} />
          </span>
          <div className="flex flex-col">
            <p>Nouvelle commande</p>
            <p className="text-xs">
              Félicitations, vous avez reçu une nouvelle commande.
            </p>
            <span className="text-xs mt-1 text-muted-foreground">
              14 avril 2024
            </span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
