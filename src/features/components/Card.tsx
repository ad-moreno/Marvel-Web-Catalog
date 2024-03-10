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
    <div className="relative h-64 w-48">
      <Link
        className={classNames("cut-corner relative flex shrink-0 flex-col bg-secondary text-start", className)}
        href={`${urls.character}/${characterId}`}
      >
        <Image
          className="aspect-square border-b-2 border-primary object-fill"
          src={imageSrc}
          alt={name}
          width={200}
          height={200}
        />
        <div className="w-40 grow truncate p-4 text-[0.9rem] uppercase text-white">{name}</div>
      </Link>
      <HeartButton className="absolute bottom-6 right-4 p-2" characterId={characterId} size={15} />
    </div>
  );
};

export default Card;
