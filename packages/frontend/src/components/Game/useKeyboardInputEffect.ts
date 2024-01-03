import { useEffect } from "react";

const enToRuKeyboardMapping = {
  q: "й",
  w: "ц",
  e: "у",
  r: "к",
  t: "е",
  y: "н",
  u: "г",
  i: "ш",
  o: "щ",
  p: "з",
  "[": "х",
  "]": "ъ",
  a: "ф",
  s: "ы",
  d: "в",
  f: "а",
  g: "п",
  h: "р",
  j: "о",
  k: "л",
  l: "д",
  ";": "ж",
  "'": "э",
  z: "я",
  x: "ч",
  c: "с",
  v: "м",
  b: "и",
  n: "т",
  m: "ь",
  ",": "б",
  ".": "ю",
};

export const useKeyboardInputEffect = (
  onLetterInput: (letter: string) => void,
) => {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Enter") {
        onLetterInput("\n");
        return;
      }

      if (event.key === "Backspace") {
        onLetterInput("\b");
        return;
      }

      const key = event.key.toLowerCase();

      if (key >= "а" && key <= "я") {
        onLetterInput(key);
      } else if (isMappableKey(key)) {
        onLetterInput(enToRuKeyboardMapping[key]);
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onLetterInput]);
};

function isMappableKey(key: string): key is keyof typeof enToRuKeyboardMapping {
  return key in enToRuKeyboardMapping;
}
