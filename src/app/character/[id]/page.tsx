import { getCharacter, getCharacterComics } from "#/features/content";
import { notFound } from "next/navigation";
import { z } from "zod";
import Image from "next/image";
import HeartButton from "#/features/components/HeartButton";
import ComicSummary from "#/features/components/ComicSummary";

// Don't prpe-render any Character page but cache it once it's built on runtime
export const generateStaticParams = () => [];

export default async function CharacterPage({ params }: { params: { id: string } }) {
  const id = z.coerce.number().parse(params.id);
  const character = await getCharacter(id);
  if (!character) notFound();

  const comics = await getCharacterComics(id);

  const name = character.name ?? "";
  const description = character.description ?? "";

  const { path, extension } = character.thumbnail ?? {};
  const imageSrc = !!path && !!extension ? `${path}.${extension}` : undefined;

  return (
    <main className="flex flex-col gap-y-4">
      <div className="cut-corner-lg relative bg-secondary text-white">
        <div className="mx-auto flex max-w-[80rem] flex-col items-center justify-between gap-10 md:flex-row lg:gap-20">
          {!!imageSrc && (
            <div className="relative aspect-square w-full md:h-96 md:w-96">
              <Image className="aspect-square object-fill" src={imageSrc} alt={`${name} image`} fill={true} />
            </div>
          )}
          <div className="flex grow flex-col gap-8 px-4 pb-8 md:pb-0">
            <div className="flex flex-row items-center justify-between gap-x-8">
              <h1 className="text-balance text-5xl font-bold uppercase">{name}</h1>
              <HeartButton size={35} characterId={id} />
            </div>
            <div>{description}</div>
          </div>
        </div>
      </div>
      {comics.length > 0 && (
        <div className="mx-auto flex w-full max-w-[82rem] flex-col gap-10 px-4 py-16">
          <div className="text-4xl font-semibold">COMICS</div>
          <div className="styled-scroll flex flex-row items-start gap-x-5 overflow-x-auto pb-5">
            {comics.map((comic, idx) => (
              <ComicSummary key={comic.id ? `comic-${comic.id}` : `${id}-comic-${idx}`} comic={comic} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
