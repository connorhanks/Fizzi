import clsx from "clsx";
import React from "react";

type Props = {
  buttonLink: string | null;
  buttonText: string | null;
  className?: string;
};

export default function Button({ buttonLink, buttonText, className }: Props) {
  return (
    <a
      href={buttonLink}
      className={clsx(
        "rounded-xl bg-orange-500 px-5 py-4 text-centertext-xl font-bold uppercase tracking-wide text-white transition-colors duration-150 hover:bg-orange-700 md:text-2xl",
        className,
      )}
    >
      {buttonText}
    </a>
  );
}
