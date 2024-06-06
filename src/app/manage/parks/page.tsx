"use client";

import AppLayout from "@/app/layouts/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { use, useEffect, useState } from "react";
import { columns } from "./columns";
import { Controller, set, useFieldArray, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  IconArrowDown,
  IconCheck,
  IconInfoCircle,
  IconSend,
} from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import TWMap from "@/components/ui/Map";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Checkbox } from "@/components/ui/checkbox";
import ManageParkService from "@/services/manage/ManageParkService";
import { Park } from "@/types/db";
import { ManageParkFormSchema, ManageParkFormType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ManageParksHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoneModalOpen, setIsZoneModalOpen] = useState(false);
  const [selectedPark, setSelectedPark] = useState<Park | null>(null);
  const [parks, setParks] = useState<Park[]>([]);
  const [pageCount, setPageCount] = useState(0);

  // Data sur les parcs d'attractions

  const fetchParks = async (
    pageIndex: number,
    pageSize: number,
    query: string = ""
  ) => {
    try {
      ManageParkService.getParks(pageIndex, pageSize, query)
        .then((response) => {
          setParks(response.data.parks);
          setPageCount(response.data.pagination.pageCount);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchParks(0, 10);
  }, []);

  // Formulaire

  const onAddButtonClick = () => {
    setSelectedPark(null);
    setIsModalOpen(true);
  };

  const onEditButtonClick = (park: Park) => {
    setSelectedPark(park);
    setIsModalOpen(true);
  };

  const onZoneEditButtonClick = (park: Park) => {
    setSelectedPark(park);
    setIsZoneModalOpen(true);
  };

  // Formulaire
  const form = useForm<ManageParkFormType>({
    resolver: zodResolver(ManageParkFormSchema),
    defaultValues: {
      name: "",
      story: "",
      rates: [],
      localisation: {
        entrance: [0, 0],
        upperLeftBound: [0, 0],
        lowerRightBound: [0, 0],
      },
      medias: [],
      lands: [],
    },
  });

  useEffect(() => {
    if (selectedPark) {
      form.reset(selectedPark);
    }
  }, [selectedPark]);

  const onSubmit = (data: ManageParkFormType) => {
    console.log(data);
    console.log("Submit:", selectedPark);
  };

  return (
    <AppLayout>
      <Card>
        <CardHeader>
          <CardTitle>Gérer les parcs d'attractions</CardTitle>
          <CardDescription>
            Sur cette page, vous pouvez gérer tous les parcs d'attractions de
            Thrills World.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns(onEditButtonClick, onZoneEditButtonClick)}
            data={parks}
            pageCount={pageCount}
            onAddButtonClick={onAddButtonClick}
            onPageChange={(pageIndex, pageSize, query) => {
              fetchParks(pageIndex, pageSize, query);
            }}
          />
        </CardContent>
      </Card>
      <Dialog
        open={isModalOpen}
        onOpenChange={() => setIsModalOpen(!isModalOpen)}
      >
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>
                  {selectedPark ? "Modifier un parc" : "Ajouter un parc"}
                </DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="general">
                <TabsList className="w-full">
                  <TabsTrigger value="general">Général</TabsTrigger>
                  <TabsTrigger value="rates">Tarifs</TabsTrigger>
                  <TabsTrigger value="location">Localisation</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom du parc</FormLabel>
                        <FormControl>
                          <Input placeholder="Europa-Park Resort" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="story"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Histoire du parc</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Europa-Park Resort a été créé en..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                {/* <TabsContent value="rates" className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="price_validity_period"
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormLabel>Période de validité des tarifs</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="2024" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-between col-span-3 text-gray-400">
                    <IconArrowDown size={18} />
                    <IconArrowDown size={18} />
                    <IconArrowDown size={18} />
                  </div>
                  <FormField
                    control={form.control}
                    name="rate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tarif adulte</FormLabel>
                        <FormControl>
                          <Input placeholder="49,50" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rate_child"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tarif enfant</FormLabel>
                        <FormControl>
                          <Input placeholder="39,50" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rate_special"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tarif spécial</FormLabel>
                        <FormControl>
                          <Input placeholder="32,50" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="items"
                    render={() => (
                      <FormItem className="col-span-3">
                        <div className="mb-4">
                          <FormLabel className="text-base">
                            Offres & promotions
                          </FormLabel>
                          <FormDescription>
                            Sélectionnez tout ce qui s'applique pour cette
                            période.
                          </FormDescription>
                        </div>
                        <div>
                          <FormField
                            control={form.control}
                            name="items"
                            render={({ field }) => {
                              return (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 col-span-3 mb-1">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={(checked) => {
                                        field.onChange;
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    L'entrée du parc est gratuite
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                          <FormField
                            control={form.control}
                            name="items"
                            render={({ field }) => {
                              return (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 col-span-3 mb-1">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={(checked) => {
                                        field.onChange;
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Le parc propose souvent des réductions
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                          <FormField
                            control={form.control}
                            name="items"
                            render={({ field }) => {
                              return (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 col-span-3 mb-1">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={(checked) => {
                                        field.onChange;
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Le parc propose des réductions sur les
                                    achats anticipés
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        </div>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button size="sm">Ajouter ce tarif</Button>
                  {selectedPark && (
                    <Alert className="col-span-3">
                      <AlertTitle>Modifier des tarifs existants</AlertTitle>
                      <AlertDescription>
                        Pour modifier les tarifs existants, veuillez choisir une
                        période déjà encodée via le menu déroulant ci-dessous.
                      </AlertDescription>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Choisir une période" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="2020">2020</SelectItem>
                            <SelectItem value="2022">2022</SelectItem>
                            <SelectItem value="2023">2023</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </Alert>
                  )}
                </TabsContent> */}

                <TabsContent value="location">
                  <Alert>
                    <IconInfoCircle size={18} />
                    <AlertTitle>A propos de la localisation</AlertTitle>
                    <AlertDescription>
                      A des fins de précision et de facilité, les points de
                      localisation se définissent directement sur la carte
                      ci-dessous. Sélectionnez le point à replacer en cliquant
                      sur l'un des 3 boutons ci-dessous et puis cliquez
                      directement sur la carte pour le replacer.
                    </AlertDescription>
                  </Alert>
                  <div className="flex justify-start items-center gap-2 my-4 flex-wrap">
                    <Button variant="outline" size="sm">
                      Replacer l'entrée
                    </Button>
                    <Button variant="outline" size="sm">
                      Replacer la borne supérieure gauche
                    </Button>
                    <Button variant="outline" size="sm">
                      Replacer la borne inférieure droite
                    </Button>
                  </div>
                  <div className="w-full h-52">
                    <TWMap />
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button type="submit" size="sm">
                  Envoyer les informations
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {/* <Dialog
        open={isZoneModalOpen}
        onOpenChange={() => setIsZoneModalOpen(!isZoneModalOpen)}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Modifier les zones d'un parc</DialogTitle>
              </DialogHeader>
              <FormField
                control={form.control}
                name="zone_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ajouter une nouvelle zone</FormLabel>
                    <div className="flex items-center justify-between gap-2">
                      <FormControl>
                        <Input placeholder="Croatie" {...field} />
                      </FormControl>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <IconCheck size={14} /> Valider
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
              <Separator />
              <p className="font-semibold">Renommer une zone déjà existante</p>
              <ul className="flex flex-col gap-2">
                <li>
                  <div className="flex items-center justify-between gap-2">
                    <Input value="Grèce" />
                    <Button variant="outline">Renommer</Button>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between gap-2">
                    <Input value="France" />
                    <Button variant="outline">Renommer</Button>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between gap-2">
                    <Input value="Islande" />
                    <Button variant="outline">Renommer</Button>
                  </div>
                </li>
              </ul>
            </DialogContent>
          </form>
        </Form>
      </Dialog> */}
    </AppLayout>
  );
}
