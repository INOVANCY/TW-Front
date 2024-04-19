"use client";

import AuthLayout from "@/app/layouts/AuthLayout";
import TWButton from "@/components/ui/forms/Button";
import TWInput from "@/components/ui/forms/Input";
import Logo from "@/components/ui/logo";
import { useForm } from "react-hook-form";

export default function AuthForgotPasswordResetPage() {
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
      <h1 className="text-2xl text-slate-800 mt-3 mb-1">Yes, we did it! 🙂</h1>
      <p className="text-slate-800 mb-6">
        Plus qu'à modifier votre mot de passe. Retenez-le, cette fois-ci!
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-y-4 gap-x-2 mb-6"
      >
        <TWInput
          type="password"
          name="password"
          label="Nouveau mot de passe"
          errors={errors}
          register={register}
          validationSchema={{
            required: "Le mot de passe est requis",
            minLength: {
              value: 6,
              message: "Le mot de passe doit contenir au moins 6 caractères",
            },
          }}
          required
        />
        <TWInput
          type="password"
          name="passwordConfirmation"
          label="Confirmer le mot de passe"
          errors={errors}
          register={register}
          validationSchema={{
            required: "La confirmation du mot de passe est requise",
          }}
          required
        />
        <TWButton text="Modifier mon mot de passe" />
      </form>
    </AuthLayout>
  );
}
