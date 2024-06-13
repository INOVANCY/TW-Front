import * as z from "zod";

const profileFormSchema = z
  .object({
    _id: z.string(),
    firstName: z.string().min(2, {
      message: "Le prénom doit contenir au moins 2 caractères.",
    }),
    lastName: z.string().min(2, {
      message: "Le nom doit contenir au moins 2 caractères.",
    }),
    email: z.string().email({
      message: "Veuillez saisir une adresse email valide.",
    }),
    username: z.string().min(2, {
      message: "Le nom d'utilisateur doit contenir au moins 2 caractères.",
    }),
    bio: z.string().max(300, {
      message: "La biographie ne doit pas dépasser 300 caractères.",
    }),
    favoritePark: z.string().optional(),
    homePark: z.string().optional(),
    birthday: z.string().date(),
    links: z.object({
      facebook: z.string().optional(),
      twitter: z.string().optional(),
      threads: z.string().optional(),
      instagram: z.string().optional(),
      youtube: z.string().optional(),
      snapchat: z.string().optional(),
      tiktok: z.string().optional(),
    }),
    preferredTheme: z.enum(["light", "dark", "system"], {
      message: "Le thème préféré doit être clair, sombre ou système.",
    }),
    preferredLanguage: z.enum(["fr", "en"], {
      message: "La langue préférée doit être français ou anglais.",
    }),
    notifications: z.object({
      rankings: z.boolean(),
      news: z.boolean(),
      marketplace: z.boolean(),
      account: z.boolean(),
    }),
    password: z
      .string()
      .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,50}$/, {
        message: "Votre mot de passe ne respecte pas les critères de sécurité.",
      })
      .or(z.literal(""))
      .or(z.undefined()),

    password_confirmation: z
      .string({
        required_error: "Veuillez confirmer votre mot de passe.",
      })
      .optional(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["password_confirmation"],
  });

type profileFormType = z.infer<typeof profileFormSchema>;
export { profileFormSchema };
export type { profileFormType };
