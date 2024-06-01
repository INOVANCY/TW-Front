import * as z from "zod";

const sendOtpCodeFormSchema = z.object({
  email: z.string().email({
    message: "Veuillez saisir une adresse email valide.",
  }),
});

type sendOtpCodeFormType = z.infer<typeof sendOtpCodeFormSchema>;

export { sendOtpCodeFormSchema };
export type { sendOtpCodeFormType };
