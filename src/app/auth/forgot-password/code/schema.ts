import * as z from "zod";

const checkOtpCodeFormSchema = z.object({
  code: z.string().length(6, {
    message: "Le code doit être composé de 6 chiffres.",
  }),
});

const resetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,50}$/, {
        message: "Votre mot de passe ne respecte pas les critères de sécurité.",
      }),
    password_confirmation: z.string({
      required_error: "Veuillez confirmer votre mot de passe.",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["password_confirmation"],
  });

type checkOtpCodeFormType = z.infer<typeof checkOtpCodeFormSchema>;
type resetPasswordFormType = z.infer<typeof resetPasswordFormSchema>;

export { checkOtpCodeFormSchema, resetPasswordFormSchema };
export type { checkOtpCodeFormType, resetPasswordFormType };
