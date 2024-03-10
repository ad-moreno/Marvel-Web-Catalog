import Card from "#/features/components/Card";
import { type Character } from "../schemas/character";

type Props = {
  characters: Character[];
};

export default function SearchResults({ characters }: Props) {
  /**
   * Ensure that every character has id, name and a valid thumbnail
   */
  const cleanCharacters = characters.filter((character) => {
    const { id, name, thumbnail } = character ?? {};
    if (!id || !name || !thumbnail) return false;
    const { path, extension } = thumbnail;
    if (!path || !extension) return false;
    return true;
  });

  return (
    <div className="flex flex-row flex-wrap justify-start gap-4">
      {cleanCharacters.map((character) => {
        const imageSrc = `${character.thumbnail!.path}.${character.thumbnail!.extension}`;
        return (
          <Card
            key={`character-${character.id!}`}
            characterId={character.id!}
            imageSrc={imageSrc}
            name={character.name!}
          />
        );
      })}
    </div>
  );
}
