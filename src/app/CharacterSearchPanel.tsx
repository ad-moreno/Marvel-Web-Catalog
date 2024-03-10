"use client";

import { useCallback, useState } from "react";
import { type Character } from "../features/schemas/character";
import Search from "../features/components/Search";
import SearchResults from "../features/components/SearchResults";
import { getCharactersByName } from "../features/content";
import Loading from "../features/components/Loading";

type Props = {
  initialResult: Character[];
};

const CharacterSearchPanel = ({ initialResult }: Props) => {
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState(initialResult);

  const handleSearch = useCallback(async (name: string) => {
    setLoading(true);
    try {
      const characters = await getCharactersByName(name);
      setCharacters(characters);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <Search onSearch={handleSearch} disabled={loading} />
        {!loading && <div className="text-xs">{characters.length} RESULTS</div>}
      </div>
      {loading ? <Loading className="mt-8" /> : <SearchResults characters={characters} />}
    </div>
  );
};

export default CharacterSearchPanel;
