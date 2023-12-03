import { LettersMap } from "wordle-common";

import { KeyButton } from "./KeyButton";

type Props = {
  onKeyPress(key: string): void;
  letters: LettersMap;
};

const KEYBOARD_LAYOUT = ["йцукенгшщзхъ", "фывапролджэ", "\nячсмитьбю\b"].map(
  (s) => Array.from(s),
);

export function Keyboard({ onKeyPress, letters }: Props) {
  return (
    <div className="flex flex-col items-center gap-1 xs:gap-2">
      {KEYBOARD_LAYOUT.map((keys, i) => (
        <div className="flex w-full flex-row gap-1 xs:gap-2 sm:w-auto" key={i}>
          {keys.map((key) => (
            <KeyButton
              key={key}
              match={letters[key]}
              char={key}
              onClick={onKeyPress}
              className={
                /* prettier-ignore */
                key ==="\n" || key === "\b"
                  ? "hidden xs:block"
                  : ""
              }
            />
          ))}
        </div>
      ))}

      <div className="flex w-full gap-1 xs:hidden xs:gap-2">
        <KeyButton char={"\n"} onClick={onKeyPress} />
        <KeyButton char={"\b"} onClick={onKeyPress} />
      </div>
    </div>
  );
}
