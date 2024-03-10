import { getCharacters } from "#/features/content";
import CharacterSearchPanel from "./CharacterSearchPanel";

export default async function HomePage() {
  const characters = await getCharacters();
  return (
    <main className="p-4 lg:p-16">
      <CharacterSearchPanel initialResult={characters} />
    </main>
  );
}
