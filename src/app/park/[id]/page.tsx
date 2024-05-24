"use client";

import AppLayout from "@/app/layouts/AppLayout";
import TWMap from "@/components/ui/Map";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  IconCheck,
  IconHorseToy,
  IconLockOpen,
  IconMan,
  IconStar,
  IconTrophy,
  IconWheelchair,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Rides, ridesColumns } from "./columns";

const places = [
  { name: "Bobbejaanland", distance: "60 km" },
  { name: "Plopsa Coo", distance: "96 km" },
  { name: "Efteling", distance: "110 km" },
  { name: "Toverland", distance: "124 km" },
  { name: "Plopsaland de Panne", distance: "146 km" },
  { name: "Phantasialand", distance: "161 km" },
];

const rides: Rides[] = [
  {
    id: 1,
    name: "Kondaa",
    type: "Montagnes russes",
    manufacturer: "Intamin",
  },
  {
    id: 2,
    name: "Tiki-Waka",
    type: "Montagnes russes",
    manufacturer: "Gerstlauer",
  },
  {
    id: 3,
    name: "Calamity Mine",
    type: "Montagnes russes",
    manufacturer: "Vekoma",
  },
  {
    id: 4,
    name: "Pulsar",
    type: "Montagnes russes",
    manufacturer: "Mack Rides",
  },
  {
    id: 5,
    name: "Challenge of Tutankhamon",
    type: "Montagnes russes",
    manufacturer: "Sally Corporation",
  },
  {
    id: 6,
    name: "Radja River",
    type: "Attraction aquatique",
    manufacturer: "Intamin",
  },
  {
    id: 7,
    name: "Loup Garou",
    type: "Montagnes russes",
    manufacturer: "Vekoma",
  },
  {
    id: 8,
    name: "Vampire",
    type: "Montagnes russes",
    manufacturer: "Vekoma",
  },
  {
    id: 9,
    name: "Cobra",
    type: "Montagnes russes",
    manufacturer: "Vekoma",
  },
  {
    id: 10,
    name: "Psyke Underground",
    type: "Montagnes russes",
    manufacturer: "Gerstlauer",
  },
  {
    id: 11,
    name: "Popcorn Revenge",
    type: "Attraction interactive",
    manufacturer: "Alterface",
  },
  {
    id: 12,
    name: "Dalton Terror",
    type: "Attraction",
    manufacturer: "Intamin",
  },
  {
    id: 13,
    name: "Fun Pilot",
    type: "Montagnes russes",
    manufacturer: "Zierer",
  },
  {
    id: 14,
    name: "Vampire",
    type: "Montagnes russes",
    manufacturer: "Vekoma",
  },
];

export default function DBParkPage() {
  return (
    <AppLayout>
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-3 row-span-3">
          <CardHeader>
            <CardTitle className="text-primary">Walibi Belgium</CardTitle>
            <CardDescription>Wavre, Belgique</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2">
              <li className="text-muted-foreground">Prix d'entrée (2024)</li>

              <li className="flex items-center gap-2">
                <IconMan size={18} /> Adultes: 49,00 €
              </li>
              <li className="flex items-center gap-2">
                <IconHorseToy size={18} /> Enfants: 44,00 €
              </li>
              <li className="flex items-center gap-2">
                <IconWheelchair size={18} /> Spécial: 44,00 €
              </li>
              <li className="text-muted-foreground mt-2">
                Offres & promotions (2024)
              </li>
              <li className="flex items-center gap-2">
                <IconX size={18} /> L'entrée n'est pas gratuite
              </li>
              <li className="flex items-center gap-2">
                <IconX size={18} /> Pas d'offre d'achat anticipé
              </li>
              <li className="flex items-center gap-2">
                <IconCheck size={18} /> Promotions régulières
              </li>
              <li>
                <Button variant="link" size="link">
                  Voir l'historique
                </Button>
              </li>
            </ul>
            {/* <div className="w-full h-52 mt-4">
              <TWMap />
            </div> */}
          </CardContent>
        </Card>
        <Card className="col-span-3 p-6 flex-col flex items-center justify-center">
          <Badge className="text-2xl flex items-center gap-2 mb-2">
            <IconStar size={20} /> 9.4
          </Badge>
          <p className="mb-1">Votre note moyenne pour ce parc</p>
          <Button variant="link" size="link">
            Modifier ma note
          </Button>
        </Card>

        <Card className="col-span-4 row-span-2">
          <CardContent className="!p-6">
            <Carousel className="w-full">
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-video w-full rounded-md relative">
                      <Image
                        src="/dev/kondaa.jpg"
                        alt="Kondaa"
                        fill
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs">
                        Image par{" "}
                        <Link href="/user/gaspard.dlx" className="font-medium">
                          @gaspard.dlx
                        </Link>
                      </p>
                      <p className="text-xs">{index + 1}/13</p>
                      <a className="text-xs" href="">
                        Proposer une photo
                      </a>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </CardContent>
        </Card>
        <Card className="col-span-2 row-span-2">
          <CardHeader>
            <CardTitle>A proximité</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2">
              {places.map((place) => (
                <li key={place.name}>
                  <Link
                    href={`/parks/${place.name}`}
                    className="hover:underline underline-offset-4"
                  >
                    {place.name} ({place.distance})
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="col-span-3 p-6 flex-col flex items-center justify-center">
          <Badge className="text-2xl flex items-center gap-2 mb-2">
            <IconTrophy size={20} /> #489
          </Badge>
          <p className="mb-1">Au classement mondial des parcs</p>
          <Button variant="link" size="link">
            Voir le classement
          </Button>
        </Card>
        <Card className="col-span-6 p-6 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati,
          architecto. Ipsam animi nulla vero iusto vel fugit natus culpa rem qui
          libero maxime, cupiditate, minus...{" "}
          <span className="text-primary font-medium hover:underline underline-offset-4 cursor-pointer">
            Lire plus
          </span>
        </Card>
        <Card className="col-span-3 p-6 flex flex-col justify-center items-center gap-1">
          <Button variant="link" size="link">
            Voir le calendrier
          </Button>
          <Button variant="link" size="link">
            Comparer avec un autre parc
          </Button>
        </Card>
        <div className="col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Plan du parc</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-96">
                <TWMap />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-7">
          <CardHeader>
            <CardTitle>Elements du parc</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="rides">
              <TabsList className="w-full !justify-between">
                <TabsTrigger value="rides">Attractions</TabsTrigger>
                <TabsTrigger value="shows">Spectacles</TabsTrigger>
                <TabsTrigger value="restaurants">
                  Restaurants & bars
                </TabsTrigger>
                <TabsTrigger value="shops">Boutiques</TabsTrigger>
                <TabsTrigger value="hotels">Hôtels</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
              </TabsList>
              <TabsContent value="rides">
                <DataTable
                  columns={ridesColumns}
                  data={rides}
                  searchColumn="name"
                />
              </TabsContent>
              <TabsContent value="shows">
                <p>Spectacles</p>
              </TabsContent>
              <TabsContent value="restaurants">
                <p>Restaurants</p>
              </TabsContent>
              <TabsContent value="shops">
                <p>Boutiques</p>
              </TabsContent>
              <TabsContent value="hotels">
                <p>Hôtels</p>
              </TabsContent>
              <TabsContent value="services">
                <p>Services</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
