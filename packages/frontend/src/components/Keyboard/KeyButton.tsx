import { useRef } from "react";
import clsx from "clsx";
import { MatchType } from "wordle-common";
import { getKeyButtonId } from "./common";

type Props = {
  char: string;
  match?: MatchType;
  className?: string;
  onClick(key: string): void;
};

const matchTypeToColor = {
  [MatchType.None]: "bg-[#3a3a3c]",
  [MatchType.Partial]: "bg-[#c9b458]",
  [MatchType.Exact]: "bg-[#6aaa64]",
};

export function KeyButton({ char, match, onClick, className }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const content =
    char === "\b" ? <BackspaceIcon /> : char === "\n" ? "enter" : char;

  const textStyling = clsx(
    "text-center text-black dark:text-white uppercase font-bold",
    match !== undefined && "text-white",
    char === "\n" ? "text-xs" : "text-sm sm:text-xl",
  );

  const bgStyling = clsx(
    match === undefined
      ? "bg-[#d3d6da] dark:bg-[#818384]"
      : matchTypeToColor[match],
  );

  return (
    <button
      ref={ref}
      id={getKeyButtonId(char)}
      className={clsx(
        "w-full origin-center select-none rounded p-1 transition-colors xs:p-2 sm:p-3 md:p-4",
        textStyling,
        bgStyling,
        className,
      )}
      onClick={() => {
        onClick(char);
      }}
      onKeyDown={(event) => {
        event.preventDefault();
      }}
      tabIndex={-1}
    >
      {content}
    </button>
  );
}

function BackspaceIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      viewBox="0 0 24 24"
      width="20"
      className="inline"
    >
      <path
        className="dark:fill-white"
        d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
      ></path>
    </svg>
  );
}
