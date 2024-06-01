"use client";

import AuthLayout from "@/app/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Logo from "@/components/ui/logo";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  checkOtpCodeFormSchema,
  checkOtpCodeFormType,
  resetPasswordFormSchema,
  resetPasswordFormType,
} from "./schema";
import Loader from "@/components/ui/loader";
import AuthService from "@/services/AuthService";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function AuthForgotPasswordCodePage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState({
    checkCode: false,
    resetPassword: false,
  });
  const { toast } = useToast();
  const router = useRouter();

  const otpForm = useForm<checkOtpCodeFormType>({
    resolver: zodResolver(checkOtpCodeFormSchema),
    defaultValues: {
      code: "",
    },
  });

  const passwordForm = useForm<resetPasswordFormType>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmitCheckCode = (data: checkOtpCodeFormType) => {
    setIsSubmitting({ ...isSubmitting, checkCode: true });
    AuthService.checkForgotPasswordOtpCode(data.code)
      .then((response) => {
        setUserId(response.data.id);
        setIsModalOpen(true);
      })
      .catch(() => {
        toast({
          title: "Oh non 😢",
          description: "Le code est incorrect ou expiré. Réessaye!",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsSubmitting({ ...isSubmitting, checkCode: false });
        otpForm.reset();
      });
  };

  const onSubmitResetPassword = (data: resetPasswordFormType) => {
    setIsSubmitting({ ...isSubmitting, resetPassword: true });
    const completeData = { ...data, id: userId };
    AuthService.resetPassword(completeData)
      .then(() => {
        setIsModalOpen(false);
        toast({
          title: "Mot de passe modifié! 🎉",
          description:
            "Ton mot de passe a été modifié avec succès. Tu peux maintenant te connecter avec ton nouveau mot de passe.",
        });
        router.push("/auth/login");
      })
      .catch(() => {
        toast({
          title: "Oh non 😢",
          description: "Une erreur s'est produite. Réessaye!",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsSubmitting({ ...isSubmitting, resetPassword: false });
        passwordForm.reset();
      });
  };

  return (
    <AuthLayout>
      <Logo width={50} height={50} />
      <h1 className="text-2xl  mt-3 mb-1">
        Entrez le code que vous avez reçu. 💡
      </h1>
      <p className=" mb-6">
        N'oubliez pas de vérifier votre dossier indésirable.
      </p>
      <Form {...otpForm}>
        <form
          onSubmit={otpForm.handleSubmit(onSubmitCheckCode)}
          className="space-y-4"
        >
          <FormField
            control={otpForm.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code à usage unique</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting.checkCode}>
            {isSubmitting.checkCode && <Loader />}Valider le code
          </Button>
        </form>
      </Form>
      <Dialog open={isModalOpen}>
        <DialogContent>
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(onSubmitResetPassword)}
              className="space-y-4"
            >
              <DialogHeader>
                <DialogTitle>Yes, we did it! 🙂</DialogTitle>
                <DialogDescription>
                  Plus qu'à modifier votre mot de passe. Retenez-le, cette
                  fois-ci!
                </DialogDescription>
              </DialogHeader>

              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nouveau mot de passe</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit" disabled={isSubmitting.checkCode}>
                  {isSubmitting.checkCode && <Loader />}Changer le mot de passe
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AuthLayout>
  );
}
