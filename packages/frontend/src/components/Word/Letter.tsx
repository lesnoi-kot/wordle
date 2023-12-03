import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { MatchType } from "wordle-common";

import { pluckElement, flipElement } from "./animations";

type Props = {
  order: number;
  value: string;
  match: MatchType | null;
};

const matchTypeToColor = {
  [MatchType.None]: "bg-[#787c7e]",
  [MatchType.Partial]: "bg-[#c9b458]",
  [MatchType.Exact]: "bg-[#6aaa64]",
};

const FLIP_ANIMATION_DELAY = 100;

export function Letter({ order, value, match }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [showMatchStyle, setShowMatchStyle] = useState(false);
  const hasMatchInfo = match !== null;

  useEffect(() => {
    if (value && !hasMatchInfo) {
      pluckElement(ref.current);
    } else if (value && hasMatchInfo) {
      flipElement(ref.current, {
        delay: order * FLIP_ANIMATION_DELAY,
        afterFlipIn() {
          setShowMatchStyle(true);
        },
      });
    } else if (!hasMatchInfo) {
      setShowMatchStyle(false);
    }
  }, [value, hasMatchInfo, order]);

  const highlight = clsx(
    showMatchStyle && hasMatchInfo && "text-white",
    showMatchStyle && hasMatchInfo && matchTypeToColor[match],
  );

  const border = clsx(
    "border-2",
    showMatchStyle && hasMatchInfo
      ? "border-transparent"
      : value
      ? "border-[#878a8c] dark:border-[#565758]"
      : "border-[#d3d6da] dark:border-[#3a3a3c]",
  );

  return (
    <div
      ref={ref}
      className={`flex aspect-square w-1/5 max-w-[60px] select-none items-center justify-center text-4xl font-bold uppercase md:max-w-[80px] ${border} ${highlight}`}
    >
      {value}
    </div>
  );
}
