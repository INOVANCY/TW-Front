"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AppLayout from "../layouts/AppLayout";
import { Badge } from "@/components/ui/badge";
import {
  IconAt,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandSnapchat,
  IconBrandX,
  IconBuildingCarousel,
  IconCirclePlus,
  IconClock,
  IconCrane,
  IconFlag,
  IconFountain,
  IconHeart,
  IconHome,
  IconLanguage,
  IconNotes,
  IconPin,
  IconPlus,
  IconRollercoaster,
  IconStar,
  IconTimeline,
  IconTrophy,
  IconUser,
  IconUserPlus,
  IconWorld,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";

export default function UserProfile() {
  const UserStatistics = [
    {
      icon: <IconRollercoaster size={32} />,
      value: 108,
      label: "coasters ridés",
    },
    {
      icon: <IconTrophy size={32} />,
      value: 10,
      label: "dans le top 100",
    },
    {
      icon: <IconCrane size={32} />,
      value: "Vekoma",
      label: "le plus ridé",
    },
    {
      icon: <IconBuildingCarousel size={32} />,
      value: 256,
      label: "attractions ridées",
    },
    {
      icon: <IconFountain size={32} />,
      value: 18,
      label: "parcs visités",
    },
    {
      icon: <IconWorld size={32} />,
      value: 6,
      label: "pays visités",
    },
    {
      icon: <IconPin size={32} />,
      value: "Belgique",
      label: "le plus ridé",
    },
    {
      icon: <IconNotes size={32} />,
      value: 364,
      label: "notes attribuées",
    },
  ];

  // Fonctions

  function handleCopyUserLink() {
    navigator.clipboard.writeText("https://thrills.world/user/gaspard.dlx");
    toast({ title: "Lien copié dans le presse-papier" });
  }

  return (
    <AppLayout>
      <div className="grid grid-cols-4 gap-4">
        <Card className="col-span-4">
          <div className="w-full h-72">
            <img
              src="/dev/kondaa.jpg"
              alt="Kondaa"
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>
          <div className="px-4 pb-4 -mt-10 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <Avatar className="w-40 h-40 rounded-xl border-4 border-white">
                <AvatarImage src="/dev/pdp.jpeg" alt="Gaspard Delvaux" />
                <AvatarFallback>GD</AvatarFallback>
              </Avatar>
              <div className="mt-10">
                <h2 className="text-3xl font-semibold mb-2">Gaspard Delvaux</h2>
                <ul className="flex gap-4">
                  <li>
                    <Badge
                      className="p-1.5 px-2 text-slate-800"
                      variant="secondary"
                    >
                      <IconBrandFacebook size={16} />
                    </Badge>
                  </li>
                  <li>
                    <Badge className="p-1.5 text-slate-800" variant="secondary">
                      <IconBrandInstagram size={16} />
                    </Badge>
                  </li>
                  <li>
                    <Badge className="p-1.5 text-slate-800" variant="secondary">
                      <IconBrandX size={16} />
                    </Badge>
                  </li>
                  <li>
                    <Badge
                      className="p-1.5 px-2 text-slate-800"
                      variant="secondary"
                    >
                      <IconBrandSnapchat size={16} />
                    </Badge>
                  </li>
                </ul>
              </div>
            </div>
            <Button className="flex items-center gap-2 mt-10">
              <IconUserPlus size={18} /> Demander en ami
            </Button>
          </div>
        </Card>
        <div className="row-span-2">
          <Card className="row-span-2">
            <CardHeader>
              <CardTitle>A propos</CardTitle>
              <CardDescription className="pt-2">
                « You can't buy happiness, but you can buy a theme park ticket,
                and that's kinda the same thing. »
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-800"></p>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2 text-slate-800">
                  <IconHeart size={18} />
                  Europa-Park
                </li>
                <li className="flex items-center gap-2 text-slate-800">
                  <IconHome size={18} />
                  Walibi Belgium
                </li>
                <li>
                  <Separator className="my-2" />
                </li>
                <li className="flex items-center gap-2 text-slate-800">
                  <IconUser size={18} />
                  Gaspard Delvaux
                </li>
                <li className="flex items-center gap-2 text-slate-800">
                  <IconAt size={18} />
                  gaspard.dlx
                  <Badge
                    variant="outline"
                    className="text-xs cursor-pointer"
                    onClick={() => handleCopyUserLink()}
                  >
                    Copier le lien
                  </Badge>
                </li>
                <li className="flex items-center gap-2 text-slate-800">
                  <IconLanguage size={18} />
                  Français
                </li>
                <li className="flex items-center gap-2 text-slate-800">
                  <IconFlag size={18} />
                  Belgique
                </li>
                <li className="flex items-center gap-2 text-slate-800">
                  <IconClock size={18} />
                  Membre depuis le 11 juin 2024
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Statistiques */}
        <div className="col-span-3 grid grid-cols-4 gap-4">
          {UserStatistics.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex flex-col justify-center items-start">
                  <p className="font-bold text-slate-800 text-xl">
                    {stat.value}
                  </p>
                  <p className="text-slate-800">{stat.label}</p>
                </div>
                <div className="bg-red-200 p-3 rounded-full text-red-600">
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Tabs defaultValue="rankings" className="col-span-3">
          <Card className="col-span-3">
            <CardContent className="p-2">
              <TabsList className="w-full grid grid-cols-6">
                <TabsTrigger value="rankings">Classements</TabsTrigger>
                <TabsTrigger value="trips" disabled>
                  Voyages
                </TabsTrigger>
                <TabsTrigger value="anecdotes">Anecdotes</TabsTrigger>
                <TabsTrigger value="gaming">Gaming</TabsTrigger>
                <TabsTrigger value="products">Produits</TabsTrigger>
                <TabsTrigger value="activity">Activité</TabsTrigger>
              </TabsList>
            </CardContent>
          </Card>
          <TabsContent value="rankings">
            <Card>
              <CardHeader>
                <CardTitle>Classements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <p>Choisissez le classement à afficher:</p>
                  <Select defaultValue="a_coasters">
                    <SelectTrigger className="w-72">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Manuel</SelectLabel>
                        <SelectItem value="m_coasters">
                          Top coasters manuel
                        </SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Automatique</SelectLabel>
                        <SelectItem value="a_coasters">
                          Top coasters automatique
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Separator className="my-4" />
                <ul className="flex flex-col gap-4">
                  <li className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <div className="w-40">
                        <AspectRatio ratio={16 / 9}>
                          <Image
                            src="/dev/untamed.jpg"
                            alt="Untamed"
                            fill
                            objectFit="cover"
                            className="rounded-lg"
                          />
                        </AspectRatio>
                      </div>
                      <div className="flex flex-col">
                        <h1 className="text-2xl text-slate-800 font-medium flex items-center gap-2">
                          #1 Untamed <Badge variant="gradient">TOP 1</Badge>
                        </h1>
                        <p className="text-muted-foreground">Walibi Holland</p>
                        <p className="text-muted-foreground">
                          Rocky Mountain Construction
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col text-right">
                      <p className="text-2xl text-slate-800 font-medium flex items-center justify-end gap-2">
                        <IconStar size={20} /> 9.9
                      </p>
                      <p className="text-muted-foreground">Note moyenne</p>
                    </div>
                  </li>
                  <li className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <div className="w-40">
                        <AspectRatio ratio={16 / 9}>
                          <Image
                            src="/dev/kondaa.jpg"
                            alt="Kondaa"
                            fill
                            objectFit="cover"
                            className="rounded-lg"
                          />
                        </AspectRatio>
                      </div>
                      <div className="flex flex-col">
                        <h1 className="text-2xl text-slate-800 font-medium flex items-center gap-2">
                          #2 Kondaa
                        </h1>
                        <p className="text-muted-foreground">Walibi Belgium</p>
                        <p className="text-muted-foreground">Intamin</p>
                      </div>
                    </div>
                    <div className="flex flex-col text-right">
                      <p className="text-2xl text-slate-800 font-medium flex items-center justify-end gap-2">
                        <IconStar size={20} /> 9.4
                      </p>
                      <p className="text-muted-foreground">Note moyenne</p>
                    </div>
                  </li>
                  <li className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <div className="w-40">
                        <AspectRatio ratio={16 / 9}>
                          <Image
                            src="/dev/wodan.jpg"
                            alt="Kondaa"
                            fill
                            objectFit="cover"
                            className="rounded-lg"
                          />
                        </AspectRatio>
                      </div>
                      <div className="flex flex-col">
                        <h1 className="text-2xl text-slate-800 font-medium flex items-center gap-2">
                          #3 Wodan Timbur Coaster
                        </h1>
                        <p className="text-muted-foreground">Europa-Park</p>
                        <p className="text-muted-foreground">
                          Great Coasters International
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col text-right">
                      <p className="text-2xl text-slate-800 font-medium flex items-center justify-end gap-2">
                        <IconStar size={20} /> 9.1
                      </p>
                      <p className="text-muted-foreground">Note moyenne</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="trips">
            <Card>
              <CardHeader>
                <CardTitle>Voyages</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="anecdotes">
            <Card>
              <CardHeader>
                <CardTitle>Anecdotes</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="gaming">
            <Card>
              <CardHeader>
                <CardTitle>Gaming</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Produits</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Activité</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
