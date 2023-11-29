import { ComponentPropsWithoutRef, memo } from 'react';
import { times } from 'lodash';
import clsx from 'clsx';
import { MatchType, WORD_LENGTH } from 'wordle-common';

import { Letter } from './Letter';

type Props = ComponentPropsWithoutRef<'div'> & {
  word: string;
  matches: Array<MatchType | null>;
};

export const Word = memo(({ word, matches, className, ...props }: Props) => {
  return (
    <div className={clsx('flex flex-row gap-1 xs:gap-2', className)} {...props}>
      {times(WORD_LENGTH, (i) => (
        <Letter
          key={i}
          order={i}
          value={word[i] ?? ''}
          match={matches[i] ?? null}
        />
      ))}
    </div>
  );
});
