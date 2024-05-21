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
import { useForm } from "react-hook-form";

export function NotificationsForm() {
  const form = useForm();
  function onSubmit() {
    console.log("submit");
  }

  const notifications = [
    {
      label: "Nouveaux classements",
      value: "communication_emails",
      description:
        "Recevez un email lors de la mise à jour des classements mondiaux (1x/mois).",
    },
    {
      label: "Actualités",
      value: "communication_news",
      description:
        "Recevez des e-mails concernant les dernières actualités importantes.",
    },
    {
      label: "Articles",
      value: "communication_shop",
      description:
        "Recevez des e-mails concernant les articles populaires et les promotions.",
    },
    {
      label: "Sécurité & compte",
      value: "communication_security",
      description:
        "Recevez des e-mails concernant la sécurité de votre compte et les mises à jour importantes.",
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {notifications.map((notification) => (
          <FormField
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
        <Button type="submit">Mettre à jour les préférences</Button>
      </form>
    </Form>
  );
}
