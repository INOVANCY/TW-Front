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
  IconCalendarEvent,
  IconCirclePlus,
  IconClock,
  IconCrane,
  IconFlag,
  IconFountain,
  IconHeart,
  IconHome,
  IconLanguage,
  IconMoneybag,
  IconNotes,
  IconPin,
  IconPlaneArrival,
  IconPlaneDeparture,
  IconPlus,
  IconPoo,
  IconRollercoaster,
  IconScale,
  IconStar,
  IconTimeline,
  IconTrophy,
  IconUser,
  IconUserPlus,
  IconUsersGroup,
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
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { PieChart, Pie, ResponsiveContainer, Legend, Tooltip } from "recharts";

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

  const data = [
    {
      name: "Vekoma",
      value: 26,
    },
    {
      name: "Intamin",
      value: 20,
    },
    {
      name: "B&M",
      value: 15,
    },
    {
      name: "RMC",
      value: 10,
    },
    {
      name: "Gerstlauer",
      value: 8,
    },
    {
      name: "Mack Rides",
      value: 6,
    },
    {
      name: "Zamperla",
      value: 5,
    },
    {
      name: "Schwarzkopf",
      value: 4,
    },
    {
      name: "Maurer Rides",
      value: 3,
    },
    {
      name: "B&M",
      value: 2,
    },
  ];

  // Fonctions

  function handleCopyUserLink() {
    navigator.clipboard.writeText("https://thrills.world/user/gaspard.dlx");
    toast({
      title: "(La Trace du) Hourra!",
      description: "Lien copié dans le presse-papier",
    });
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
            <Dialog key={index}>
              <DialogTrigger>
                <Card className="cursor-pointer group">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex flex-col justify-center items-start">
                      <p className="font-bold text-slate-800 text-xl group-hover:text-red-600">
                        {stat.value}
                      </p>
                      <p className="text-slate-800 group-hover:text-red-600">
                        {stat.label}
                      </p>
                    </div>
                    <div className="bg-red-200 p-3 rounded-full text-red-600">
                      {stat.icon}
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{stat.value + " " + stat.label}</DialogTitle>
                  <DialogDescription>
                    Détails de la statistique
                  </DialogDescription>
                  <div className="my-8">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={data}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius="80%"
                          fill="#F20A0A"
                          className="outline-none"
                          label
                        />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ))}
        </div>
        <Tabs defaultValue="rankings" className="col-span-3">
          <Card className="col-span-3">
            <CardContent className="p-2">
              <TabsList className="w-full grid grid-cols-6">
                <TabsTrigger value="rankings">Classements</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="trips">Voyages</TabsTrigger>
                <TabsTrigger value="anecdotes">Anecdotes</TabsTrigger>
                <TabsTrigger value="gaming">Gaming</TabsTrigger>
                <TabsTrigger value="products">Produits</TabsTrigger>
              </TabsList>
            </CardContent>
          </Card>
          <TabsContent value="rankings">
            <Card>
              <CardHeader>
                <CardTitle>Classements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <IconScale size={20} /> Voir sa pondération
                  </Button>
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
                      <p className="text-muted-foreground">
                        Note avec pondération
                      </p>
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
                      <p className="text-muted-foreground">
                        Note avec pondération
                      </p>
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
                      <p className="text-muted-foreground">
                        Note avec pondération
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="trips">
            <Card>
              <CardHeader>
                <CardTitle>Voyages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-800">
                  Liste des voyages publiques de{" "}
                  <span className="font-medium">@gaspard.dlx</span>. Et si vous
                  y participiez ?
                </p>
                <Separator className="my-4" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-lg flex flex-col">
                    <h1 className="text-2xl font-medium p-4 text-center">
                      Trip aux USA
                    </h1>
                    <Separator />
                    <div className="p-4 flex flex-wrap items-center justify-center gap-4">
                      <Badge
                        variant="secondary"
                        className="w-fit flex items-center justify-center gap-2"
                      >
                        <IconPlaneDeparture size={18} /> 12/08/2024
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="w-fit flex items-center justify-center gap-2"
                      >
                        <IconPlaneArrival size={18} /> 18/08/2024
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="w-fit flex items-center justify-center gap-2"
                      >
                        <IconMoneybag size={18} /> 459€
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="w-fit flex items-center justify-center gap-2"
                      >
                        <IconFountain size={18} /> 5 parcs
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="w-fit col-span-2 flex items-center justify-center gap-2"
                      >
                        <IconUsersGroup size={18} /> 5 participants
                      </Badge>
                    </div>
                    <Separator />
                    <div className="p-4 text-red-600 font-medium">
                      <Link
                        href="/trip/usa"
                        className="flex items-center gap-2 justify-center text-sm"
                      >
                        <IconPlus size={16} /> Voir les détails
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="anecdotes">
            <Card>
              <CardHeader>
                <CardTitle>Anecdotes</CardTitle>
              </CardHeader>
              <CardContent>
                Liste des pires (et meilleures) anecdotes de{" "}
                <span className="font-medium">@gaspard.dlx</span>.
                <Separator className="my-4" />
                <div className="mb-4 border border-red-200 rounded-lg flex gap-4">
                  <div className="p-4 border-e border-red-200 text-red-400 flex flex-col justify-between">
                    <IconPoo size={24} />
                    <p className="[writing-mode:vertical-lr] text-xl font-bold">
                      NUL!
                    </p>
                    <IconPoo size={24} />
                  </div>
                  <div className="p-4">
                    <h3 className="text-slate-800 font-medium text-lg flex items-center gap-2 mb-2">
                      Une des pires sensations!
                      <Badge variant="outline">PortAventura Park</Badge>
                    </h3>
                    <p className=" text-slate-800">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Exercitationem voluptas nam dignissimos voluptatibus
                      facilis, expedita quaerat quibusdam! Quis delectus ex
                      ipsa, culpa optio officiis voluptatum laudantium adipisci
                      quidem dolor aliquid. Ut adipisci commodi quisquam
                      repellat illum vitae blanditiis suscipit sapiente aliquid
                      qui? Magnam, repudiandae itaque eius distinctio atque,
                      quos aspernatur, praesentium consequatur accusamus
                      assumenda qui hic repellat excepturi fuga sint.
                    </p>
                  </div>
                </div>
                <div className="mb-4 border border-green-200 rounded-lg flex gap-4">
                  <div className="p-4 border-e border-green-200 text-green-400 flex flex-col justify-between">
                    <IconHeart size={24} />
                    <p className="[writing-mode:vertical-lr] text-xl font-bold">
                      TOP!
                    </p>
                    <IconHeart size={24} />
                  </div>
                  <div className="p-4">
                    <h3 className="text-slate-800 font-medium text-lg flex items-center gap-2 mb-2">
                      Quel super opérateur!
                      <Badge variant="outline">Walibi Belgium</Badge>
                    </h3>
                    <p className=" text-slate-800">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Nisi praesentium, eveniet error iusto sed corporis autem.
                      Blanditiis nobis nisi fugiat officia libero illum
                      perspiciatis voluptas error consequuntur. Enim, itaque
                      odit. Beatae, illo eos. Suscipit, praesentium optio
                      assumenda sint nam, delectus iure maiores eos maxime error
                      nobis veniam et dolorem! Dicta, nam. Atque sed soluta
                      commodi reprehenderit iure itaque voluptatibus modi.
                      Accusamus officiis quo, natus unde quod perferendis ex
                      optio nihil! Recusandae suscipit asperiores eum rem,
                      nostrum tempora natus quod voluptates facere nisi ad
                      deleniti, explicabo fugit expedita, consequuntur omnis
                      modi?
                    </p>
                  </div>
                </div>
              </CardContent>
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
        </Tabs>
      </div>
    </AppLayout>
  );
}
