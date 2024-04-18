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
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function AuthRegisterPage() {
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
        Bienvenue, cher #ThrillsLover ! 👋🏻
      </h1>
      <p className="text-slate-800 mb-6">
        Créez-vous un compte et commencez l'aventure.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6"
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
        />
        <TWInput
          type="email"
          name="email"
          label="Adresse email"
          errors={errors}
          register={register}
          validationSchema={{
            required: "L'adresse email est requise",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "L'adresse email est invalide",
            },
          }}
          required
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
        />
        <TWInput
          type="password"
          name="confirmPassword"
          label="Confirmer le mot de passe"
          errors={errors}
          register={register}
          validationSchema={{
            required: "La confirmation du mot de passe est requise",
          }}
          required
        />
        <TWCheckbox
          name="terms"
          label={
            <span>
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
            </span>
          }
          errors={errors}
          register={register}
          validationSchema={{
            required:
              "Vous devez accepter les conditions d'utilisation et la politique de confidentialité",
          }}
          required
          className="col-span-2"
        />
        <TWButton text="Créer mon compte" className="col-span-2" />
      </form>
      <div className="w-full flex flex-col gap-4 items-center">
        <span className="text-slate-800">
          Déjà un compte Thrills ?
          <Link href="/auth/login" className="ms-1 font-medium text-red-600">
            Se connecter
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
