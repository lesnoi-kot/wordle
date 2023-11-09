import clsx from 'clsx';
import { useEffect, useId } from 'react';
import { MatchType } from 'wordle-common';
import { pluckElement } from './animations';

type Props = {
  value: string;
  match?: MatchType;
};

const matchTypeToColor = {
  [MatchType.None]: 'bg-[#787c7e]',
  [MatchType.Partial]: 'bg-[#c9b458]',
  [MatchType.Exact]: 'bg-[#6aaa64]',
};

export function Letter({ value, match }: Props) {
  const id = useId();

  useEffect(() => {
    if (value) {
      pluckElement(document.getElementById(id));
    }
  }, [value]);

  const hasMatchInfo = match !== undefined;

  const highlight = clsx(
    hasMatchInfo && 'text-white',
    hasMatchInfo && matchTypeToColor[match],
  );

  const border = clsx(
    'border-2',
    hasMatchInfo
      ? 'border-transparent'
      : value
      ? 'border-[#878a8c] dark:border-[#565758]'
      : 'border-[#d3d6da] dark:border-[#3a3a3c]',
  );

  return (
    <div
      id={id}
      className={`w-[60px] text-[2rem] font-bold uppercase flex items-center justify-center aspect-square ${border} ${highlight}`}
    >
      {value}
    </div>
  );
}
