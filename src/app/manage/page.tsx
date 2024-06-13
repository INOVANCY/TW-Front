"use client";

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
  IconPhoto,
  IconRollercoaster,
  IconShoppingCart,
  IconTheater,
} from "@tabler/icons-react";
import Link from "next/link";
import AppLayout from "../layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ManageHome() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || (user.role !== "admin" && user.role !== "staff")) {
      router.replace("/");
    }
  }, [user, router]);

  if (!user || (user.role !== "admin" && user.role !== "staff")) {
    return null;
  }

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
    {
      name: "Médias",
      icon: <IconPhoto size={32} stroke={1.5} />,
      href: "/manage/medias",
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
        <Card className="row-span-2 col-span-2">
          <CardHeader>
            <CardTitle>Bienvenue !</CardTitle>
          </CardHeader>
          <CardContent>
            <p className=" mt-2">
              Vous êtes sur la partie de gestion de Thrills World. Ici, vous
              pouvez maintenir la base de données du site et alimenter les
              actualités. N'oubliez pas: avec grand pouvoir, vient grande
              responsabilité.
            </p>
            <ul className="flex flex-col gap-2 mt-2">
              {rules.map((rule, index) => (
                <li key={index} className="flex items-center gap-2 ">
                  <span className="bg-green-500 rounded-full text-white p-1">
                    <IconCheck size={16} />
                  </span>
                  {rule}
                </li>
              ))}
            </ul>
            <p className=" mt-2">
              Encore milles mercis pour votre aide précieuse !
            </p>
          </CardContent>
        </Card>
        {cards.map((card) => {
          return (
            <Card key={card.name}>
              <CardContent className="flex flex-col gap-2 items-center justify-center h-full !pt-6">
                <div className="h-16 w-16 bg-red-600 rounded-full flex items-center justify-center text-white">
                  {card.icon}
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="mb-1">{card.name}</h1>
                  <Button variant="link" size="link" asChild>
                    <Link href={card.href}>Cliquez pour gérer</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AppLayout>
  );
}
