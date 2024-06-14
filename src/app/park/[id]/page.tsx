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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import ParkService from "@/services/ParkService";
import RatesDialog from "./RatesDialog";
import StoryDialog from "./StoryDialog";

const places = [
  { name: "Bobbejaanland", distance: "60 km" },
  { name: "Plopsa Coo", distance: "96 km" },
  { name: "Efteling", distance: "110 km" },
  { name: "Toverland", distance: "124 km" },
  { name: "Plopsaland de Panne", distance: "146 km" },
  { name: "Phantasialand", distance: "161 km" },
];

type Rate = {
  year: number;
  adultPrice: number;
  childPrice: number;
  specialPrice: number;
  isEntranceFree: boolean;
  offersDiscounts: boolean;
  offersEarlyBird: boolean;
  _id: string;
};

type Land = {
  name: string;
  _id: string;
};

type ParkData = {
  _id: string;
  name: string;
  story: string;
  rates: Rate[];
  localisation: [number, number];
  medias: any[];
  lands: Land[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  city: string;
} | null;

export default function DBParkPage({ params }: { params: { id: string } }) {
  const [parkData, setParkData] = useState<ParkData>(null);
  const [mostRecentIndex, setMostRecentIndex] = useState(0);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (params.id) {
      ParkService.getPark(params.id)
        .then((response) => {
          response.data.park.rates.sort((a: Rate, b: Rate) => a.year - b.year);
          setParkData(response.data.park);
          setMostRecentIndex(response.data.park.rates.length - 1);
        })
        .catch((error) => {
          toast({
            title: "Oups! 🤯",
            description: "Ce parc n'existe pas.",
            variant: "destructive",
          });
          router.push("/");
        });
    } else {
      toast({
        title: "Oups! 🤯",
        description: "Ce parc n'existe pas.",
        variant: "destructive",
      });
      router.push("/");
    }
  }, []);

  if (!parkData) return null;
  return (
    <AppLayout>
      <div className="md:grid grid-cols-12 gap-4">
        <Card className="col-span-3 row-span-3">
          <CardHeader>
            <CardTitle className="text-primary">{parkData.name}</CardTitle>
            <CardDescription>{parkData.city}</CardDescription>
          </CardHeader>
          <CardContent>
            {parkData.rates && parkData.rates.length > 0 && (
              <ul className="flex flex-col gap-2">
                <li className="text-muted-foreground">
                  Prix d'entrée ({parkData.rates[mostRecentIndex].year})
                </li>

                <li className="flex items-center gap-2">
                  <IconMan size={18} /> Adultes:
                  {" " + parkData.rates[mostRecentIndex].adultPrice + " "}€
                </li>
                <li className="flex items-center gap-2">
                  <IconHorseToy size={18} /> Enfants:
                  {" " + parkData.rates[mostRecentIndex].childPrice + " "}€
                </li>
                <li className="flex items-center gap-2">
                  <IconWheelchair size={18} /> Spécial:
                  {" " + parkData.rates[mostRecentIndex].specialPrice + " "} €
                </li>
                <li className="text-muted-foreground mt-2">
                  Offres & promotions ({parkData.rates[mostRecentIndex].year})
                </li>
                <li className="flex items-center gap-2">
                  {parkData.rates[mostRecentIndex].isEntranceFree ? (
                    <>
                      <IconX size={18} /> L'entrée n'est pas gratuite
                    </>
                  ) : (
                    <>
                      <IconCheck size={18} />
                      L'entrée est gratuite
                    </>
                  )}
                </li>
                <li className="flex items-center gap-2">
                  {parkData.rates[mostRecentIndex].offersDiscounts ? (
                    <>
                      <IconX size={18} /> Pas de promotions régulières
                    </>
                  ) : (
                    <>
                      <IconCheck size={18} />
                      Promotions régulières
                    </>
                  )}
                </li>
                <li className="flex items-center gap-2">
                  {parkData.rates[mostRecentIndex].offersEarlyBird ? (
                    <>
                      <IconX size={18} /> Pas d'offre d'achat anticipé
                    </>
                  ) : (
                    <>
                      <IconCheck size={18} />
                      Offres d'achat anticipé
                    </>
                  )}
                </li>
                {parkData.rates.length > 1 && (
                  <RatesDialog
                    rates={parkData.rates}
                    parkName={parkData.name}
                  />
                )}
              </ul>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-3 mt-4 md:mt-0 p-6 flex-col flex items-center justify-center">
          <Badge className="text-2xl flex items-center gap-2 mb-2">
            <IconStar size={20} /> 9.4
          </Badge>
          <p className="mb-1">Votre note moyenne pour ce parc</p>
          <Button variant="link" size="link">
            Modifier ma note
          </Button>
        </Card>

        <Card className="col-span-4 mt-4 md:mt-0 row-span-2">
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
        <Card className="col-span-2 mt-4 md:mt-0 row-span-2">
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
        <Card className="col-span-3 mt-4 md:mt-0 p-6 flex-col flex items-center justify-center">
          <Badge className="text-2xl flex items-center gap-2 mb-2">
            <IconTrophy size={20} /> #489
          </Badge>
          <p className="mb-1">Au classement mondial des parcs</p>
          <Button variant="link" size="link">
            Voir le classement
          </Button>
        </Card>
        <Card className="col-span-6 mt-4 md:mt-0 p-6 text-center">
          {parkData.story.length > 200 ? (
            <>
              {parkData.story.substring(0, 150)}...{" "}
              <StoryDialog story={parkData.story} parkName={parkData.name} />
            </>
          ) : (
            parkData.story
          )}
        </Card>
        <Card className="col-span-3 mt-4 md:mt-0 p-6 flex flex-col justify-center items-center gap-1">
          <Button variant="link" size="link">
            Voir le calendrier
          </Button>
          <Button variant="link" size="link">
            Comparer avec un autre parc
          </Button>
        </Card>
        <div className="col-span-5 mt-4 md:mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Plan du parc</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-36">
                <p>Plan du parc avec données dynamiques</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-7 mt-4 md:mt-0">
          <CardHeader>
            <CardTitle>Elements du parc</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="rides">
              <TabsList className="grid grid-cols-2 md:grid-cols-6 h-auto">
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
                <p>Attractions</p>
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
