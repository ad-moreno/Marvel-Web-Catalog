"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { type Character } from "#/features/schemas/character";
import Search from "#/features/components/Search";
import SearchResults from "#/features/components/SearchResults";
import { useFavoriteCharacters } from "#/features/contexts/FavoriteCharactersContext";
import Loading from "#/features/components/Loading";
import { getCharactersByIds } from "#/features/content";

const FavoritesPanel = () => {
  const { favoriteCharacters } = useFavoriteCharacters();
  // Using a ref to avoid reloading the content if the favorites change
  const chatacterIds = useRef(favoriteCharacters);

  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  const filteredCharacters = useMemo(() => {
    const favCharacters = characters.filter((character) => character.id && favoriteCharacters.includes(character.id));
    if (!name) return favCharacters;
    return favCharacters.filter((character) => character.name?.includes(name));
  }, [characters, favoriteCharacters, name]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const characters = await getCharactersByIds(chatacterIds.current);
        setCharacters(characters);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    void fetchCharacters();
  }, []);

  if (loading) {
    return <Loading className="mx-auto" />;
  }

  return (
    <div className="flex flex-col gap-y-6">
      <div className="text-[1.75rem] font-bold lg:text-[2rem]">FAVORITES</div>
      <div className="flex flex-col gap-y-2">
        <Search onSearch={setName} disabled={loading} />
        <div className="text-xs">{filteredCharacters.length} RESULTS</div>
      </div>
      <SearchResults characters={filteredCharacters} />
    </div>
  );
};

export default FavoritesPanel;
