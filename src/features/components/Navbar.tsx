"use client";

import { type ComponentProps } from "react";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import urls from "#/urls";
import { useFavoriteCharacters } from "../contexts/FavoriteCharactersContext";
import { Heart } from "./Icons";

const Navbar = ({ className, ...props }: ComponentProps<"nav">) => {
  const { favoriteCharacters } = useFavoriteCharacters();
  return (
    <nav
      className={classNames(
        "flex w-full flex-row items-center justify-between gap-x-12 bg-secondary px-4 py-4 md:px-16",
        className,
      )}
      {...props}
    >
      <Link href={urls.home}>
        <Image className="min-w-[5rem]" src="/logo.svg" alt="marvel-logo" width={150} height={100} />
      </Link>
      <Link className="flex flex-row flex-nowrap gap-x-4 p-4" href={urls.favourites}>
        <Heart size={25} filled={true} />
        <div className="min-w-4 text-white">{favoriteCharacters.length}</div>
      </Link>
    </nav>
  );
};

export default Navbar;
