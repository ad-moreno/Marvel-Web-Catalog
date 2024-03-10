"use client";

import React, { createContext, useContext, useState, type ReactNode, useCallback } from "react";
import { type CharacterId } from "../schemas/character";

type FavoriteCharactersContextType = {
  favoriteCharacters: CharacterId[];
  addFavoriteCharacter: (id: CharacterId) => void;
  removeFavoriteCharacter: (id: CharacterId) => void;
  toggleFavoriteCharacter: (id: CharacterId) => void;
};

const FavoriteCharactersContext = createContext<FavoriteCharactersContextType | undefined>(undefined);

type FavoriteCharactersProviderProps = {
  children: ReactNode;
};

export const FavoriteCharactersProvider = ({ children }: FavoriteCharactersProviderProps) => {
  const [favoriteCharacters, setFavoriteCharacters] = useState<CharacterId[]>([]);

  const addFavoriteCharacter = useCallback((id: CharacterId) => {
    setFavoriteCharacters((prevFavorites) => [...new Set([...prevFavorites, id])]);
  }, []);

  const removeFavoriteCharacter = useCallback((id: CharacterId) => {
    setFavoriteCharacters((prevFavorites) => prevFavorites.filter((favoriteId) => favoriteId !== id));
  }, []);

  const toggleFavoriteCharacter = useCallback(
    (id: CharacterId) => {
      if (favoriteCharacters.includes(id)) removeFavoriteCharacter(id);
      else addFavoriteCharacter(id);
    },
    [addFavoriteCharacter, favoriteCharacters, removeFavoriteCharacter],
  );

  return (
    <FavoriteCharactersContext.Provider
      value={{ favoriteCharacters, addFavoriteCharacter, removeFavoriteCharacter, toggleFavoriteCharacter }}
    >
      {children}
    </FavoriteCharactersContext.Provider>
  );
};

export const useFavoriteCharacters = () => {
  const context = useContext(FavoriteCharactersContext);
  if (context === undefined) throw new Error("useFavoriteCharacters must be used within a FavoriteCharactersProvider");
  return context;
};
