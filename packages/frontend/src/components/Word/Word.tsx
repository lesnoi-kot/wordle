import { memo } from 'react';
import { Letter } from './Letter';
import { MatchType } from 'wordle-common';

type Props = {
  id: string;
  word: Array<{
    letter: string;
    match?: MatchType;
  }>;
};

export const Word = memo(({ id, word }: Props) => {
  return (
    <div id={id} className="flex flex-row gap-2 justify-center">
      {word.map(({ letter, match }, i) => (
        <Letter key={i} value={letter} match={match} />
      ))}
    </div>
  );
});
