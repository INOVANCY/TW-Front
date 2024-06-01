import * as z from "zod";

const firstStepFormSchema = z.object({
  email: z.string().email({
    message: "Veuillez saisir une adresse email valide.",
  }),
  terms: z.boolean().refine((value) => value === true, {
    message:
      "Vous devez accepter les conditions d'utilisation et la politique de confidentialité.",
  }),
});

const secondStepFormSchema = z
  .object({
    firstName: z.string().min(1, {
      message: "Veuillez saisir votre prénom.",
    }),
    lastName: z.string().min(1, {
      message: "Veuillez saisir votre nom.",
    }),
    username: z.string().min(5, {
      message: "Votre nom d'utilisateur doit contenir au moins 5 caractères.",
    }),
    birthday: z
      .string()
      .date("Veuillez saisir une date valide.")
      .refine(
        (value) => {
          const currentYear = new Date().getFullYear();
          const birthYear = new Date(value).getFullYear();
          return currentYear - birthYear >= 13;
        },
        {
          message: "Vous devez avoir au moins 13 ans pour vous inscrire.",
        }
      ),
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

type firstStepFormType = z.infer<typeof firstStepFormSchema>;
type secondStepFormType = z.infer<typeof secondStepFormSchema>;

export { firstStepFormSchema, secondStepFormSchema };
export type { firstStepFormType, secondStepFormType };
