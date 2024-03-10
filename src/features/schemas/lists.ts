import { z } from "zod";

const BaseListSchema = z.object({
  available: z.number().int().optional(),
  returned: z.number().int().optional(),
  collectionURI: z.string().url().optional(),
});

export const ComicSummarySchema = z.object({
  resourceURI: z.string().url().optional(),
  name: z.string().optional(),
});

export const ComicListSchema = BaseListSchema.extend({
  items: z.array(ComicSummarySchema).optional(),
});

export const StorySummarySchema = z.object({
  resourceURI: z.string().url().optional(),
  name: z.string().optional(),
  type: z.string().optional(),
});

export const StoryListSchema = BaseListSchema.extend({
  items: z.array(StorySummarySchema).optional(),
});

export const EventSummarySchema = z.object({
  resourceURI: z.string().url().optional(),
  name: z.string().optional(),
});

export const EventListSchema = BaseListSchema.extend({
  items: z.array(EventSummarySchema).optional(),
});

export const SeriesSummarySchema = z.object({
  resourceURI: z.string().url().optional(),
  name: z.string().optional(),
});

export const SeriesListSchema = BaseListSchema.extend({
  items: z.array(SeriesSummarySchema).optional(),
});

export const CreatorSummarySchema = z.object({
  resourceURI: z.string().url().optional(),
  name: z.string().optional(),
  role: z.string().optional(),
});

export const CreatorListSchema = BaseListSchema.extend({
  items: z.array(CreatorSummarySchema).optional(),
});

export const CharacterSummarySchema = z.object({
  resourceURI: z.string().url().optional(),
  name: z.string().optional(),
  role: z.string().optional(),
});

export const CharacterListSchema = BaseListSchema.extend({
  items: z.array(CharacterSummarySchema).optional(),
});
