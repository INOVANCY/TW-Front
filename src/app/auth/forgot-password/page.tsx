"use client";

import AuthLayout from "@/app/layouts/AuthLayout";
import TWButton from "@/components/ui/forms/Button";
import TWInput from "@/components/ui/forms/Input";
import Logo from "@/components/ui/logo";
import { useForm } from "react-hook-form";

export default function AuthForgotPasswordPage() {
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
        Mot de passe oublié? 🫢
      </h1>
      <p className="text-slate-800 mb-6">
        Entrez votre e-mail pour recevoir un code à usage unique.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-y-4 gap-x-2 mb-6"
      >
        <TWInput
          type="email"
          name="email"
          label="Adresse e-mail"
          errors={errors}
          register={register}
          validationSchema={{
            required: "L'adresse e-mail est requise",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
              message: "L'adresse e-mail n'est pas valide",
            },
          }}
          required
        />
        <TWButton text="Envoyer le code à usage unique" />
      </form>
    </AuthLayout>
  );
}
