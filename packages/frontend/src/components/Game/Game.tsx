import { useCallback, useEffect, useState } from 'react';
import { WORDS_COUNT } from 'wordle-common';
import { times } from 'lodash';

import { api } from '../../services/api';
import { useKeyboardInputEffect, useWordsState } from './hooks';
import { shakeElement } from './animations';
import { Keyboard } from '../Keyboard/Keyboard';
import { Word } from '../Word/Word';
import { Button } from '../Button/Button';

export function Game() {
  const [gameId, setGameId] = useState(0);
  const {
    words,
    letters,
    rowIsFilled,
    isFinished,
    currentWord,
    correctWord,
    setCurrentWord,
    onWordAccepted,
    onWordReveal,
  } = useWordsState(gameId);

  const startNewGame = useCallback(() => {
    api.getRandomWordHandle().then(({ gameId }) => {
      setGameId(gameId);
    });
  }, []);

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
            break;
          }

          api
            .checkWord({ gameId, guessWord: currentWord })
            .then((result) => {
              if (result.isValid) {
                onWordAccepted(currentWord, result);
              } else {
                // shakeElement(document.getElementById(getRowId(0)));
              }
            })
            .catch(console.error);
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
    <div className="flex flex-col gap-8">
      {isFinished && (
        <dialog open>
          <div>
            <p>Game Over!</p>
            <p>Correct word is "{correctWord}".</p>
          </div>
        </dialog>
      )}

      <div className="flex flex-row gap-4">
        {isFinished && (
          <Button
            onClick={() => {
              startNewGame();
            }}
            primary={isFinished}
          >
            Новая игра
          </Button>
        )}

        {!isFinished && (
          <Button
            disabled={isFinished}
            onClick={() => {
              api
                .revealWord({ gameId })
                .then(({ word }) => {
                  onWordReveal(word);
                })
                .catch(console.error);
            }}
          >
            Сдаюсь
          </Button>
        )}
      </div>

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
  );
}

function getRowId(i: number) {
  return `row-${i}`;
}
