import { type ComponentProps } from "react";
import classNames from "classnames";
import Image from "next/image";
import { type Comic } from "../schemas/comic";

type Props = ComponentProps<"div"> & {
  comic: Comic;
};

const getComicYear = (comic: Comic): string => {
  let year = "";
  const date = comic.dates?.find((date) => date.type?.toLowerCase() === "onsaledate")?.date ?? comic.dates?.[0]?.date;
  if (date) {
    try {
      const parsedDate = new Date(date);
      const fullYear = parsedDate.getFullYear();
      if (!Number.isNaN(fullYear)) year = fullYear.toString();
      else year = "";
    } catch {
      year = date;
    }
  }
  return year;
};

const ComicSummary = ({ className, comic, ...props }: Props) => {
  const { path, extension } = comic.thumbnail ?? {};
  if (!path || !extension) return null;
  const imageSrc = !!path && !!extension ? `${path}.${extension}` : undefined;
  const title = comic.title ?? "";

  const year = getComicYear(comic);
  return (
    <div className={classNames("flex shrink-0 flex-col justify-center gap-y-2", className)} {...props}>
      {!!imageSrc && <Image src={imageSrc} alt={`${title} comic`} width={200} height={100} />}
      <div className="w-48 font-semibold">{title}</div>
      <div className="text-sm leading-none">{year}</div>
    </div>
  );
};

export default ComicSummary;
