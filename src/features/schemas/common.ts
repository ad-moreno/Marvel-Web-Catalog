import { z } from "zod";

export const UrlSchema = z.object({
  type: z.string(),
  url: z.string().url(),
});

export const TextObjectSchema = z.object({
  type: z.string(),
  language: z.string(),
  text: z.string(),
});

export const ResourceURISchema = z.string().url();

export const ImageSchema = z.object({
  path: z.string(),
  extension: z.string(),
});
