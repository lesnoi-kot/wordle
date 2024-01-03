import { useCallback, useEffect } from "react";
import { WORDS_COUNT } from "wordle-common";
import { times } from "lodash";

import { api } from "../../services/api";
import { useKeyboardInputEffect } from "./useKeyboardInputEffect";
import { shakeElement } from "./animations";
import { NO_MATCHES_INFO, useGameState } from "./useGameState";

import { Keyboard } from "../Keyboard/Keyboard";
import { animateKeyButton } from "../Keyboard/animations";
import { Word } from "../Word/Word";
import { useAddToast } from "../Toasts/ToastsProvider";
import { CongratsDialog } from "./CongratsDialog";
import { Header } from "./Header";
import { useDialogController } from "../Dialog/hooks";

export function Game() {
  const {
    gameId,
    words,
    letters,
    row,
    rowIsFilled,
    isFinished,
    isVictory,
    isResigned,
    currentWord,
    correctWord,
    attempts,
    startNewGame,
    setCurrentWord,
    onWordAccepted,
    onWordReveal,
  } = useGameState();
  const addToast = useAddToast();

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const onLetterInput = useCallback(
    (letter: string) => {
      if (isFinished) {
        return;
      }

      animateKeyButton(letter);

      switch (letter) {
        case "\n":
          if (!rowIsFilled) {
            shakeElement(document.getElementById(getRowId(row)));
            addToast({ text: "Недостаточно букв" });
            break;
          }

          api
            .guessWord({ gameId, guessWord: currentWord })
            .then((result) => {
              if (result.isValid) {
                onWordAccepted(currentWord, result);
              } else {
                shakeElement(document.getElementById(getRowId(row)));
                addToast({ text: "Некорректное слово" });
              }
            })
            .catch((error) => {
              addToast({ text: `Неожиданная ошибка: (${error})` });
            });
          break;

        case "\b":
          setCurrentWord(currentWord.substring(0, currentWord.length - 1));
          break;

        default:
          setCurrentWord(currentWord + letter);
          break;
      }
    },
    [
      gameId,
      row,
      currentWord,
      rowIsFilled,
      setCurrentWord,
      onWordAccepted,
      addToast,
      isFinished,
    ],
  );

  useKeyboardInputEffect(onLetterInput);

  const {
    ref: dialogRef,
    show: showDialog,
    close: closeDialog,
  } = useDialogController();

  useEffect(() => {
    if (isFinished) {
      setTimeout(() => {
        showDialog();
      }, 1300);
    }
  }, [isFinished, showDialog]);

  return (
    <div className="flex h-screen flex-col">
      <Header
        gameId={gameId}
        isFinished={isFinished}
        onWordReveal={onWordReveal}
      />

      <div className="my-0 flex grow flex-col gap-4 p-4 pb-4 xs:gap-8 xs:p-8">
        <CongratsDialog
          ref={dialogRef}
          canClose={false}
          isResigned={isResigned}
          isVictory={isVictory}
          startNewGame={() => {
            closeDialog(() => {
              startNewGame();
            });
          }}
          attempts={attempts}
          correctWord={correctWord}
        />

        <div className="flex flex-col gap-1 xs:grow xs:gap-2">
          {times(WORDS_COUNT, (i) => (
            <Word
              key={i}
              id={getRowId(i + 1)}
              word={words[i]?.word ?? ""}
              matches={words[i]?.matches ?? NO_MATCHES_INFO}
              className="justify-center"
            />
          ))}
        </div>

        <Keyboard onKeyPress={onLetterInput} letters={letters} />
      </div>
    </div>
  );
}

function getRowId(i: number) {
  return `row-${i}`;
}
