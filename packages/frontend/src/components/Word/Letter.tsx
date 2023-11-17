import clsx from 'clsx';
import { useEffect, useId, useState } from 'react';
import { MatchType } from 'wordle-common';

import { pluckElement, flipElement } from './animations';

type Props = {
  order: number;
  value: string;
  match?: MatchType;
};

const matchTypeToColor = {
  [MatchType.None]: 'bg-[#787c7e]',
  [MatchType.Partial]: 'bg-[#c9b458]',
  [MatchType.Exact]: 'bg-[#6aaa64]',
};

const FLIP_ANIMATION_DELAY = 100;

export function Letter({ order, value, match }: Props) {
  const id = useId();
  const [showMatchStyle, setShowMatchStyle] = useState(false);
  const hasMatchInfo = match !== undefined;

  useEffect(() => {
    if (value && !hasMatchInfo) {
      pluckElement(document.getElementById(id));
    } else if (value && hasMatchInfo) {
      flipElement(document.getElementById(id), {
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
    showMatchStyle && hasMatchInfo && 'text-white',
    showMatchStyle && hasMatchInfo && matchTypeToColor[match],
  );

  const border = clsx(
    'border-2',
    showMatchStyle && hasMatchInfo
      ? 'border-transparent'
      : value
      ? 'border-[#878a8c] dark:border-[#565758]'
      : 'border-[#d3d6da] dark:border-[#3a3a3c]',
  );

  return (
    <div
      id={id}
      className={`w-[60px] text-[2rem] font-bold uppercase flex items-center justify-center aspect-square select-none ${border} ${highlight}`}
    >
      {value}
    </div>
  );
}
