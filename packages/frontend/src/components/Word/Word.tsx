import { memo } from 'react';
import { LettersMatches, WORD_LENGTH } from 'wordle-common';

import { Letter } from './Letter';
import { times } from 'lodash';

type Props = {
  id: string;
  word: string;
  matches?: LettersMatches;
};

export const Word = memo(({ id, word, matches }: Props) => {
  return (
    <div id={id} className="flex flex-row gap-2 justify-center">
      {times(WORD_LENGTH, (i) => (
        <Letter key={i} value={word[i] ?? ''} match={matches?.[i]} />
      ))}
    </div>
  );
});
