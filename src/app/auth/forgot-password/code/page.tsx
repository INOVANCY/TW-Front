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
import TWButton from "@/components/ui/forms/Button";
import TWInput from "@/components/ui/forms/Input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Logo from "@/components/ui/logo";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function AuthForgotPasswordCodePage() {
  const form = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <AuthLayout>
      <Logo width={50} height={50} />
      <h1 className="text-2xl text-slate-800 mt-3 mb-1">
        Entrez le code que vous avez reçu. 💡
      </h1>
      <p className="text-slate-800 mb-6">
        N'oubliez pas de vérifier votre dossier indésirable.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
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
    </AuthLayout>
  );
}
