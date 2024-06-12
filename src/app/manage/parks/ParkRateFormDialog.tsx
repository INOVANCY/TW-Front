import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Park } from "@/types/db";
import { useForm } from "react-hook-form";
import { RateSchema, RateSchemaType } from "./schema";
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
import { Checkbox } from "@/components/ui/checkbox";

interface ParkRateFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  parkData: Park;
}

export default function ParkRateFormDialog({
  isOpen,
  onClose,
  parkData,
}: ParkRateFormDialogProps) {
  const [selectedRate, setSelectedRate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rates, setRates] = useState(parkData.rates);
  const { toast } = useToast();

  useEffect(() => {
    console.log(selectedRate);
    if (selectedRate) {
      console.log(selectedRate);
      const rate = rates.find((rate) => rate._id === selectedRate);
      console.log(rate);
      if (rate) {
        form.reset({
          year: rate.year,
          adultPrice: rate.adultPrice,
          childPrice: rate.childPrice,
          specialPrice: rate.specialPrice,
          isEntranceFree: rate.isEntranceFree,
          offersDiscounts: rate.offersDiscounts,
          offersEarlyBird: rate.offersEarlyBird,
        });
      }
    } else {
      form.reset({
        year: 0,
        adultPrice: 0,
        childPrice: 0,
        specialPrice: 0,
        isEntranceFree: false,
        offersDiscounts: false,
        offersEarlyBird: false,
      });
    }
  }, [selectedRate]);

  // Form
  const form = useForm<RateSchemaType>({
    resolver: zodResolver(RateSchema),
  });

  const onSubmit = (data: RateSchemaType) => {
    console.log(data);
    if (parkData._id) {
      setIsLoading(true);
      if (selectedRate) {
        ManageParkService.updateRate(parkData._id, selectedRate, data)
          .then((response) => {
            form.reset();
            fetchRates();
            setSelectedRate(null);
            toast({
              title: "Youpi! 🎉",
              description: "Le tarif a été modifiée avec succès",
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
        ManageParkService.createRate(parkData._id, data)
          .then((response) => {
            form.reset();
            fetchRates();
            toast({
              title: "Trop trop bien! 🎉",
              description: "Le tarif a été ajoutée avec succès",
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

  function fetchRates() {
    if (parkData._id) {
      ManageParkService.fetchRates(parkData._id)
        .then((response) => {
          console.log(response.data);
          setRates(response.data.rates);
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
              <DialogTitle>Modifier les tarifs de {parkData.name}</DialogTitle>
            </DialogHeader>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="to_edit">Sélectionner un tarif à modifier</Label>
              <Select
                value={selectedRate ? selectedRate : ""}
                onValueChange={(value) => setSelectedRate(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un tarif" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {rates.map((rate) => (
                      <SelectItem key={rate._id} value={rate._id}>
                        {rate.year}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel>Année</FormLabel>
                    <FormControl>
                      <Input placeholder="2024" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="adultPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix adulte</FormLabel>
                    <FormControl>
                      <Input placeholder="25" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="childPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix enfant</FormLabel>
                    <FormControl>
                      <Input placeholder="15" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specialPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix spécial</FormLabel>
                    <FormControl>
                      <Input placeholder="10" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isEntranceFree"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>L'entrée est/était gratuite</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="offersDiscounts"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Réductions régulières</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="offersEarlyBird"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Offres d'achat anticipé</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              {selectedRate && (
                <Button variant="outline" onClick={() => setSelectedRate(null)}>
                  Annuler la modification
                </Button>
              )}
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader size={18} />} Valider{" "}
                {selectedRate ? "la modification" : "l'ajout"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
