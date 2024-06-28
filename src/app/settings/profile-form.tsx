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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandSnapchat,
  IconBrandThreads,
  IconBrandTiktok,
  IconBrandX,
  IconBrandYoutube,
  IconCaretUpDown,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { ProfilePictureCropper } from "./profile-picture";
import { useAuth } from "@/providers/AuthProvider";
import { cn, getProfilePicture } from "@/lib/utils";
import { profileFormSchema, profileFormType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ProfileService from "@/services/ProfileService";
import SearchService from "@/services/SearchService";
import { useDebounce } from "use-debounce";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/ui/loader";
import AuthService from "@/services/AuthService";

interface Social {
  name:
    | "facebook"
    | "twitter"
    | "threads"
    | "instagram"
    | "youtube"
    | "snapchat"
    | "tiktok";
  icon: React.ReactNode;
  color: string;
}
interface ParkResult {
  _id: string;
  name: string;
}
const socials: Social[] = [
  {
    name: "facebook",
    icon: <IconBrandFacebook size={20} />,
    color: "bg-blue-700",
  },
  {
    name: "twitter",
    icon: <IconBrandX size={20} />,
    color: "bg-blue-400",
  },
  {
    name: "threads",
    icon: <IconBrandThreads size={20} />,
    color: "bg-slate-800",
  },
  {
    name: "instagram",
    icon: <IconBrandInstagram size={20} />,
    color: "bg-pink-500",
  },
  {
    name: "youtube",
    icon: <IconBrandYoutube size={20} />,
    color: "bg-red-600",
  },
  {
    name: "snapchat",
    icon: <IconBrandSnapchat size={20} />,
    color: "bg-yellow-500",
  },
  {
    name: "tiktok",
    icon: <IconBrandTiktok size={20} />,
    color: "bg-purple-800",
  },
];

export function ProfileForm() {
  const { user, setUser } = useAuth();
  const [parkSearchQuery, setParkSearchQuery] = useState<string>("");
  const [debouncedParkSearchQuery, setDebouncedParkSearchQuery] = useDebounce(
    parkSearchQuery,
    500
  );
  const [parkSearchResults, setParkSearchResults] = useState<ParkResult[]>([]);
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
    AuthService.checkUsername(data.username, data._id)
      .then((response) => {
        ProfileService.updateProfile(data)
          .then((response) => {
            toast({
              title: "On ne peut pas arrêter le progrès !",
              description: "Votre profil a été mis à jour avec succès.",
            });
          })
          .catch((error) => {
            console.error(error);
            toast({
              title: "Oups ! Quelque chose s'est mal passé.",
              description: "Veuillez réessayer plus tard.",
              variant: "destructive",
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error(error);
        form.setError("username", {
          type: "manual",
          message: "Oups! Ce nom d'utilisateur est déjà pris.",
        });
        setIsLoading(false);
      });
  };

  // Load initial data
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

  // Search parks
  useEffect(() => {
    if (parkSearchQuery.length > 3) {
      SearchService.searchParks(debouncedParkSearchQuery)
        .then((response) => {
          setParkSearchResults(response.data.results);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [debouncedParkSearchQuery]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Label htmlFor="profilepicture">Photo de profil</Label>
        <div className="flex items-center gap-4">
          <img
            src={getProfilePicture(user?.profilePicture)}
            alt="Profile picture"
            className="rounded-md"
            width={100}
            height={100}
          />
          <ProfilePictureCropper />
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom d&apos;utilisateur</FormLabel>
              <FormControl>
                <Input placeholder="jhon.doe" {...field} />
              </FormControl>
              <FormDescription>
                C&apos;est votre @ Thrills World. Vous ne pouvez le changer
                qu&apos;une fois par mois.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biographie</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="md:grid grid-cols-2 gap-x-4">
          <FormField
            control={form.control}
            name="favoritePark"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Parc préféré</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        Sélectionnez votre parc préféré
                        <IconCaretUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command shouldFilter={false}>
                      <CommandInput
                        value={parkSearchQuery}
                        onValueChange={setParkSearchQuery}
                        placeholder="Rechercher un parc..."
                      />
                      <CommandList>
                        <CommandEmpty>Aucun parc trouvé.</CommandEmpty>
                        <CommandGroup>
                          {parkSearchResults.map((park) => (
                            <CommandItem
                              value={park._id}
                              key={park._id}
                              onSelect={() => {
                                form.setValue("favoritePark", park._id);
                              }}
                            >
                              <IconCheck
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  park._id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {park.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="homePark"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-4 md:mt-0">
                <FormLabel>Parc maison (home park)</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        Sélectionnez votre parc maison
                        <IconCaretUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command shouldFilter={false}>
                      <CommandInput
                        value={parkSearchQuery}
                        onValueChange={setParkSearchQuery}
                        placeholder="Rechercher un parc..."
                      />
                      <CommandList>
                        <CommandEmpty>Aucun parc trouvé.</CommandEmpty>
                        <CommandGroup>
                          {parkSearchResults.map((park) => (
                            <CommandItem
                              value={park._id}
                              key={park._id}
                              onSelect={() => {
                                form.setValue("homePark", park._id);
                              }}
                            >
                              <IconCheck
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  park._id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {park.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-muted-foreground text-sm col-span-2 mt-1.5">
            Ne sélectionnez un parc que si vous souhaitez changer.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Label className="col-span-2">Vos réseaux sociaux</Label>
          {socials.map((social) => (
            <div key={social.name} className="flex items-center gap-2">
              <span className={`p-1.5 text-white rounded-full ${social.color}`}>
                {social.icon}
              </span>
              <FormField
                control={form.control}
                name={`links.${social.name}`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder={`Votre nom d'utilisateur ${social.name}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader size={18} />}Mettre à jour le profil
        </Button>
      </form>
    </Form>
  );
}
