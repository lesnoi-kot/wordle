import { useCallback, useEffect, useState } from 'react';
import { times } from 'lodash';
import {
  CheckWordDTO,
  GameId,
  LettersMap,
  LettersMatches,
  MatchType,
  WORDS_COUNT,
  WORD_LENGTH,
} from 'wordle-common';

import { useAddToast } from '../Toasts/ToastsProvider';
import { api } from '../../services/api';

export const useKeyboardInputEffect = (
  onLetterInput: (letter: string) => void,
) => {
  useEffect(() => {
    function onKeyUp(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        onLetterInput('\n');
        return;
      }

      if (event.key === 'Backspace') {
        onLetterInput('\b');
        return;
      }

      const key = event.key.toLowerCase();

      if (key >= 'а' && key <= 'я') {
        onLetterInput(key);
      }
    }

    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [onLetterInput]);
};

type WordRowState = {
  word: string;
  matches?: LettersMatches;
};

const DEFAULT_WORDS_STATE = [{ word: '' }];
const FULL_MATCH = times(WORD_LENGTH, () => MatchType.Exact) as LettersMatches;

export const useGameState = () => {
  const addToast = useAddToast();
  const [gameId, setGameId] = useState(0);
  const [words, setWords] = useState<WordRowState[]>(DEFAULT_WORDS_STATE);
  const [letters, setLetters] = useState<LettersMap>({});
  const [correctWord, setCorrectWord] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const [isResigned, setIsResigned] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const currentWord = isFinished ? '' : words.at(-1)!.word;

  const startNewGame = useCallback(() => {
    api
      .getRandomWordHandle()
      .then(({ gameId }) => {
        setGameId(gameId);
      })
      .catch((error) => {
        addToast({ text: `Ошибка сети (${String(error)})` });
      });
  }, []);

  const setCurrentWord = useCallback((word: string) => {
    setWords((words) =>
      words.with(-1, { word: word.substring(0, WORD_LENGTH) }),
    );
  }, []);

  const onWordAccepted = useCallback(
    (guessWord: string, checkResult: CheckWordDTO) => {
      if (!checkResult.isValid) {
        return;
      }

      setLetters((letters) => {
        const newLetters = { ...letters };

        checkResult.matches.forEach((match, i) => {
          if (guessWord[i]) {
            newLetters[guessWord[i]] = Math.max(
              newLetters[guessWord[i]] ?? MatchType.None,
              match,
            );
          }
        });

        return newLetters;
      });

      setWords((words) =>
        words
          .with(-1, { word: guessWord, matches: checkResult.matches })
          .concat({ word: '' }),
      );

      if (checkResult.finished) {
        setAttempts(checkResult.attempts);
        setIsFinished(true);
        setCorrectWord(checkResult.word);
      }
    },
    [],
  );

  const onWordReveal = useCallback((word: string) => {
    setWords((words) => words.with(-1, { word, matches: FULL_MATCH }));
    setIsFinished(true);
    setCorrectWord(word);
    setIsResigned(true);
  }, []);

  useEffect(() => {
    setWords(DEFAULT_WORDS_STATE);
    setCorrectWord('');
    setLetters({});
    setIsResigned(false);
    setIsFinished(false);
    setAttempts(0);
  }, [gameId]);

  return {
    gameId,
    words,
    letters,
    currentWord,
    correctWord,
    attempts,
    isResigned,
    rowIsFilled: currentWord.length === WORD_LENGTH,
    isFinished,
    startNewGame,
    setCurrentWord,
    onWordAccepted,
    onWordReveal,
  };
};

export type GameState = ReturnType<typeof useGameState>;
