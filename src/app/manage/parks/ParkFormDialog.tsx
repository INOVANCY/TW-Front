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
                {parkData ? "Modifier " + parkData.name : "Ajouter un parc"}
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
                    className="w-[500px]"
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
