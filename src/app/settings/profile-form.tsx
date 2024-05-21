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
import { IconBrandFacebook, IconX } from "@tabler/icons-react";
import { useForm } from "react-hook-form";

export function ProfileForm() {
  const form = useForm();
  function onSubmit() {
    console.log("submit");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          name="profilePicture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photo de profil</FormLabel>
              <FormControl>
                <Input type="file" {...field} />
              </FormControl>
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
