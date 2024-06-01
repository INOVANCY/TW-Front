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
import { FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import {
  firstStepFormSchema,
  firstStepFormType,
  secondStepFormSchema,
  secondStepFormType,
} from "./schema";
import { set } from "date-fns";
import Loader from "@/components/ui/loader";
import { useRouter } from "next/navigation";

export default function AuthRegisterPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState({
    firstStep: false,
    secondStep: false,
  });

  const router = useRouter();

  // First step form
  const firstStepForm = useForm<firstStepFormType>({
    resolver: zodResolver(firstStepFormSchema),
    defaultValues: {
      email: "",
      terms: false,
    },
  });

  const onSubmitFirstStep = (data: firstStepFormType) => {
    setIsSubmitting({ ...isSubmitting, firstStep: true });
    console.log(data);
    if (data.terms === true) {
      AuthService.checkEmail(data.email)
        .then((response) => {
          setIsModalOpen(true);
          setEmail(data.email);
        })
        .catch((error) => {
          console.error(error);
          firstStepForm.setError("email", {
            type: "manual",
            message: "Oups! Cet email est déjà utilisé.",
          });
        })
        .finally(() => setIsSubmitting({ ...isSubmitting, firstStep: false }));
    }
  };

  // Second step form

  const secondStepForm = useForm<secondStepFormType>({
    resolver: zodResolver(secondStepFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      birthday: new Date().toISOString().split("T")[0],
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmitSecondStep = (data: secondStepFormType) => {
    setIsSubmitting({ ...isSubmitting, secondStep: true });
    AuthService.checkUsername(data.username)
      .then((response) => {
        const completeData = { ...data, email };
        AuthService.register(completeData)
          .then((response) => {
            secondStepForm.reset();
            firstStepForm.reset();
            setIsModalOpen(false);
            localStorage.setItem("token", response.data.token);
            toast({
              title: "Félicitations!",
              description: "Votre compte a été créé avec succès.",
            });
            router.push("/");
          })
          .catch((error) => {
            console.error(error);
            toast({
              variant: "destructive",
              title: "Oups!",
              description:
                "Une erreur s'est produite lors de la création de votre compte.",
            });
          })
          .finally(() =>
            setIsSubmitting({ ...isSubmitting, secondStep: false })
          );
      })
      .catch((error) => {
        secondStepForm.setError("username", {
          type: "manual",
          message: "Oups! Ce nom d'utilisateur est déjà pris.",
        });
        setIsSubmitting({ ...isSubmitting, secondStep: false });
      });
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
              <FormItem>
                <div className="flex flex-row items-center gap-3 py-2">
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
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center">
            <Button type="submit" disabled={isSubmitting.firstStep}>
              {isSubmitting.firstStep && <Loader size={18} />} S'enregistrer
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
        Déjà un compte Thrills ?
        <Link href="/auth/login" className="ms-1 font-medium text-red-600">
          Se connecter
        </Link>
      </span>
      <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
        <DialogContent>
          <Form {...secondStepForm}>
            <form
              onSubmit={secondStepForm.handleSubmit(onSubmitSecondStep)}
              className="space-y-4"
            >
              <DialogHeader>
                <DialogTitle>Finalisez votre inscription 🤩</DialogTitle>
                <DialogDescription>
                  Plus que quelques étapes pour rejoindre la communauté Thrills.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={secondStepForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={secondStepForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
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
                      <FormMessage />
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
                      <FormMessage />
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
                      <FormMessage />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting.secondStep}>
                  {isSubmitting.secondStep && <Loader size={18} />} Finaliser
                  mon inscription
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AuthLayout>
  );
}
