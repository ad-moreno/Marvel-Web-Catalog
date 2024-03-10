import { type CharacterId, type Character } from "../schemas/character";
import classNames from "classnames";
import Image from "next/image";
import urls from "#/urls";
import HeartButton from "./HeartButton";
import Link from "next/link";

type Props = {
  className?: string;
  characterId: CharacterId;
  imageSrc: string;
  name: Required<Character>["name"];
};

const Card = ({ className, characterId, imageSrc, name }: Props) => {
  return (
    <div className="cut-corner group relative h-[15.375rem] w-[10.75rem] bg-secondary hover:bg-primary">
      <Link
        className={classNames("relative flex h-full shrink-0 flex-col text-start", className)}
        href={`${urls.character}/${characterId}`}
      >
        <Image
          className="aspect-[86/95] border-b-[5px] border-primary object-fill"
          src={imageSrc}
          alt={name}
          width={172}
          height={190}
        />
        <div className="flex w-36 grow items-center p-4">
          <div className="truncate text-[0.9rem] uppercase text-white">{name}</div>
        </div>
      </Link>
      <HeartButton className="absolute bottom-4 right-4 p-2" characterId={characterId} size={15} />
    </div>
  );
};

export default Card;
