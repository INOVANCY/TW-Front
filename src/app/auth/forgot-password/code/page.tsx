"use client";

import AuthLayout from "@/app/layouts/AuthLayout";
import TWButton from "@/components/ui/forms/Button";
import TWInput from "@/components/ui/forms/Input";
import Logo from "@/components/ui/logo";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function AuthForgotPasswordCodePage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-y-4 mb-6"
      >
        <div className="flex items-center gap-3 justify-between">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              pattern="[0-9]*"
              inputMode="numeric"
              className="w-16 h-16 p-2 text-2xl border border-slate-200 rounded-lg outline-none ring-red-500 focus:ring-1 transition-all duration-300 ease-in-out shadow-red-500/20 focus:shadow-md text-center"
              {...register(`field${i + 1}`)}
            />
          ))}
        </div>

        <TWButton text="Vérifier le code" />
      </form>
    </AuthLayout>
  );
}
