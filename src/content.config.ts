import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { categories } from "@/config/categories";

const credit = z.object({
  creditName: z.string(),
  creditUrl: z.url(),
});

const authors = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/authors" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      location: z.string(),
      avatar: z
        .object({
          src: image(),
          alt: z.string(),
        })
        .extend(credit.shape),
    }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      dek: z.string(),
      category: z.enum(categories),
      date: z.coerce.date(),
      location: z.string(),
      author: reference("authors"),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      cover: z
        .object({
          src: image(),
          alt: z.string(),
        })
        .extend(credit.shape),
      gallery: z
        .array(
          z
            .object({
              src: image(),
              alt: z.string(),
              caption: z.string().optional(),
            })
            .extend(credit.shape),
        )
        .default([]),
    }),
});

const destinations = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/destinations" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      country: z.string(),
      tagline: z.string(),
      intro: z.string(),
      bestTime: z.string(),
      coords: z.object({ lat: z.string(), lng: z.string() }).optional(),
      cover: z
        .object({
          src: image(),
          alt: z.string(),
        })
        .extend(credit.shape),
      things: z.array(z.string()),
      stay: z.array(z.object({ name: z.string(), note: z.string() })),
      food: z.array(z.object({ name: z.string(), note: z.string() })),
      neighborhoods: z.array(z.object({ name: z.string(), note: z.string() })).optional(),
      itinerary: z
        .array(z.object({ day: z.string(), title: z.string(), note: z.string() }))
        .optional(),
      getting: z.array(z.object({ label: z.string(), note: z.string() })).optional(),
      costs: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
      reads: z.array(z.object({ title: z.string(), author: z.string() })).optional(),
      language: z.array(z.object({ phrase: z.string(), meaning: z.string() })).optional(),
      video: z
        .object({
          src: z.string(),
          poster: z
            .object({
              src: image(),
              alt: z.string(),
            })
            .extend(credit.shape),
          caption: z.string(),
        })
        .extend(credit.shape)
        .optional(),
      photoEssay: z
        .array(
          z
            .object({
              src: image(),
              alt: z.string(),
            })
            .extend(credit.shape),
        )
        .optional(),
    }),
});

export const collections = { posts, destinations, authors };
