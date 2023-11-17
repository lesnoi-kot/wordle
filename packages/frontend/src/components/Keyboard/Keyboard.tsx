import { LettersMap } from 'wordle-common';

import { KeyButton } from './KeyButton';

type Props = {
  onKeyPress(key: string): void;
  letters: LettersMap;
};

const KEYBOARD_LAYOUT = ['йцукенгшщзхъ', 'фывапролджэ', '\nячсмитьбю\b'].map(
  (s) => Array.from(s),
);

export function Keyboard({ onKeyPress, letters }: Props) {
  return (
    <div className="flex flex-col gap-2 items-center">
      {KEYBOARD_LAYOUT.map((keys, i) => (
        <div className=" flex flex-row gap-2 flex-wrap sm:flex-nowrap" key={i}>
          {keys.map((key) => (
            <KeyButton
              key={key}
              match={letters[key]}
              char={key}
              onClick={onKeyPress}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
