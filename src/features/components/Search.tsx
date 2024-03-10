"use client";

import { useCallback, type ComponentProps, type KeyboardEventHandler, type ChangeEventHandler, useState } from "react";
import classNames from "classnames";
import { MagnifyingGlass } from "./Icons";

type Props = ComponentProps<"input"> & {
  disabled?: boolean;
  onSearch: (text: string) => void | Promise<void>;
};

const Search = ({ className, disabled, onSearch, ...props }: Props) => {
  const [currentText, setCurrentText] = useState("");

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    ({ key }) => {
      if (key === "Enter") void onSearch(currentText);
    },
    [currentText, onSearch],
  );

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setCurrentText(e.target.value);
  }, []);

  return (
    <div className={classNames("relative", className)} {...props}>
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center">
        <MagnifyingGlass />
      </div>
      <input
        type="search"
        className="block w-full border-b border-black p-2 ps-8 outline-none"
        placeholder="SEARCH A CHARACTER..."
        value={currentText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
    </div>
  );
};

export default Search;
