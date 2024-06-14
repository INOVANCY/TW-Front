"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { IconCalendar } from "@tabler/icons-react";
import {
  addDays,
  addYears,
  format,
  setMonth,
  setYear,
  subYears,
} from "date-fns";
import { parse } from "path";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { profileFormSchema, profileFormType } from "../schema";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import ProfileService from "@/services/ProfileService";
import AuthService from "@/services/AuthService";
import Loader from "@/components/ui/loader";

export function AccountForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  // Form
  const form = useForm<profileFormType>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      _id: "",
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      birthday: new Date().toISOString().split("T")[0],
      bio: "",
      favoritePark: "",
      homePark: "",
      links: {
        facebook: "",
        twitter: "",
        threads: "",
        instagram: "",
        youtube: "",
        snapchat: "",
        tiktok: "",
      },
      preferredLanguage: "fr",
      preferredTheme: "system",
      notifications: {
        rankings: false,
        news: false,
        marketplace: false,
        account: false,
      },
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = (data: profileFormType) => {
    setIsLoading(true);
    AuthService.checkEmail(data.email, data._id)
      .then((response) => {
        ProfileService.updateProfile(data)
          .then((response) => {
            toast({
              title: "On y est !",
              description: "Votre compte a été mis à jour avec succès.",
            });
            form.setValue("password", "");
            form.setValue("password_confirmation", "");
          })
          .catch((error) => {
            toast({
              title: "Alors ça, c'est embêtant...",
              description: "Une erreur s'est produite lors de la mise à jour.",
              variant: "destructive",
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((error) => {
        form.setError("email", {
          type: "manual",
          message: "Cette adresse e-mail est déjà utilisée.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [birthDate, setBirthDate] = React.useState<Date>(new Date());

  // Years array ()
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 90 }, (_, i) => currentYear - i - 10);

  useEffect(() => {
    ProfileService.getProfile()
      .then((response) => {
        const formattedData = {
          ...response.data.user,
          birthday: new Date(response.data.user.birthday)
            .toISOString()
            .split("T")[0],
        };
        form.reset(formattedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="md:grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Jhon" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="mt-4 md:mt-0">
                <FormLabel>Nom de famille</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-2 mt-4 md:mt-0">
                <FormLabel>Adresse e-mail</FormLabel>
                <FormControl>
                  <Input placeholder="jhon.doe@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="flex flex-col col-span-2 mt-4 md:mt-0">
                <FormLabel>Date de naissance</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Choisissez une date</span>
                        )}
                        <IconCalendar className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2" align="start">
                    <div className="grid grid-cols-2 gap-x-2">
                      <Select
                        onValueChange={(value) =>
                          setBirthDate(setYear(birthDate, parseInt(value)))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Année" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {years.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        onValueChange={(value) =>
                          setBirthDate(setMonth(birthDate, parseInt(value)))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Mois" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="0">Janvier</SelectItem>
                          <SelectItem value="1">Février</SelectItem>
                          <SelectItem value="2">Mars</SelectItem>
                          <SelectItem value="3">Avril</SelectItem>
                          <SelectItem value="4">Mai</SelectItem>
                          <SelectItem value="5">Juin</SelectItem>
                          <SelectItem value="6">Juillet</SelectItem>
                          <SelectItem value="7">Août</SelectItem>
                          <SelectItem value="8">Septembre</SelectItem>
                          <SelectItem value="9">Octobre</SelectItem>
                          <SelectItem value="10">Novembre</SelectItem>
                          <SelectItem value="11">Décembre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        if (date) {
                          const timezoneOffset =
                            date.getTimezoneOffset() * 60000;
                          const adjustedDate = new Date(
                            date.getTime() - timezoneOffset
                          );
                          const dateString = adjustedDate
                            .toISOString()
                            .split("T")[0];
                          field.onChange(dateString);
                        }
                      }}
                      month={birthDate}
                      onMonthChange={setBirthDate}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Votre date de naissance ne sera pas affichée publiquement.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-4 md:mt-0">
                <FormLabel>Nouveau mot de passe</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem className="mt-4 md:mt-0">
                <FormLabel>Répéter le nouveau mot de passe</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader size={18} />}Mettre à jour le compte
        </Button>
      </form>
    </Form>
  );
}
