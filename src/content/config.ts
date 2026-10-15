import { defineCollection, z } from "astro:content";

const checkinsCollection = defineCollection({
  type: "data",
  schema: z.object({
    date: z.string(),
    dateZh: z.string(),
    dateEn: z.string(),
    relZh: z.string(),
    relEn: z.string(),
    place: z.string(),
    titleZh: z.string().optional(),
    subZh: z.string().optional(),
    titleEn: z.string().optional(),
    subEn: z.string().optional(),
    cityZh: z.string(),
    cityEn: z.string(),
    preset: z.string().default("bistro"),
    guideZh: z.string().optional(),
    guideEn: z.string().optional(),
    dayImage: z.string().optional(),
    nightImage: z.string().optional(),
    coordinates: z
      .object({
        lat: z.number(),
        lng: z.number(),
      })
      .optional(),
    companions: z
      .array(
        z.object({
          name: z.string(),
          url: z.string(),
        })
      )
      .default([]),
    guideDetailsZh: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      )
      .optional(),
    guideDetailsEn: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      )
      .optional(),
  }),
});

export const collections = {
  checkins: checkinsCollection,
};
