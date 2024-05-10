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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/logo";
import { Separator } from "@/components/ui/separator";
import {
  IconBrandApple,
  IconBrandFacebook,
  IconBrandGoogle,
  IconBrandTwitter,
} from "@tabler/icons-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function AuthLoginPage() {
  const form = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <AuthLayout>
      <Logo width={50} height={50} />
      <h1 className="text-2xl text-slate-800 mt-3 mb-1">Enfin de retour! 👋🏻</h1>
      <p className="text-slate-800">
        Connectez-vous à votre compte et (re-)commencez l'aventure.
      </p>
      <Separator className="my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom d'utilisateur</FormLabel>
                <FormControl>
                  <Input placeholder="jhone_doe" {...field} />
                </FormControl>
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
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="remember_me"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-3 py-2">
                <FormControl>
                  <Checkbox />
                </FormControl>
                <FormLabel className="!m-0">Se souvenir de moi</FormLabel>
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center">
            <Button type="submit">Se connecter</Button>
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
      <span className="text-slate-800">
        Nouveau sur Thrills ?
        <Link href="/auth/register" className="ms-1 font-medium text-red-600">
          Créer un compte
        </Link>
      </span>
    </AuthLayout>
  );
}
