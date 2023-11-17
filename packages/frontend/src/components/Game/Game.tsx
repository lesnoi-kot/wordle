import { useCallback, useEffect } from 'react';
import { WORDS_COUNT } from 'wordle-common';
import { times } from 'lodash';

import { api } from '../../services/api';
import { useKeyboardInputEffect } from './useKeyboardInputEffect';
import { shakeElement } from './animations';
import { useGameState } from './useGameState';

import { Keyboard } from '../Keyboard/Keyboard';
import { Word } from '../Word/Word';
import { useAddToast } from '../Toasts/ToastsProvider';
import { CongratsDialog } from './CongratsDialog';
import { Header } from './Header';

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
  }, []);

  const onLetterInput = useCallback(
    (letter: string) => {
      if (isFinished) {
        return;
      }

      switch (letter) {
        case '\n':
          if (!rowIsFilled) {
            shakeElement(document.getElementById(getRowId(row)));
            addToast({ text: 'Недостаточно букв' });
            break;
          }

          api
            .checkWord({ gameId, guessWord: currentWord })
            .then((result) => {
              if (result.isValid) {
                onWordAccepted(currentWord, result);
              } else {
                shakeElement(document.getElementById(getRowId(row)));
                addToast({ text: 'Некорректное слово' });
              }
            })
            .catch((error) => {
              addToast({ text: `Ошибка сети (${String(error)})` });
            });
          break;

        case '\b':
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
      isFinished,
    ],
  );

  useKeyboardInputEffect(onLetterInput);

  return (
    <>
      <Header
        gameId={gameId}
        isFinished={isFinished}
        onWordReveal={onWordReveal}
      />

      <div className="my-0 p-8 flex flex-col gap-8">
        <CongratsDialog
          open={isFinished}
          isResigned={isResigned}
          isVictory={isVictory}
          startNewGame={startNewGame}
          attempts={attempts}
          correctWord={correctWord}
        />

        <div className="flex flex-col gap-1 md:gap-2">
          {times(WORDS_COUNT, (i) => (
            <Word
              key={i}
              id={getRowId(i + 1)}
              word={words[i]?.word ?? ''}
              matches={words[i]?.matches}
            />
          ))}
        </div>

        <Keyboard onKeyPress={onLetterInput} letters={letters} />
      </div>
    </>
  );
}

function getRowId(i: number) {
  return `row-${i}`;
}
