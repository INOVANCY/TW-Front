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
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function AuthForgotPasswordCodePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const otpForm = useForm();
  const passwordForm = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
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
        <form onSubmit={otpForm.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={otpForm.control}
            name="pin"
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
          <Button type="submit">Valider le code</Button>
        </form>
      </Form>
      <Dialog open={isModalOpen}>
        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(onSubmit)}>
            <DialogContent>
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
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">Changer le mot de passe</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Form>
      </Dialog>
    </AuthLayout>
  );
}
