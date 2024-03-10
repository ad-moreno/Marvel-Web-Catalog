import { z } from "zod";
import { TextObjectSchema, UrlSchema, ImageSchema } from "./common";
import { CharacterListSchema, CreatorListSchema, EventListSchema, SeriesSummarySchema, StoryListSchema } from "./lists";

const ComicSummarySchema = z.object({
  resourceURI: z.string().url().optional(),
  name: z.string().optional(),
});

const ComicDateSchema = z.object({
  type: z.string().optional(),
  date: z.string().optional(),
});

const ComicPriceSchema = z.object({
  type: z.string().optional(),
  price: z.number().optional(),
});

const ComicSchema = z.object({
  id: z.number().int().optional(),
  digitalId: z.number().int().optional(),
  title: z.string().optional(),
  issueNumber: z.number().optional(),
  variantDescription: z.string().optional(),
  description: z.string().optional().nullable(),
  modified: z.string().optional(),
  isbn: z.string().optional(),
  upc: z.string().optional(),
  diamondCode: z.string().optional(),
  ean: z.string().optional(),
  issn: z.string().optional(),
  format: z.string().optional(),
  pageCount: z.number().int().optional(),
  textObjects: z.array(TextObjectSchema).optional(),
  resourceURI: z.string().url().optional(),
  urls: z.array(UrlSchema).optional(),
  series: SeriesSummarySchema.optional(),
  variants: z.array(ComicSummarySchema).optional(),
  collections: z.array(ComicSummarySchema).optional(),
  collectedIssues: z.array(ComicSummarySchema).optional(),
  dates: z.array(ComicDateSchema).optional(),
  prices: z.array(ComicPriceSchema).optional(),
  thumbnail: ImageSchema.optional(),
  images: z.array(ImageSchema).optional(),
  creators: CreatorListSchema.optional(),
  characters: CharacterListSchema.optional(),
  stories: StoryListSchema.optional(),
  events: EventListSchema.optional(),
});

export type Comic = z.infer<typeof ComicSchema>;

const ComicDataContainerSchema = z.object({
  offset: z.number().int().optional(),
  limit: z.number().int().optional(),
  total: z.number().int().optional(),
  count: z.number().int().optional(),
  results: z.array(ComicSchema).optional(),
});

export const ComicDataWrapperSchema = z.object({
  code: z.number().int().optional(),
  status: z.string().optional(),
  copyright: z.string().optional(),
  attributionText: z.string().optional(),
  attributionHTML: z.string().optional(),
  data: ComicDataContainerSchema.optional(),
  etag: z.string().optional(),
});
