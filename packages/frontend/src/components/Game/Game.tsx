import { useCallback, useEffect, useState } from 'react';
import { GameId, WORDS_COUNT } from 'wordle-common';
import { times } from 'lodash';

import { api } from '../../services/api';
import { useKeyboardInputEffect, useGameState, GameState } from './hooks';
import { shakeElement } from './animations';
import { Keyboard } from '../Keyboard/Keyboard';
import { Word } from '../Word/Word';
import { Button } from '../Button/Button';
import { useAddToast } from '../Toasts/ToastsProvider';
import { CongratsDialog } from './CongratsDialog';

export function Game() {
  const {
    gameId,
    words,
    letters,
    rowIsFilled,
    isFinished,
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
            shakeElement(document.getElementById(getRowId(0)));
            addToast({ text: 'Недостаточно букв' });
            break;
          }

          api
            .checkWord({ gameId, guessWord: currentWord })
            .then((result) => {
              if (result.isValid) {
                onWordAccepted(currentWord, result);
              } else {
                shakeElement(document.getElementById(getRowId(0)));
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
          startNewGame={startNewGame}
          attempts={attempts}
          correctWord={correctWord}
        />

        <div className="flex flex-col gap-2">
          {times(WORDS_COUNT, (i) => (
            <Word
              key={i}
              id={getRowId(i)}
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

function Header({
  gameId,
  isFinished,
  onWordReveal,
}: Pick<GameState, 'gameId' | 'isFinished' | 'onWordReveal'>) {
  const addToast = useAddToast();

  return (
    <div className="flex flex-row gap-4 p-4 items-center bg-zinc-800 text-white">
      <h1 className="text-4xl bold tracking-wider">вордли</h1>

      <Button
        className="ml-auto sm:p-1"
        primary
        disabled={isFinished}
        onClick={() => {
          api
            .revealWord({ gameId })
            .then(({ word }) => {
              onWordReveal(word);
            })
            .catch((error) => {
              addToast({ text: `Ошибка сети (${String(error)})` });
            });
        }}
      >
        🏳️ Сдаюсь
      </Button>
    </div>
  );
}

function getRowId(i: number) {
  return `row-${i}`;
}
