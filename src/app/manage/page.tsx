import { NavItems } from "@/types/app";
import {
  IconBuilding,
  IconBuildingCircus,
  IconCheck,
  IconChefHat,
  IconFountain,
  IconHotelService,
  IconInfoCircle,
  IconNews,
  IconRollercoaster,
  IconShoppingCart,
  IconTheater,
} from "@tabler/icons-react";
import Link from "next/link";
import AppLayout from "../layouts/AppLayout";

export default function ManageHome() {
  const cards: NavItems = [
    {
      name: "Actualités",
      icon: <IconNews size={32} stroke={1.5} />,
      href: "/manage/news",
    },
    {
      name: "Parcs",
      icon: <IconFountain size={32} stroke={1.5} />,
      href: "/manage/parks",
    },
    {
      name: "Attractions",
      icon: <IconRollercoaster size={32} stroke={1.5} />,
      href: "/manage/rides",
    },
    {
      name: "Spectacles",
      icon: <IconBuildingCircus size={32} stroke={1.5} />,
      href: "/manage/shows",
    },
    {
      name: "Boutiques",
      icon: <IconShoppingCart size={32} stroke={1.5} />,
      href: "/manage/shops",
    },
    {
      name: "Restaurants/bars",
      icon: <IconChefHat size={32} stroke={1.5} />,
      href: "/manage/restaurants",
    },
    {
      name: "Hôtels",
      icon: <IconHotelService size={32} stroke={1.5} />,
      href: "/manage/hotels",
    },
    {
      name: "Services",
      icon: <IconInfoCircle size={32} stroke={1.5} />,
      href: "/manage/services",
    },
    {
      name: "Entreprises",
      icon: <IconBuilding size={32} stroke={1.5} />,
      href: "/manage/companies",
    },
  ];

  const rules = [
    "Indiquez vos sources",
    "Restez objectif",
    "Assurez-vous de la précision des informations",
    "Optez pour un language professionnel",
  ];

  return (
    <AppLayout>
      <div className="grid grid-cols-7 gap-4">
        <div className="col-span-2 row-span-2 bg-white rounded-lg shadow-lg p-4">
          <h1 className="text-slate-800 text-xl">Bienvenue !</h1>
          <p className="text-slate-800 mt-2">
            Vous êtes sur la partie de gestion de Thrills World. Ici, vous
            pouvez maintenir la base de données du site et alimenter les
            actualités. N'oubliez pas: avec grand pouvoir, vient grande
            responsabilité.
          </p>
          <ul className="flex flex-col gap-2 mt-2">
            {rules.map((rule, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-slate-800"
              >
                <span className="bg-green-200/50 rounded-full text-green-600 p-1">
                  <IconCheck size={16} />
                </span>
                {rule}
              </li>
            ))}
          </ul>
          <p className="text-slate-800 mt-2">
            Encore milles mercis pour votre aide précieuse !
          </p>
        </div>
        {cards.map((card) => {
          return (
            <div className=" bg-white rounded-lg shadow-lg w-full p-4 flex flex-col items-center gap-2">
              <div className="h-16 w-16 bg-red-200/50 rounded-full flex items-center justify-center text-red-600">
                {card.icon}
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-slate-800">{card.name}</h1>
                <Link
                  href={card.href}
                  className="text-sm text-red-600 bg-red-100/50 rounded-lg px-1.5 py-0.5 font-medium mt-1"
                >
                  Cliquez pour gérer
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}
