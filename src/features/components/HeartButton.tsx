"use client";

import { useCallback, type ComponentProps, type MouseEventHandler } from "react";
import { useFavoriteCharacters } from "../contexts/FavoriteCharactersContext";
import { type CharacterId } from "../schemas/character";
import { Heart } from "./Icons";

type Props = ComponentProps<"button"> & {
  characterId: CharacterId;
  size: number;
};

const HeartButton = ({ characterId, size, onClick, ...props }: Props) => {
  const { favoriteCharacters, toggleFavoriteCharacter } = useFavoriteCharacters();
  const handleClickHeart = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      event.stopPropagation();
      toggleFavoriteCharacter(characterId);
      onClick && onClick(event);
    },
    [characterId, onClick, toggleFavoriteCharacter],
  );

  return (
    <button onClick={handleClickHeart} {...props}>
      <Heart size={size} filled={favoriteCharacters.includes(characterId)} />
    </button>
  );
};

export default HeartButton;
