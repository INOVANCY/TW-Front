"use client";

import { useOpenElement } from "@/app/contexts/OpenElement";
import {
  IconBell,
  IconMailOpened,
  IconShoppingCart,
  IconTrophy,
  IconUserPlus,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

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
    <div className="relative">
      <IconBell
        size={24}
        className="text-slate-800 cursor-pointer"
        onClick={() => handleOpenClose()}
      />
      <div
        className={`absolute z-20 right-0 top-10 w-96 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col gap-1 pb-2 transition-all duration-300 transform ${
          openElement === "notifications"
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <h1 className="text-slate-700 font-medium">Notifications</h1>
          <div className="text-slate-800 flex items-center gap-3">
            <span className="bg-red-200/50 border border-red-200 px-2 rounded-lg text-red-600">
              2 non lues
            </span>
            <IconMailOpened size={20} />
          </div>
        </div>
        <hr />
        <div className="flex gap-3 px-4 py-2 hover:bg-slate-200/50">
          <span className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center text-red-500 mt-1">
            <IconUserPlus size={24} />
          </span>
          <div className="flex flex-col">
            <p className="text-slate-800">Nouvelle demande d'ami</p>
            <p className="text-xs text-slate-800">
              Hourra ! Gaspard Delvaux vous a demandé en ami.
            </p>
            <span className="text-gray-400 text-xs mt-1">Aujourd'hui</span>
          </div>
        </div>
        <hr />
        <div className="flex gap-3 px-4 py-2 hover:bg-slate-200/50">
          <span className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center text-red-500 mt-1">
            <IconTrophy size={24} />
          </span>
          <div className="flex flex-col">
            <p className="text-slate-800">Le nouveau classement est arrivé</p>
            <p className="text-xs text-slate-800">
              Alors, ça donne quoi ce mois-ci ?
            </p>
            <span className="text-gray-400 text-xs mt-1">Hier</span>
          </div>
        </div>
        <hr />
        <div className="flex gap-3 px-4 py-2 hover:bg-slate-200/50">
          <span className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center text-red-500 mt-1">
            <IconShoppingCart size={24} />
          </span>
          <div className="flex flex-col">
            <p className="text-slate-800">Nouvelle commande</p>
            <p className="text-xs text-slate-800">
              Félicitations, vous avez reçu une nouvelle commande.
            </p>
            <span className="text-gray-400 text-xs mt-1">14 avril 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
}
