"use client";

import AuthLayout from "@/app/layouts/AuthLayout";
import TextDivider from "@/components/ui/TextDivider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import TWButton from "@/components/ui/forms/Button";
import TWCheckbox from "@/components/ui/forms/Checkbox";
import TWInput from "@/components/ui/forms/Input";
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

export default function AuthRegisterPage() {
  const form = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <AuthLayout>
      <Logo width={50} height={50} />
      <h1 className="text-2xl text-slate-800 mt-3 mb-1">
        Bienvenue, cher #ThrillsLover ! 👋🏻
      </h1>
      <p className="text-slate-800">
        Créez-vous un compte et commencez l'aventure.
      </p>
      <Separator className="my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="jhon.doe@email.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-x-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmer le mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="remember_me"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-3 py-2">
                <FormControl>
                  <Checkbox />
                </FormControl>
                <FormLabel className="!m-0">
                  J'accepte les
                  <Link
                    href="/terms"
                    className="text-red-600 underline-offset-2 hover:underline mx-1"
                  >
                    conditions d'utilisation
                  </Link>
                  et la
                  <Link
                    href="/privacy"
                    className="text-red-600 underline-offset-2 hover:underline mx-1"
                  >
                    politique de confidentialité
                  </Link>{" "}
                </FormLabel>
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center">
            <Button type="submit">S'enregistrer</Button>
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
        Déjà un compte Thrills ?
        <Link href="/auth/login" className="ms-1 font-medium text-red-600">
          Se connecter
        </Link>
      </span>
    </AuthLayout>
  );
}
