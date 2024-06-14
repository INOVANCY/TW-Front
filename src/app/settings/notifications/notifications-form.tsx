"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { profileFormSchema, profileFormType } from "../schema";
import ProfileService from "@/services/ProfileService";
import Loader from "@/components/ui/loader";

interface notificationsList {
  label: string;
  value:
    | "notifications.rankings"
    | "notifications.news"
    | "notifications.marketplace"
    | "notifications.account";
  description: string;
}

export function NotificationsForm() {
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
    },
  });

  const onSubmit = (data: profileFormType) => {
    setIsLoading(true);
    ProfileService.updateProfile(data)
      .then(() => {
        toast({
          title: "On ne perd pas de temps !",
          description: "Vos préférences ont été mises à jour avec succès.",
        });
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Ça sent le brûlé...",
          description:
            "Une erreur est survenue lors de la mise à jour de vos préférences.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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

  const notifications: notificationsList[] = [
    {
      label: "Nouveaux classements",
      value: "notifications.rankings",
      description:
        "Recevez un email lors de la mise à jour des classements mondiaux (1x/mois).",
    },
    {
      label: "Actualités",
      value: "notifications.news",
      description:
        "Recevez des e-mails concernant les dernières actualités importantes.",
    },
    {
      label: "Articles",
      value: "notifications.marketplace",
      description:
        "Recevez des e-mails concernant les articles populaires et les promotions.",
    },
    {
      label: "Sécurité & compte",
      value: "notifications.account",
      description:
        "Recevez des e-mails concernant la sécurité de votre compte et les mises à jour importantes.",
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {notifications.map((notification, index) => (
          <FormField
            key={index}
            control={form.control}
            name={notification.value}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    {notification.label}
                  </FormLabel>
                  <FormDescription>{notification.description}</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader size={18} />}Mettre à jour les préférences
        </Button>
      </form>
    </Form>
  );
}
