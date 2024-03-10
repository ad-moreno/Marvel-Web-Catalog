import { z } from "zod";
import { UrlSchema, ImageSchema } from "./common";
import { ComicListSchema, StoryListSchema, EventListSchema, SeriesListSchema } from "./lists";

export const CharacterSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  modified: z.string().optional(),
  resourceURI: z.string().url().optional(),
  urls: z.array(UrlSchema).optional(),
  thumbnail: ImageSchema.optional(),
  comics: ComicListSchema.optional(),
  stories: StoryListSchema.optional(),
  events: EventListSchema.optional(),
  series: SeriesListSchema.optional(),
});

export type Character = z.infer<typeof CharacterSchema>;
export type CharacterId = Required<Character>["id"];

const CharacterDataContainerSchema = z.object({
  offset: z.number().int().optional(),
  limit: z.number().int().optional(),
  total: z.number().int().optional(),
  count: z.number().int().optional(),
  results: z.array(CharacterSchema).optional(),
});

export const CharacterDataWrapperSchema = z.object({
  code: z.number().int().optional(),
  status: z.string().optional(),
  copyright: z.string().optional(),
  attributionText: z.string().optional(),
  attributionHTML: z.string().optional(),
  data: CharacterDataContainerSchema.optional(),
  etag: z.string().optional(),
});
