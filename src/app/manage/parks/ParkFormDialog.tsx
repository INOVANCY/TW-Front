import TWMap from "@/components/ui/Map";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Park } from "@/types/db";
import { IconInfoCircle } from "@tabler/icons-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ManageParkService from "@/services/manage/ManageParkService";
import { LatLng, LatLngExpression, LatLngLiteral, LatLngTuple } from "leaflet";
import { set } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/ui/loader";
import { ParkSchema, ParkSchemaType } from "./schema";

interface ParkFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  parkData: Park | null;
}

export default function ParkFormDialog({
  isOpen,
  onClose,
  parkData,
}: ParkFormDialogProps) {
  const { toast } = useToast();
  // Loader
  const [isLoading, setIsLoading] = useState(false);
  // Map
  const [allowMovePoint, setAllowMovePoint] = useState(false);
  const [entrancePoint, setEntrancePoint] = useState<[number, number]>([0, 0]);

  const form = useForm<ParkSchemaType>({
    resolver: zodResolver(ParkSchema),
  });

  const onSubmit = (data: ParkSchemaType) => {
    setIsLoading(true);
    data.localisation = entrancePoint;
    if (parkData && parkData._id) {
      ManageParkService.updatePark(parkData._id, data)
        .then(() => {
          form.reset();
          toast({
            title: "Ah bah ça c'est génial!",
            description: "Les informations du parc ont été mises à jour.",
          });
          onClose();
        })
        .catch((error) => {
          console.error("Error while updating park", error);
          toast({
            title: "Oups!",
            description: "Une erreur s'est produite lors de la mise à jour.",
            variant: "destructive",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      ManageParkService.createPark(data)
        .then((response) => {
          console.log(response);
          form.reset();
          toast({
            title: "Trop bien!",
            description: "Le parc a été créé avec succès.",
          });
          onClose();
        })
        .catch((error) => {
          console.error("Error while creating park", error);
          toast({
            title: "Oups!",
            description: "Une erreur s'est produite lors de la création.",
            variant: "destructive",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    setAllowMovePoint(false);
    if (parkData) {
      form.reset(parkData);
      setEntrancePoint(parkData.localisation);
    } else {
      form.reset({
        name: "",
        story: "",
        rates: [],
        localisation: [0, 0],
        medias: [],
        lands: [],
      });
      setEntrancePoint([0, 0]);
    }
  }, [parkData]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>
                {parkData ? "Modifier un parc" : "Ajouter un parc"}
              </DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="general">
              <TabsList className="w-full">
                <TabsTrigger value="general">Général</TabsTrigger>
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
                    ci-dessous. Cliquez simplement sur le bouton ci-dessous pour
                    activer le déplacement, puis cliquez sur la carte pour
                    (re-)définir le point d'entrée du parc.
                  </AlertDescription>
                </Alert>
                <div className="flex justify-start items-center gap-2 my-4 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      setAllowMovePoint(!allowMovePoint);
                    }}
                  >
                    {allowMovePoint
                      ? "Désactiver le déplacement de l'entrée"
                      : "Activer le déplacement de l'entrée"}
                  </Button>
                </div>
                <TWMap
                  point={entrancePoint}
                  center={entrancePoint}
                  zoom={13}
                  allowMovePoint={allowMovePoint}
                  onPointEdit={setEntrancePoint}
                />
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button type="submit" size="sm" disabled={isLoading}>
                {isLoading && <Loader size={18} />} Envoyer les informations
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
