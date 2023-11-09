import { useCallback, useEffect, useState } from 'react';

import { api } from '../../services/api';
import { useKeyboardInputEffect, useWordsState } from './hooks';
import { Keyboard } from '../Keyboard/Keyboard';
import { Word } from '../Word/Word';
import { shakeElement } from './animations';

export function Game() {
  const [wordHandle, setWordHandle] = useState(0);
  const {
    row,
    words,
    letters,
    rowIsFilled,
    isFinished,
    currentWord,
    setCurrentWord,
    resetState,
    onWordAccepted,
  } = useWordsState();

  const startNewGame = useCallback(() => {
    api.getRandomWordHandle().then((wordHandle) => {
      setWordHandle(wordHandle);
    });
  }, []);

  useEffect(() => {
    resetState();
  }, [wordHandle]);

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
            .checkWord({ wordHandle, guessWord: currentWord })
            .then((result) => {
              if (result.isValid) {
                onWordAccepted(result.matches);
              } else {
                shakeElement(document.getElementById(getRowId(row)));
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
    [wordHandle, currentWord, rowIsFilled, row, setCurrentWord, onWordAccepted],
  );

  useKeyboardInputEffect(onLetterInput);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        {words.map((word, i) => (
          <Word key={i} id={getRowId(i)} word={word} />
        ))}
      </div>

      <Keyboard onKeyPress={onLetterInput} letters={letters} />
    </div>
  );
}

function getRowId(i: number) {
  return `row-${i}`;
}
