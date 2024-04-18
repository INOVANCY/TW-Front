"use client";

import AuthLayout from "@/app/layouts/AuthLayout";
import TextDivider from "@/components/ui/TextDivider";
import TWButton from "@/components/ui/forms/Button";
import TWCheckbox from "@/components/ui/forms/Checkbox";
import TWInput from "@/components/ui/forms/Input";
import Logo from "@/components/ui/logo";
import {
  IconBrandApple,
  IconBrandFacebook,
  IconBrandGoogle,
  IconBrandTwitter,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function AuthLoginPage() {
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
      <h1 className="text-2xl text-slate-800 mt-3 mb-1">Enfin de retour! 👋🏻</h1>
      <p className="text-slate-800 mb-6">
        Connectez-vous à votre compte et (re-)commencez l'aventure.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-y-4 mb-6"
      >
        <TWInput
          type="text"
          name="username"
          label="Nom d'utilisateur"
          errors={errors}
          register={register}
          validationSchema={{
            required: "Le nom d'utilisateur est requis",
            minLength: {
              value: 5,
              message:
                "Rappel: votre nom d'utilisateur doit contenir au moins 5 caractères",
            },
          }}
          required
          className="col-span-2"
        />
        <TWInput
          type="password"
          name="password"
          label="Mot de passe"
          errors={errors}
          register={register}
          validationSchema={{
            required: "Le mot de passe est requis",
          }}
          required
          className="col-span-2"
        />
        <TWCheckbox
          name="remember"
          label="Se souvenir de moi"
          errors={errors}
          register={register}
          validationSchema={{}}
          required={false}
        />
        <div className="text-right align-middle">
          <Link href="/auth/forgot-password" className="text-slate-800">
            Mot de passe oublié?
          </Link>
        </div>
        <TWButton text="Se connecter" className="col-span-2" />
      </form>
      <div className="w-full flex flex-col gap-4 items-center">
        <span className="text-slate-800">
          Nouveau sur Thrills ?
          <Link href="/auth/register" className="ms-1 font-medium text-red-600">
            Créer un compte
          </Link>
        </span>
        <TextDivider text="ou" />
        <div className="flex gap-4 items-center">
          <IconBrandFacebook size={20} className="text-blue-500" />
          <IconBrandGoogle size={20} className="text-red-500" />
          <IconBrandTwitter size={20} className="text-blue-400" />
          <IconBrandApple size={20} className="text-black" />
        </div>
      </div>
    </AuthLayout>
  );
}