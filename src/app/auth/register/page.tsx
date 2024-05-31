"use client";

import AuthLayout from "@/app/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/logo";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import AuthService from "@/services/auth/AuthService";
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
  const { toast } = useToast();
  // First step form
  const firstStepForm = useForm({
    defaultValues: {
      email: "",
      terms: false,
    },
  });
  const onSubmitFirstStep = (data: any) => {
    console.log(data);
    if (data.terms === true) {
      AuthService.checkEmail(data.email)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
          toast({
            variant: "destructive",
            title: "Aïe!",
            description: "Cet email est déjà utilisé par l'un de nos membres.",
          });
        });
    }
  };

  // Second step form
  const secondStepForm = useForm();
  const onSubmitSecondStep = (data: any) => {
    console.log(data);
  };

  // Second step modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AuthLayout>
      <Logo width={50} height={50} />
      <h1 className="text-2xl  mt-3 mb-1">
        Bienvenue, cher #ThrillsLover ! 👋🏻
      </h1>
      <p className="">Créez-vous un compte et commencez l'aventure.</p>
      <Separator className="my-4" />
      <Form {...firstStepForm}>
        <form
          onSubmit={firstStepForm.handleSubmit(onSubmitFirstStep)}
          className="space-y-4"
        >
          <FormField
            control={firstStepForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="jhon.doe@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={firstStepForm.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-3 py-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
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
                  </Link>
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

      <span className="">
        Déjà un compte Thrills ?
        <Link href="/auth/login" className="ms-1 font-medium text-red-600">
          Se connecter
        </Link>
      </span>
      <Dialog open={isModalOpen}>
        <Form {...secondStepForm}>
          <form onSubmit={secondStepForm.handleSubmit(onSubmitSecondStep)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Finalisez votre inscription 🤩</DialogTitle>
                <DialogDescription>
                  Plus que quelques étapes pour rejoindre la communauté Thrills.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={secondStepForm.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={secondStepForm.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={secondStepForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom d'utilisateur</FormLabel>
                      <FormControl>
                        <Input placeholder="jhon.doe" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={secondStepForm.control}
                  name="birthday"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date d'anniversaire</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={secondStepForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={secondStepForm.control}
                  name="password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmer le mot de passe</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button type="submit">Finaliser mon inscription</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Form>
      </Dialog>
    </AuthLayout>
  );
}
