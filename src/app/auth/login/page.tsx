"use client";

import AuthLayout from "@/app/layouts/AuthLayout";
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
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/logo";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconBrandApple,
  IconBrandFacebook,
  IconBrandGoogle,
  IconBrandTwitter,
} from "@tabler/icons-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginFormSchema, loginFormType } from "./schema";
import AuthService from "@/services/auth/AuthService";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loader";

export default function AuthLoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<loginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: loginFormType) => {
    setIsSubmitting(true);
    AuthService.login(data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        form.reset();
        toast({
          title: "Hourra! 🎉",
          description: "Tu es maintenant connecté. Bon retour!",
        });
        router.push("/");
      })
      .catch((error) => {
        toast({
          title: "Oops! 😢",
          description:
            "Tes informations d'identification semblent incorrectes. Réessaye!",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <AuthLayout>
      <Logo width={50} height={50} />
      <h1 className="text-2xl  mt-3 mb-1">Enfin de retour! 👋🏻</h1>
      <p className="">
        Connectez-vous à votre compte et (re-)commencez l'aventure.
      </p>
      <Separator className="my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse e-mail</FormLabel>
                <FormControl>
                  <Input placeholder="jhone_doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Mot de passe</FormLabel>
                  <Link
                    href="/auth/forgot-password"
                    className="text-red-600 text-xs"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-center gap-3 py-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="!m-0">Se souvenir de moi</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader size={18} />}Se connecter
            </Button>
            <div className="flex gap-4 items-center">
              <IconBrandFacebook size={20} className="text-blue-500" />
              <IconBrandGoogle size={20} className="text-red-500" />
              <IconBrandTwitter size={20} className="text-blue-400" />
              <IconBrandApple size={20} className="text-black" />
            </div>
          </div>
        </form>
      </Form>
      <Separator className="my-4" />
      <span className="">
        Nouveau sur Thrills ?
        <Link href="/auth/register" className="ms-1 font-medium text-red-600">
          Créer un compte
        </Link>
      </span>
    </AuthLayout>
  );
}
