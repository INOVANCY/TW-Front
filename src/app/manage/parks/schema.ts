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

const LocalisationSchema = z.object({
  entrance: z.tuple([z.number(), z.number()]),
  upperLeftBound: z.tuple([z.number(), z.number()]),
  lowerRightBound: z.tuple([z.number(), z.number()]),
});

const MediaSchama = z.object({
  url: z.string(),
  type: z.string(),
});

const LandSchema = z
  .object({
    name: z.string(),
  })
  .optional();

const ManageParkFormSchema = z.object({
  name: z.string(),
  story: z.string(),
  rates: z.array(RateSchema).optional(),
  localisation: LocalisationSchema,
  medias: z.array(MediaSchama).optional(),
  lands: z.array(LandSchema).optional(),
});

type ManageParkFormType = z.infer<typeof ManageParkFormSchema>;
export { ManageParkFormSchema };
export type { ManageParkFormType };
