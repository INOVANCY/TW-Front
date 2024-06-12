import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Park } from "@/types/db";
import { useForm } from "react-hook-form";
import { LandSchema, LandSchemaType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import ManageParkService from "@/services/manage/ManageParkService";
import { useToast } from "@/components/ui/use-toast";

interface ParkLandFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  parkData: Park;
}

export default function ParkLandFormDialog({
  isOpen,
  onClose,
  parkData,
}: ParkLandFormDialogProps) {
  const [selectedLand, setSelectedLand] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lands, setLands] = useState(parkData.lands);
  const { toast } = useToast();

  useEffect(() => {
    console.log(selectedLand);
    if (selectedLand) {
      console.log(selectedLand);
      const land = lands.find((land) => land._id === selectedLand);
      console.log(land);
      if (land) {
        form.reset({
          name: land.name,
        });
      }
    } else {
      form.reset({
        name: "",
      });
    }
  }, [selectedLand]);
  // Form
  const form = useForm<LandSchemaType>({
    resolver: zodResolver(LandSchema),
  });

  const onSubmit = (data: LandSchemaType) => {
    console.log(data);
    if (parkData._id) {
      setIsLoading(true);
      if (selectedLand) {
        ManageParkService.updateLand(parkData._id, selectedLand, data)
          .then((response) => {
            form.reset();
            fetchLands();
            setSelectedLand(null);
            toast({
              title: "Youpi! 🎉",
              description: "La zone a été modifiée avec succès",
            });
          })
          .catch((error) => {
            console.error(error);
            toast({
              title: "Pffff! 😔",
              description: "Une erreur est survenue",
              variant: "destructive",
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        ManageParkService.createLand(parkData._id, data)
          .then((response) => {
            form.reset();
            fetchLands();
            toast({
              title: "Trop trop bien! 🎉",
              description: "La zone a été ajoutée avec succès",
            });
          })
          .catch((error) => {
            console.error(error);
            toast({
              title: "Oh zuutttt! 😔",
              description: "Une erreur est survenue",
              variant: "destructive",
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  };

  function fetchLands() {
    if (parkData._id) {
      ManageParkService.fetchLands(parkData._id)
        .then((response) => {
          console.log(response.data);
          setLands(response.data.lands);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Modifier les zones de {parkData.name}</DialogTitle>
            </DialogHeader>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="to_edit">Sélectionner une zone à modifier</Label>
              <Select
                value={selectedLand ? selectedLand : ""}
                onValueChange={(value) => setSelectedLand(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {lands.map((land) => (
                      <SelectItem key={land._id} value={land._id}>
                        {land.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Separator className="my-4" />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {selectedLand
                      ? "Modifier le nom d'une zone"
                      : "Nom de la zone à ajouter"}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Croatie" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              {selectedLand && (
                <Button variant="outline" onClick={() => setSelectedLand(null)}>
                  Annuler la modification
                </Button>
              )}
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader size={18} />} Valider{" "}
                {selectedLand ? "la modification" : "l'ajout"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
