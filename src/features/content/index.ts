"use server";

import { env } from "#/env";
import { type ZodSchema } from "zod";
import { type Character, CharacterDataWrapperSchema, type CharacterId } from "../schemas/character";
import { createHash } from "crypto";
import { ComicDataWrapperSchema } from "../schemas/comic";

type ParamRecord = Record<string, string | number>;

const toQueryString = (params: ParamRecord) => {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
};

/**
 * Asynchronously fetches and validates data from the Marvel API for a specified collection. It constructs a query
 * with authentication details, makes a GET request, and validates the response using a Zod schema.
 */
const fetchFromMarvel = async <T>(collection: string, schema: ZodSchema<T>, params: ParamRecord = {}): Promise<T> => {
  const ts = new Date().getTime();
  const hashInput = `${ts}${env.MARVEL_PRIVATE_KEY}${env.MARVEL_PUBLIC_KEY}`;
  const hash = createHash("md5").update(hashInput, "utf-8").digest("hex");
  const queryParams = { ...params, ts, apikey: env.MARVEL_PUBLIC_KEY, hash };
  const queryString = toQueryString(queryParams);
  const rawResult = await fetch(new URL(`/v1/public/${collection}?${queryString}`, env.MARVEL_BASE_API_ENDPOINT), {
    headers: { "Accept-Encoding": "gzip" },
  });
  const result = await schema.parseAsync(await rawResult.json());
  return result;
};

export const getCharacters = async () => {
  const response = await fetchFromMarvel("characters", CharacterDataWrapperSchema, { limit: 50 });
  return response.data?.results ?? [];
};

export const getCharactersByName = async (nameStartsWith: string) => {
  if (nameStartsWith.length === 0) return await getCharacters();
  const response = await fetchFromMarvel("characters", CharacterDataWrapperSchema, { nameStartsWith, limit: 50 });
  return response.data?.results ?? [];
};

export const getCharactersByIds = async (ids: CharacterId[]): Promise<Character[]> => {
  const characters = await Promise.all(ids.map((id) => getCharacter(id)));
  return characters.filter(Boolean) as Character[];
};

export const getCharacter = async (id: CharacterId) => {
  const response = await fetchFromMarvel(`characters/${id}`, CharacterDataWrapperSchema);
  const [character] = response.data?.results ?? [];
  return character;
};

export const getCharacterComics = async (id: CharacterId) => {
  const response = await fetchFromMarvel(`characters/${id}/comics`, ComicDataWrapperSchema, { orderBy: "onsaleDate" });
  return response.data?.results ?? [];
};
