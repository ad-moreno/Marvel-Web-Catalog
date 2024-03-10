import { type ComponentProps } from "react";
import { Spinner } from "./Icons";
import classNames from "classnames";

const Loading = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div className={classNames("flex flex-row items-center justify-center gap-x-4", className)} {...props}>
      <Spinner />
      <div className="text-lg">Loading...</div>
    </div>
  );
};

export default Loading;
