import * as z from "zod";

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Veuillez saisir une adresse email valide.",
  }),
  password: z
    .string()
    .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,50}$/, {
      message:
        "Rappel: votre mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.",
    }),
  rememberMe: z.boolean(),
});

type loginFormType = z.infer<typeof loginFormSchema>;

export { loginFormSchema };
export type { loginFormType };
