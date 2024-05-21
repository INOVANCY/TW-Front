import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  IconBrandFacebook,
  IconCaretUpDown,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import { useForm } from "react-hook-form";

export function ProfileForm() {
  const form = useForm();
  function onSubmit() {
    console.log("submit");
  }

  const languages = [
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
  ] as const;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center gap-4">
          <Image
            src="/dev/pdp.jpeg"
            alt="Profile picture"
            className="rounded-md"
            width={100}
            height={100}
          />
          <FormField
            control={form.control}
            name="profilePicture"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Photo de profil</FormLabel>
                <FormControl>
                  <Input type="file" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom d'utilisateur</FormLabel>
              <FormControl>
                <Input placeholder="gaspard.dlx" {...field} />
              </FormControl>
              <FormDescription>
                C'est votre @ Thrills World. Vous ne pouvez le changer qu'une
                fois par mois.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="biography"
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
        <div className="grid grid-cols-2 gap-x-4">
          <FormField
            control={form.control}
            name="favoritePark"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Parc préféré</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger>
                      <SelectValue>
                        {languages.find((l) => l.value === field.value)?.label}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <div className="p-2">
                        <Input placeholder="Recherche..." />
                      </div>
                      <SelectGroup>
                        {languages.map((language) => (
                          <SelectItem
                            key={language.value}
                            value={language.value}
                          >
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
            name="homePark"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Parc maison</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger>
                      <SelectValue>
                        {languages.find((l) => l.value === field.value)?.label}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <div className="p-2">
                        <Input placeholder="Recherche..." />
                      </div>
                      <SelectGroup>
                        {languages.map((language) => (
                          <SelectItem
                            key={language.value}
                            value={language.value}
                          >
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
        </div>
        <FormField
          control={form.control}
          name="socials"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Réseaux sociaux</FormLabel>
              <FormControl>
                <div className="flex items-center gap-4">
                  <Select>
                    <SelectTrigger className="w-1/3">
                      <SelectValue placeholder="Facebook" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="threads">Threads</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="snapchat">Snapchat</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Input placeholder="@gaspard.dlx" {...field} />
                  <IconX />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Mettre à jour le profil</Button>
      </form>
    </Form>
  );
}
