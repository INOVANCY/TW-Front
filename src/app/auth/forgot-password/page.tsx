"use client";

import AuthLayout from "@/app/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sendOtpCodeFormSchema, sendOtpCodeFormType } from "./schema";
import AuthService from "@/services/auth/AuthService";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "@/components/ui/loader";

export default function AuthForgotPasswordPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<sendOtpCodeFormType>({
    resolver: zodResolver(sendOtpCodeFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: sendOtpCodeFormType) => {
    setIsSubmitting(true);
    AuthService.sendForgotPasswordOtpCode(data.email)
      .then((response) => {
        form.reset();
        toast({
          title: "Code envoyé! 📬",
          description:
            "Si cette adresse e-mail est valide, tu vas recevoir un code à usage unique dans quelques instants.",
        });
        router.push("/auth/forgot-password/code");
      })
      .catch((error) => {
        toast({
          title: "Oh non 😢",
          description: "Une erreur s'est produite. Réessaye!",
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
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader size={18} />}Envoyer le code à usage unique
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
}
