import * as z from "zod";

const RateSchema = z.object({
  year: z.coerce.number().min(1900).max(2100),
  adultPrice: z.coerce.number(),
  childPrice: z.coerce.number(),
  specialPrice: z.coerce.number(),
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

const ParkSchema = z.object({
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

// Types inference
type ParkSchemaType = z.infer<typeof ParkSchema>;
type RateSchemaType = z.infer<typeof RateSchema>;
type LandSchemaType = z.infer<typeof LandSchema>;
// Exports
export { ParkSchema, RateSchema, LandSchema };
export type { ParkSchemaType, RateSchemaType, LandSchemaType };
