"use client";

import AuthLayout from "@/app/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/logo";
import { useForm } from "react-hook-form";

export default function AuthForgotPasswordPage() {
  const form = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <AuthLayout>
      <Logo width={50} height={50} />
      <h1 className="text-2xl  mt-3 mb-1">Mot de passe oublié? 🫢</h1>
      <p className=" mb-6">
        Entrez votre e-mail pour recevoir un code à usage unique.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse e-mail</FormLabel>
                <FormControl>
                  <Input placeholder="jhone.doe@email.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Envoyer le code à usage unique</Button>
        </form>
      </Form>
    </AuthLayout>
  );
}
