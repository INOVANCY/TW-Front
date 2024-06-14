"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { profileFormSchema, profileFormType } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ProfileService from "@/services/ProfileService";
import Loader from "@/components/ui/loader";
import { useTheme } from "next-themes";

export function AppearanceForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

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
    if (theme !== data.preferredTheme) {
      setTheme(data.preferredTheme);
    }
    setIsLoading(true);
    ProfileService.updateProfile(data)
      .then(() => {
        toast({
          title: "On dirait que tout s'est bien passé !",
          description: "Votre profil a été mis à jour avec succès.",
        });
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Rooh, raté !",
          description:
            "Une erreur s'est produite lors de la mise à jour de votre profil.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const languages = [{ label: "Français", value: "fr" }];

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
        console.log(form.getValues());
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="preferredLanguage"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Langage de l'application</FormLabel>
              <FormControl>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue>
                      {
                        languages.find(
                          (language) => language.value === field.value
                        )?.label
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {languages.map((language) => (
                        <SelectItem key={language.value} value={language.value}>
                          {language.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preferredTheme"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Thème</FormLabel>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem
                        value="system"
                        checked={field.value === "system"}
                        className="sr-only"
                      />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      Système
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem
                        value="light"
                        checked={field.value === "light"}
                        className="sr-only"
                      />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      Clair
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem
                        value="dark"
                        className="sr-only"
                        checked={field.value === "dark"}
                      />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                      <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                        <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      Sombre
                    </span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader />}Mettre à jour l'apparence
        </Button>
      </form>
    </Form>
  );
}
