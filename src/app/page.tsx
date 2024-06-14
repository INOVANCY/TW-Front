import Image from "next/image";
import AppLayout from "./layouts/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { IconBook, IconShoppingBag, IconTrophy } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function Home() {
  const newsList = [
    {
      id: 1,
      title: "Untamed: histoire d'une success story",
      date: "28 mai 2024",
      image: "/dev/untamed.jpg",
    },
    {
      id: 2,
      title: "Kondaa: une réussite signée Intamin",
      date: "21 mai 2024",
      image: "/dev/kondaa.jpg",
    },
    {
      id: 3,
      title: "Wodan: quand GCI révolutionne le...",
      date: "14 mai 2024",
      image: "/dev/wodan.jpg",
    },
    {
      id: 4,
      title: "Voltron: enfin un coaster à la hauteur",
      date: "11 mai 2024",
      image: "/dev/voltron.jpg",
    },
  ];

  const lastUsersActivity = [
    {
      id: 1,
      title: "Gaspard D. a noté Untamed: 9.8/10",
      timestamp: "Il y a 2 heures",
      image: "/dev/pdp.jpeg",
    },
    {
      id: 2,
      title: "Gaspard D. a publié un nouvel article",
      timestamp: "Il y a 4 heures",
      image: "/dev/pdp.jpeg",
    },
    {
      id: 3,
      title: "Gaspard D. a noté Kondaa: 9.5/10",
      timestamp: "Il y a 6 heures",
      image: "/dev/pdp.jpeg",
    },
    {
      id: 4,
      title: "Gaspard D. a posté une anecdote",
      timestamp: "Il y a 8 heures",
      image: "/dev/pdp.jpeg",
    },
    {
      id: 5,
      title: "Gaspard D. a noté Wodan: 9.2/10",
      timestamp: "Il y a 10 heures",
      image: "/dev/pdp.jpeg",
    },
    {
      id: 6,
      title: "Gaspard D. a noté Voltron: 9.7/10",
      timestamp: "Il y a 12 heures",
      image: "/dev/pdp.jpeg",
    },
  ];

  const lastRanking = [
    {
      id: 1,
      title: "Untamed",
      manufacturer: "Rocky Mountain Construction",
      image: "/dev/untamed.jpg",
    },
    {
      id: 2,
      title: "Kondaa",
      manufacturer: "Intamin",
      image: "/dev/kondaa.jpg",
    },
    {
      id: 3,
      title: "Wodan",
      manufacturer: "Great Coasters International",
      image: "/dev/wodan.jpg",
    },
    {
      id: 4,
      title: "Voltron",
      manufacturer: "Mack Rides",
      image: "/dev/voltron.jpg",
    },
    {
      id: 5,
      title: "Black Mamba",
      manufacturer: "Bolliger & Mabillard",
      image: "/dev/blackmamba.webp",
    },
    {
      id: 6,
      title: "Taron",
      manufacturer: "Intamin",
      image: "/dev/taron.jpg",
    },
  ];

  const productsList = [
    {
      id: 1,
      title: "Kondaa MOC",
      description: "Construisez votre propre Kondaa en Lego!",
      image: "kondaa_moc.webp",
    },
    {
      id: 2,
      title: "The Smiler 3D Model",
      description: "Un modèle 3D du train du célèbre The Smiler!",
      image: "smiler_3d.webp",
    },
    {
      id: 3,
      title: "Cadre Voltron Nevera",
      description: "Un cadre de Voltron pour décorer votre intérieur!",
      image: "voltron_frame.webp",
    },
    {
      id: 4,
      title: "Ride To Happiness MOC",
      description: "Construisez votre propre Ride To Happiness en Lego!",
      image: "rth_moc.webp",
    },
    {
      id: 5,
      title: "The Smiler Mini Figure",
      description: "Le tracé de The Smiler dans votre salon!",
      image: "smiler_minifigure.webp",
    },
    {
      id: 6,
      title: "Untamed MOC",
      description: "Construisez votre propre Untamed en Lego!",
      image: "untamed_moc.webp",
    },
  ];

  return (
    <AppLayout>
      <div className="grid grid-cols-12 gap-4">
        {newsList.map((news) => (
          <Link
            href={`/news/${news.id}`}
            className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3"
            key={news.id}
          >
            <Card className="h-full group">
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </AspectRatio>
              <CardContent className="!p-4">
                <h2 className="font-medium text-lg group-hover:text-primary">
                  {news.title}
                </h2>
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-muted-foreground">{news.date}</p>
                  <Button variant="link" size="link">
                    <IconBook size={16} className="me-1" /> Lire l'article
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        <Card className="col-span-12 xl:col-span-7">
          <CardHeader>
            <div className="flex flex-col items-center justify-between md:flex-row">
              <CardTitle>Dernier classement mondial</CardTitle>

              <Button
                size="link"
                variant="link"
                className="mt-2 md:mt-1"
                asChild
              >
                <Link href="/">
                  <IconTrophy size={16} className="me-1" /> Voir le classement
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              {lastRanking.map((ranking) => (
                <div key={ranking.id}>
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={ranking.image}
                      alt={ranking.title}
                      fill
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </AspectRatio>
                  <div className="flex justify-between gap-3 items-center mt-2">
                    <p className="font-medium text-lg overflow-hidden">
                      {ranking.title}
                    </p>

                    <Badge>#{ranking.id}</Badge>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {ranking.manufacturer}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-12 md:col-span-6 xl:col-span-5">
          <CardHeader>
            <div className="flex flex-col items-center justify-between md:flex-row">
              <CardTitle>Produits du moment</CardTitle>

              <Button
                size="link"
                variant="link"
                className="mt-2 md:mt-1"
                asChild
              >
                <Link href="/marketplace">
                  <IconShoppingBag size={16} className="me-1" /> Voir la
                  boutique
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Carousel className="w-full" opts={{ loop: true, align: "center" }}>
              <CarouselContent>
                {productsList.map((product) => (
                  <CarouselItem key={product.id} className="basis-1/2">
                    <div className="w-full flex items-center justify-center flex-col border rounded-lg">
                      <Image
                        width={250}
                        height={250}
                        src={`/dev/products/${product.image}`}
                        alt="Product image"
                        className="rounded-lg m-1"
                      />
                      <div className="p-2 text-center">
                        <h1 className="text-xl font-medium">{product.title}</h1>
                        <p className="text-sm text-muted-foreground">
                          {product.description}
                        </p>
                      </div>
                      <div className="w-full p-2 mt-4 flex justify-between">
                        <Button variant="link" size="link" asChild>
                          <Link href={`/marketplace/product/${product.id}`}>
                            Voir le produit
                          </Link>
                        </Button>
                        <Badge>+32%</Badge>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </CardContent>
        </Card>
        {/* <Card className="col-span-12 md:col-span-6 xl:col-span-3">
          <CardHeader>
            <CardTitle>Actualités Thrills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {lastUsersActivity.map((activity) => (
              <CardDescription key={activity.id}>
                <div className="flex items-center">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={activity.image} alt="Gaspard Delvaux" />
                    <AvatarFallback>GD</AvatarFallback>
                  </Avatar>
                  <div className="ms-2">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs">{activity.timestamp}</p>
                  </div>
                </div>
              </CardDescription>
            ))}
          </CardContent>
        </Card> */}
      </div>
    </AppLayout>
  );
}
