import * as z from "zod";

const RateSchema = z.object({
  year: z.number(),
  adultPrice: z.number(),
  childPrice: z.number(),
  specialPrice: z.number(),
  isEntranceFree: z.boolean(),
  offersDiscounts: z.boolean(),
  offersEarlyBird: z.boolean(),
});

const MediaSchama = z.object({
  url: z.string(),
  type: z.string(),
});

const LandSchema = z.object({
  name: z.string(),
});

const ManageParkFormSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, {
    message: "Veuillez saisir un nom.",
  }),

  story: z.string().min(50, {
    message: "Veuillez saisir une histoire de minimum 50 caractères.",
  }),
  rates: z.array(RateSchema).optional(),
  localisation: z.tuple([z.number(), z.number()]),
  medias: z.array(MediaSchama).optional(),
  lands: z.array(LandSchema).optional(),
});

type ManageParkFormType = z.infer<typeof ManageParkFormSchema>;
type RateSchemaType = z.infer<typeof RateSchema>;
type LandSchemaType = z.infer<typeof LandSchema>;
export { ManageParkFormSchema, RateSchema, LandSchema };
export type { ManageParkFormType, RateSchemaType, LandSchemaType };
