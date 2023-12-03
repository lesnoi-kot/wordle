import { useEffect } from "react";

export const useKeyboardInputEffect = (
  onLetterInput: (letter: string) => void,
) => {
  useEffect(() => {
    function onKeyUp(event: KeyboardEvent) {
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
      }
    }

    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [onLetterInput]);
};
